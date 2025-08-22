import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import RouteSearch from '@/components/RouteSearch';
import JourneyResults, { type JourneyPlan } from '@/components/JourneyResults';
import RouteOptions from '@/components/RouteOptions';
import RouteMap from '@/components/RouteMap';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { findRoutes, type RouteOption } from '@/services/routeApi';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';

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
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
        </div>

        {/* Search Form */}
        <RouteSearch onSearch={handleSearch} loading={loading} />

        {/* Error Message */}
        {error && (
          <Alert className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Results Section */}
        {routeOptions && (
          <div className="space-y-8">
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
                
                <Card className="max-w-4xl mx-auto">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      🗺️ {t('route.map')}
                    </h3>
                    <RouteMap journey={selectedRoute.journey} />
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}

        {/* Demo Instructions */}
        {!routeOptions && !loading && (
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                🚍 {t('route.finder')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t('route.subtitle')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="bg-background/50 p-3 rounded-lg">
                  <div className="font-medium text-primary">Sample Route 1</div>
                  <div className="text-muted-foreground">Vijayawada → Kotha Rajanagaram</div>
                </div>
                <div className="bg-background/50 p-3 rounded-lg">
                  <div className="font-medium text-primary">Sample Route 2</div>
                  <div className="text-muted-foreground">Hyderabad → Karimnagar</div>
                </div>
                <div className="bg-background/50 p-3 rounded-lg">
                  <div className="font-medium text-primary">Sample Route 3</div>
                  <div className="text-muted-foreground">Warangal → Bhadrachalam</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <IndexContent />
    </LanguageProvider>
  );
};

export default Index;
