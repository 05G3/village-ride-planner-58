import React, { useState, useEffect } from 'react';
import { Search, MapPin, Bus, Clock, IndianRupee, Filter, Download, Share2, Heart, QrCode } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import QRCodeModal from '@/components/QRCodeModal';

interface Route {
  id: string;
  from: string;
  to: string;
  type: string;
  duration: string;
  fare: number;
  transfers: number;
  frequency: string;
  operator: string;
  isFavorite: boolean;
}

const Routes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterOperator, setFilterOperator] = useState('all');
  const [routes, setRoutes] = useState<Route[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedRouteForQR, setSelectedRouteForQR] = useState<Route | null>(null);
  const navigate = useNavigate();

  // Sample routes data (updated to match new routes)
  useEffect(() => {
    const sampleRoutes: Route[] = [
      {
        id: '1',
        from: 'Vijayawada',
        to: 'Buttayagudem',
        type: 'Express',
        duration: '4h 45m',
        fare: 260,
        transfers: 2,
        frequency: 'Every 1 hour',
        operator: 'APSRTC',
        isFavorite: false
      },
      {
        id: '2',
        from: 'Rajahmundry',
        to: 'Maredumilli',
        type: 'Local',
        duration: '3h 00m',
        fare: 200,
        transfers: 1,
        frequency: 'Every 1.5 hours',
        operator: 'APSRTC',
        isFavorite: false
      },
      {
        id: '3',
        from: 'Rajahmundry',
        to: 'Rampachodavaram',
        type: 'Express',
        duration: '1h 40m',
        fare: 125,
        transfers: 0,
        frequency: 'Every 45 min',
        operator: 'APSRTC',
        isFavorite: false
      },
      {
        id: '4',
        from: 'Visakhapatnam',
        to: 'Chintapalli',
        type: 'Comfort',
        duration: '4h 30m',
        fare: 245,
        transfers: 1,
        frequency: 'Every 2 hours',
        operator: 'APSRTC',
        isFavorite: false
      }
    ];
    setRoutes(sampleRoutes);
    setFilteredRoutes(sampleRoutes);
  }, []);

  // Filter routes based on search and filters
  useEffect(() => {
    let filtered = routes.filter(route => {
      const matchesSearch = route.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           route.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           route.operator.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === 'all' || route.type === filterType;
      const matchesOperator = filterOperator === 'all' || route.operator === filterOperator;
      
      return matchesSearch && matchesType && matchesOperator;
    });
    
    setFilteredRoutes(filtered);
  }, [searchTerm, filterType, filterOperator, routes]);

  const saveOfflineRoute = (offline: {
    id: string;
    from: string;
    to: string;
    duration: string;
    fare: number;
  }) => {
    const key = 'offlineRoutes';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    const newEntry = {
      ...offline,
      downloadedAt: new Date().toISOString().split('T')[0],
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      size: '~2.0 MB',
      isExpired: false
    };
    const updated = [newEntry, ...existing];
    localStorage.setItem(key, JSON.stringify(updated));
  };

  const handleDownload = (route: Route) => {
    // Persist to offline routes storage
    saveOfflineRoute({
      id: Date.now().toString(),
      from: route.from,
      to: route.to,
      duration: route.duration,
      fare: route.fare,
    });

    // Also offer a JSON file download for mobile users
    const data = {
      from: route.from,
      to: route.to,
      duration: route.duration,
      fare: route.fare,
      operator: route.operator,
      savedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${route.from.replace(/\s+/g,'_')}-${route.to.replace(/\s+/g,'_')}-route.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleShare = (route: Route) => {
    // Implementation for sharing route
    const shareText = `Route: ${route.from} to ${route.to}\nDuration: ${route.duration}\nFare: ₹${route.fare}\nOperator: ${route.operator}`;
    if (navigator.share) {
      navigator.share({
        title: 'Bus Route',
        text: shareText
      });
    } else {
      navigator.clipboard.writeText(shareText);
    }
  };

  const handleView = (route: Route) => {
    const params = new URLSearchParams({ from: route.from, to: route.to });
    navigate(`/?${params.toString()}`);
  };

  const handleQRCode = (route: Route) => {
    setSelectedRouteForQR(route);
    setIsQRModalOpen(true);
  };

  const toggleFavorite = (routeId: string) => {
    setRoutes(prev => prev.map(route => 
      route.id === routeId 
        ? { ...route, isFavorite: !route.isFavorite }
        : route
    ));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Express':
        return 'bg-rural-green/10 text-rural-green border-rural-green/20';
      case 'Local':
        return 'bg-rural-orange/10 text-rural-orange border-rural-orange/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-rural-sand/20 to-secondary/10">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Available
              <span className="text-rural-green block">Routes</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Explore all available bus routes connecting rural India. Find the perfect route for your journey.
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="rural-card shadow-strong">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search Input */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search routes, cities, or operators..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="rural-input pl-10"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="rural-input">
                  <SelectValue placeholder="Route Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Express">Express</SelectItem>
                  <SelectItem value="Local">Local</SelectItem>
                </SelectContent>
              </Select>

              {/* Operator Filter */}
              <Select value={filterOperator} onValueChange={setFilterOperator}>
                <SelectTrigger className="rural-input">
                  <SelectValue placeholder="Operator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Operators</SelectItem>
                  <SelectItem value="TSRTC">TSRTC</SelectItem>
                  <SelectItem value="APSRTC">APSRTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Routes Count */}
        <div className="text-center">
          <p className="text-muted-foreground text-lg">
            Showing <span className="font-semibold text-rural-green">{filteredRoutes.length}</span> routes
          </p>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutes.map((route) => (
            <Card key={route.id} className="rural-card hover:shadow-strong transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-rural-green" />
                      {route.from} → {route.to}
                    </CardTitle>
                    <Badge className={getTypeColor(route.type)}>
                      {route.type}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(route.id)}
                    className="text-rural-orange hover:text-rural-orange hover:bg-rural-orange/10"
                  >
                    <Heart className={`h-5 w-5 ${route.isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Route Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-rural-green" />
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-semibold">{route.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-rural-orange" />
                    <span className="text-muted-foreground">Fare:</span>
                    <span className="font-semibold">₹{route.fare}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bus className="h-4 w-4 text-rural-sky" />
                    <span className="text-muted-foreground">Transfers:</span>
                    <span className="font-semibold">{route.transfers}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-rural-earth" />
                    <span className="text-muted-foreground">Frequency:</span>
                    <span className="font-semibold text-xs">{route.frequency}</span>
                  </div>
                </div>

                {/* Operator */}
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Operated by</p>
                  <p className="font-semibold text-foreground">{route.operator}</p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(route)}
                    className="border-rural-green text-rural-green hover:bg-rural-green hover:text-white"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare(route)}
                    className="border-rural-sky text-rural-sky hover:bg-rural-sky hover:text-white"
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQRCode(route)}
                    className="border-rural-earth text-rural-earth hover:bg-rural-earth hover:text-white"
                  >
                    <QrCode className="h-4 w-4 mr-1" />
                    QR
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(route)}
                    className="border-rural-orange text-rural-orange hover:bg-rural-orange hover:text-white"
                  >
                    <MapPin className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredRoutes.length === 0 && (
          <Card className="rural-card text-center py-12">
            <CardContent>
              <div className="space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/30 mx-auto">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">No routes found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters to find more routes.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* QR Code Modal */}
      {selectedRouteForQR && (
        <QRCodeModal
          isOpen={isQRModalOpen}
          onClose={() => {
            setIsQRModalOpen(false);
            setSelectedRouteForQR(null);
          }}
          routeUrl={`${window.location.origin}/?from=${encodeURIComponent(selectedRouteForQR.from)}&to=${encodeURIComponent(selectedRouteForQR.to)}`}
          routeTitle={`${selectedRouteForQR.from} → ${selectedRouteForQR.to}`}
        />
      )}
    </div>
  );
};

export default Routes;
