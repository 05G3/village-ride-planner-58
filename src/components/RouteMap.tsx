import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { JourneyPlan } from './JourneyResults';
import 'leaflet/dist/leaflet.css';

// Fix leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface RouteMapProps {
  journey: JourneyPlan | null;
}

// Mock coordinates for demo purposes
const locationCoords: { [key: string]: [number, number] } = {
  'Vijayawada': [16.5062, 80.6480],
  'Vijayawada PNBS': [16.5062, 80.6480],
  'Rajahmundry RTC': [17.0005, 81.7880],
  'Kotha Rajanagaram': [17.0205, 81.8180],
  'Kotha Rajanagaram X Road': [17.0205, 81.8180],
  'Hyderabad': [17.3850, 78.4867],
  'Karimnagar': [18.4386, 79.1288],
  'Warangal': [17.9689, 79.5941],
  'Bhadrachalam': [17.6688, 80.8936],
  'PNBS Gate 2': [16.5062, 80.6480],
  'Bay 6': [16.5062, 80.6480],
  'X Road': [17.0205, 81.8180],
  'Village Centre': [17.0205, 81.8180],
  'MGBS Bus Station': [17.3850, 78.4867],
  'Platform 12': [17.3850, 78.4867],
  'Hyderabad MGBS': [17.3850, 78.4867],
  'Karimnagar Bus Stand': [18.4386, 79.1288],
  'Bus Stand': [18.4386, 79.1288],
  'City Center': [18.4386, 79.1288],
  'Warangal Bus Station': [17.9689, 79.5941],
  'Bay 4': [17.9689, 79.5941],
  'Khammam RTC': [17.2473, 80.1514],
  'Local 28B': [17.2473, 80.1514],
  'Bhadrachalam Temple': [17.6688, 80.8936],
  'Temple Stop': [17.6688, 80.8936],
  'Town Center': [17.6688, 80.8936]
};

const RouteMap: React.FC<RouteMapProps> = ({ journey }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const userLocationRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([17.0, 80.0], 7);

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);

      // Add user location tracking
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            if (mapInstanceRef.current) {
              // Create user location marker
              const userIcon = L.divIcon({
                className: 'user-location-marker',
                html: `<div style="background: #3b82f6; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);"></div>`,
                iconSize: [16, 16],
                iconAnchor: [8, 8]
              });

              userLocationRef.current = L.marker([latitude, longitude], { icon: userIcon })
                .addTo(mapInstanceRef.current)
                .bindPopup('📍 Your Current Location');

              // Center map on user location if no journey
              if (!journey) {
                mapInstanceRef.current.setView([latitude, longitude], 12);
              }
            }
          },
          (error) => {
            console.warn('Geolocation error:', error.message);
          }
        );
      }
    }

    // Clear previous journey markers
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker && layer !== userLocationRef.current) {
        mapInstanceRef.current?.removeLayer(layer);
      }
      if (layer instanceof L.Polyline) {
        mapInstanceRef.current?.removeLayer(layer);
      }
    });

    if (journey) {
      // Get all unique locations from the journey
      const locations = Array.from(new Set([
        ...journey.itinerary.map(step => step.from),
        ...journey.itinerary.map(step => step.to)
      ]));

      // Create markers for each location
      const markers: L.Marker[] = [];
      locations.forEach((location, index) => {
        const coords = locationCoords[location] || [17.0, 80.0];
        
        // Create custom icon based on location type
        const isBusStop = location.includes('RTC') || location.includes('Bus') || location.includes('Bay');
        const icon = isBusStop 
          ? L.divIcon({
              className: 'bus-stop-marker',
              html: `<div style="background: #22c55e; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">🚍</div>`,
              iconSize: [28, 28],
              iconAnchor: [14, 14]
            })
          : L.icon({
              iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
              iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
              shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            });

        const marker = L.marker(coords, { icon })
          .addTo(mapInstanceRef.current!)
          .bindPopup(`<strong>${location}</strong>`);
        
        markers.push(marker);
      });

      // Create route lines for bus segments
      journey.itinerary
        .filter(step => step.mode === 'bus')
        .forEach(step => {
          const fromCoords = locationCoords[step.from] || [17.0, 80.0];
          const toCoords = locationCoords[step.to] || [17.0, 80.0];
          
          L.polyline([fromCoords, toCoords], {
            color: '#22c55e',
            weight: 4,
            opacity: 0.8
          }).addTo(mapInstanceRef.current!)
            .bindPopup(`<strong>${step.route}</strong><br/>${step.from} → ${step.to}<br/>⏱️ ${step.eta_min} minutes`);
        });

      // Fit map to show all markers
      if (markers.length > 0) {
        const group = new L.FeatureGroup(markers);
        mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1), { maxZoom: 10 });
      }
    }

    // Cleanup function
    return () => {
      // Don't destroy map instance as it will be reused
    };
  }, [journey]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  if (!journey) {
    return (
      <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg relative">
        <div ref={mapRef} className="w-full h-full" />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
          <p className="text-sm text-gray-700">📍 Your location will be shown when available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg relative">
      <div ref={mapRef} className="w-full h-full" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
        <p className="text-sm font-semibold text-gray-800">{journey.from} → {journey.to}</p>
        <p className="text-xs text-gray-600">🚍 {journey.transfers} transfer(s) • ⏱️ {Math.floor(journey.total_time_min / 60)}h {journey.total_time_min % 60}m</p>
      </div>
    </div>
  );
};

export default RouteMap;