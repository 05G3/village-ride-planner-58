import React, { useState } from 'react';
import { AlertCircle, Bus, MapPin, Clock, Download, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import RouteSearch from '@/components/RouteSearch';
import JourneyResults, { type JourneyPlan } from '@/components/JourneyResults';
import RouteOptions from '@/components/RouteOptions';
import RouteMap from '@/components/RouteMap';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { findRoutes, type RouteOption } from '@/services/routeApi';
import { useLanguage } from '@/contexts/LanguageContext';

const IndexContent = () => {
  const [routeOptions, setRouteOptions] = useState<RouteOption[] | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<RouteOption | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleSearch = async (from: string, to: string) => {
    setLoading(true);
    setError(null);
    setRouteOptions(null);
    setSelectedRoute(null);

    try {
      const result = await findRoutes(from, to);
      
      if (result && result.length > 0) {
        setRouteOptions(result);
        // Auto-select the first route (fastest or first available)
        const defaultRoute = result.find(r => r.type === 'fastest') || result[0];
        setSelectedRoute(defaultRoute);
      } else {
        setError(`No route found from ${from} to ${to}. Try our sample routes for demo purposes.`);
      }
    } catch (err) {
      setError('Failed to find route. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRouteSelect = (option: RouteOption) => {
    setSelectedRoute(option);
  };

  const handlePlanReturn = () => {
    if (selectedRoute) {
      // Swap from and to for return trip
      handleSearch(selectedRoute.journey.to, selectedRoute.journey.from);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-rural-sand/20 to-secondary/10">
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Plan Your
              <span className="text-rural-green block">Rural Journey</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Discover the easiest way to travel between villages. Find bus routes, schedules, and plan your trip with confidence across rural India.
            </p>
          </div>
        </div>

        {/* Search Form */}
        <RouteSearch onSearch={handleSearch} loading={loading} />

        {/* Error Message */}
        {error && (
          <Alert className="max-w-2xl mx-auto rural-card">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <AlertDescription className="text-lg">{error}</AlertDescription>
          </Alert>
        )}

        {/* Results Section */}
        {routeOptions && (
          <div className="space-y-12">
            <RouteOptions 
              options={routeOptions} 
              onSelectRoute={handleRouteSelect}
              selectedRouteId={selectedRoute?.id}
            />
            
            {selectedRoute && (
              <>
                <JourneyResults 
                  journey={selectedRoute.journey}
                  estimatedFare={selectedRoute.estimatedFare}
                  firstBus={selectedRoute.firstBus}
                  lastBus={selectedRoute.lastBus}
                  onPlanReturn={handlePlanReturn}
                />
                
                <Card className="rural-card shadow-strong max-w-6xl mx-auto">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rural-green/10">
                        <MapPin className="h-4 w-4 text-rural-green" />
                      </div>
                      {t('route.map')}
                    </h3>
                    <RouteMap journey={selectedRoute.journey} />
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}

        {/* Demo Instructions & Quick Actions */}
        {!routeOptions && !loading && (
          <div className="space-y-8">
            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/offline-routes">
                <Card className="rural-card text-center p-6 hover:scale-105 transition-smooth cursor-pointer">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rural-green/10 mx-auto mb-4">
                    <Download className="h-8 w-8 text-rural-green" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Offline Routes</h3>
                  <p className="text-muted-foreground">Download routes for offline use in remote areas</p>
                </Card>
              </Link>

              <Link to="/routes">
                <Card className="rural-card text-center p-6 hover:scale-105 transition-smooth cursor-pointer">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rural-orange/10 mx-auto mb-4">
                    <MessageSquare className="h-8 w-8 text-rural-orange" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Browse Routes</h3>
                  <p className="text-muted-foreground">Explore all available bus routes and schedules</p>
                </Card>
              </Link>
            </div>

            {/* Demo Instructions */}
            <Card className="rural-card bg-gradient-to-r from-rural-green/5 to-rural-orange/5 max-w-4xl mx-auto">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-semibold mb-4 text-foreground flex items-center justify-center gap-2">
                  <Bus className="h-6 w-6 text-rural-green" />
                  {t('route.finder')}
                </h3>
                <p className="text-muted-foreground mb-6 text-lg">
                  {t('route.subtitle')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-background/80 p-4 rounded-xl border border-rural-green/20">
                    <div className="font-semibold text-rural-green mb-2">Sample Route 1</div>
                    <div className="text-muted-foreground">Vijayawada → Buttayagudem</div>
                  </div>
                  <div className="bg-background/80 p-4 rounded-xl border border-rural-orange/20">
                    <div className="font-semibold text-rural-orange mb-2">Sample Route 2</div>
                    <div className="text-muted-foreground">Rajahmundry → Maredumilli</div>
                  </div>
                  <div className="bg-background/80 p-4 rounded-xl border border-rural-sky/20">
                    <div className="font-semibold text-rural-sky mb-2">Sample Route 3</div>
                    <div className="text-muted-foreground">Visakhapatnam → Chintapalli</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

const Index = () => {
  return <IndexContent />;
};

export default Index;
