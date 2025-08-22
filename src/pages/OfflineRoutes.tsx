import React, { useState } from 'react';
import { Download, MapPin, Clock, IndianRupee, Trash2, RefreshCw, Wifi, WifiOff, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface OfflineRoute {
  id: string;
  from: string;
  to: string;
  duration: string;
  fare: number;
  downloadedAt: string;
  expiresAt: string;
  size: string;
  isExpired: boolean;
}

const OfflineRoutes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [offlineRoutes, setOfflineRoutes] = useState<OfflineRoute[]>([
    {
      id: '1',
      from: 'Hyderabad',
      to: 'Karimnagar',
      duration: '2h 30m',
      fare: 120,
      downloadedAt: '2024-01-15',
      expiresAt: '2024-02-15',
      size: '2.4 MB',
      isExpired: false
    },
    {
      id: '2',
      from: 'Vijayawada',
      to: 'Kotha Rajanagaram',
      duration: '1h 45m',
      fare: 85,
      downloadedAt: '2024-01-10',
      expiresAt: '2024-02-10',
      size: '1.8 MB',
      isExpired: false
    },
    {
      id: '3',
      from: 'Warangal',
      to: 'Bhadrachalam',
      duration: '3h 15m',
      fare: 150,
      downloadedAt: '2024-01-05',
      expiresAt: '2024-02-05',
      size: '3.1 MB',
      isExpired: true
    }
  ]);

  const [newRouteForm, setNewRouteForm] = useState({
    from: '',
    to: ''
  });

  const filteredRoutes = offlineRoutes.filter(route =>
    route.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownloadNewRoute = () => {
    if (newRouteForm.from && newRouteForm.to) {
      const newRoute: OfflineRoute = {
        id: Date.now().toString(),
        from: newRouteForm.from,
        to: newRouteForm.to,
        duration: '2h 0m',
        fare: 100,
        downloadedAt: new Date().toISOString().split('T')[0],
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        size: '2.0 MB',
        isExpired: false
      };
      
      setOfflineRoutes(prev => [newRoute, ...prev]);
      setNewRouteForm({ from: '', to: '' });
    }
  };

  const handleDeleteRoute = (routeId: string) => {
    setOfflineRoutes(prev => prev.filter(route => route.id !== routeId));
  };

  const handleRefreshRoute = (routeId: string) => {
    setOfflineRoutes(prev => prev.map(route => 
      route.id === routeId 
        ? { 
            ...route, 
            downloadedAt: new Date().toISOString().split('T')[0],
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            isExpired: false
          }
        : route
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-rural-sand/20 to-secondary/10">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Offline
              <span className="text-rural-green block">Routes</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Access your downloaded routes without internet. Perfect for remote areas with limited connectivity.
            </p>
          </div>
        </div>

        {/* Download New Route */}
        <Card className="rural-card shadow-strong">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-rural-green to-rural-leaf">
                <Plus className="h-5 w-5 text-white" />
              </div>
              Download New Route
            </CardTitle>
            <p className="text-muted-foreground">
              Download routes for offline access. Routes are valid for 30 days.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">From</label>
                <Input
                  type="text"
                  placeholder="Enter departure city"
                  value={newRouteForm.from}
                  onChange={(e) => setNewRouteForm(prev => ({ ...prev, from: e.target.value }))}
                  className="rural-input"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">To</label>
                <Input
                  type="text"
                  placeholder="Enter destination city"
                  value={newRouteForm.to}
                  onChange={(e) => setNewRouteForm(prev => ({ ...prev, to: e.target.value }))}
                  className="rural-input"
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleDownloadNewRoute}
                  className="rural-button-primary w-full"
                  disabled={!newRouteForm.from || !newRouteForm.to}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Route
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <Card className="rural-card shadow-strong">
          <CardContent className="p-6">
            <div className="relative">
              <Download className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search downloaded routes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rural-input pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Routes Count */}
        <div className="text-center">
          <p className="text-muted-foreground text-lg">
            <WifiOff className="inline h-5 w-5 mr-2 text-rural-green" />
            You have <span className="font-semibold text-rural-green">{filteredRoutes.length}</span> offline routes
          </p>
        </div>

        {/* Offline Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutes.map((route) => {
            const daysUntilExpiry = getDaysUntilExpiry(route.expiresAt);
            const isExpired = daysUntilExpiry <= 0;
            
            return (
              <Card key={route.id} className={`rural-card transition-all duration-300 ${
                isExpired ? 'border-rural-orange/50 bg-rural-orange/5' : 'hover:shadow-strong'
              }`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-rural-green" />
                        {route.from} → {route.to}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Badge className="bg-rural-green/10 text-rural-green border-rural-green/20">
                          <WifiOff className="h-3 w-3 mr-1" />
                          Offline
                        </Badge>
                        {isExpired && (
                          <Badge className="bg-rural-orange/10 text-rural-orange border-rural-orange/20">
                            Expired
                          </Badge>
                        )}
                      </div>
                    </div>
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
                      <Download className="h-4 w-4 text-rural-sky" />
                      <span className="text-muted-foreground">Size:</span>
                      <span className="font-semibold">{route.size}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-rural-earth" />
                      <span className="text-muted-foreground">Expires:</span>
                      <span className="font-semibold text-xs">{formatDate(route.expiresAt)}</span>
                    </div>
                  </div>

                  {/* Expiry Status */}
                  <div className={`text-center p-3 rounded-lg ${
                    isExpired 
                      ? 'bg-rural-orange/10 border border-rural-orange/20' 
                      : 'bg-rural-green/10 border border-rural-green/20'
                  }`}>
                    {isExpired ? (
                      <p className="text-rural-orange font-medium">Route has expired</p>
                    ) : (
                      <p className="text-rural-green font-medium">
                        Valid for {daysUntilExpiry} more days
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-rural-green text-rural-green hover:bg-rural-green hover:text-white"
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRefreshRoute(route.id)}
                      className="border-rural-sky text-rural-sky hover:bg-rural-sky hover:text-white"
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Refresh
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteRoute(route.id)}
                      className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Routes */}
        {filteredRoutes.length === 0 && (
          <Card className="rural-card text-center py-12">
            <CardContent>
              <div className="space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/30 mx-auto">
                  <Download className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">No offline routes found</h3>
                <p className="text-muted-foreground">
                  Download some routes above to access them offline.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Offline Tips */}
        <Card className="rural-card shadow-strong">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rural-sky/10">
                <WifiOff className="h-4 w-4 text-rural-sky" />
              </div>
              Offline Usage Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Before Travel</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Download routes when you have internet</li>
                  <li>• Routes are valid for 30 days</li>
                  <li>• Check expiry dates regularly</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">During Travel</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Access routes without internet</li>
                  <li>• View detailed journey steps</li>
                  <li>• Check bus timings and fares</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OfflineRoutes;
