import React, { useState, useEffect } from 'react';
import { Search, MapPin, Bus, Clock, IndianRupee, Filter, Download, Share2, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

  // Sample routes data
  useEffect(() => {
    const sampleRoutes: Route[] = [
      {
        id: '1',
        from: 'Hyderabad',
        to: 'Karimnagar',
        type: 'Express',
        duration: '2h 30m',
        fare: 120,
        transfers: 0,
        frequency: 'Every 30 min',
        operator: 'TSRTC',
        isFavorite: false
      },
      {
        id: '2',
        from: 'Vijayawada',
        to: 'Kotha Rajanagaram',
        type: 'Local',
        duration: '1h 45m',
        fare: 85,
        transfers: 1,
        frequency: 'Every 1 hour',
        operator: 'APSRTC',
        isFavorite: true
      },
      {
        id: '3',
        from: 'Warangal',
        to: 'Bhadrachalam',
        type: 'Express',
        duration: '3h 15m',
        fare: 150,
        transfers: 0,
        frequency: 'Every 2 hours',
        operator: 'TSRTC',
        isFavorite: false
      },
      {
        id: '4',
        from: 'Karimnagar',
        to: 'Nizamabad',
        type: 'Local',
        duration: '2h 0m',
        fare: 95,
        transfers: 1,
        frequency: 'Every 45 min',
        operator: 'TSRTC',
        isFavorite: false
      },
      {
        id: '5',
        from: 'Nalgonda',
        to: 'Suryapet',
        type: 'Express',
        duration: '1h 30m',
        fare: 70,
        transfers: 0,
        frequency: 'Every 20 min',
        operator: 'TSRTC',
        isFavorite: false
      },
      {
        id: '6',
        from: 'Khammam',
        to: 'Bhadrachalam',
        type: 'Local',
        duration: '2h 45m',
        fare: 110,
        transfers: 1,
        frequency: 'Every 1 hour',
        operator: 'TSRTC',
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

  const handleDownload = (route: Route) => {
    // Implementation for downloading route
    console.log('Downloading route:', route);
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
                <div className="grid grid-cols-3 gap-2">
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
    </div>
  );
};

export default Routes;
