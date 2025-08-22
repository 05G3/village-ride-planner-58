import React, { useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface LocationButtonProps {
  onLocationFound: (latitude: number, longitude: number, address?: string) => void;
}

const LocationButton: React.FC<LocationButtonProps> = ({ onLocationFound }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support location services.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Try to get address from coordinates using a reverse geocoding service
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          
          if (response.ok) {
            const data = await response.json();
            const address = data.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            
            onLocationFound(latitude, longitude, address);
            
            toast({
              title: "Location found!",
              description: `📍 ${address.split(',').slice(0, 3).join(', ')}`,
            });
          } else {
            onLocationFound(latitude, longitude);
            toast({
              title: "Location found!",
              description: `📍 ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            });
          }
        } catch (error) {
          onLocationFound(latitude, longitude);
          toast({
            title: "Location found!",
            description: `📍 ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          });
        }
        
        setLoading(false);
      },
      (error) => {
        let message = "Unable to get your location.";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Location access denied. Please enable location permissions.";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Location information unavailable.";
            break;
          case error.TIMEOUT:
            message = "Location request timed out.";
            break;
        }
        
        toast({
          title: "Location error",
          description: message,
          variant: "destructive"
        });
        
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={getCurrentLocation}
      disabled={loading}
      className="flex items-center gap-2"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <MapPin className="h-4 w-4" />
      )}
      {loading ? 'Finding...' : 'Use My Location'}
    </Button>
  );
};

export default LocationButton;