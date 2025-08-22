import React from 'react';
import { Clock, MapPin, Bus, Zap, DollarSign, Shield, ArrowRight, IndianRupee, Calendar, Star, TrendingUp, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { RouteOption } from '@/services/routeApi';
import { useLanguage } from '@/contexts/LanguageContext';

interface RouteOptionsProps {
  options: RouteOption[];
  onSelectRoute: (option: RouteOption) => void;
  selectedRouteId?: string;
}

const RouteOptions: React.FC<RouteOptionsProps> = ({ 
  options, 
  onSelectRoute, 
  selectedRouteId 
}) => {
  const { t } = useLanguage();
  
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'fastest':
        return <Zap className="h-5 w-5" />;
      case 'cheapest':
        return <DollarSign className="h-5 w-5" />;
      case 'comfortable':
        return <Shield className="h-5 w-5" />;
      case 'direct':
        return <ArrowRight className="h-5 w-5" />;
      default:
        return <Bus className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'fastest':
        return 'bg-rural-green/10 text-rural-green border-rural-green/20';
      case 'cheapest':
        return 'bg-rural-orange/10 text-rural-orange border-rural-orange/20';
      case 'comfortable':
        return 'bg-rural-sky/10 text-rural-sky border-rural-sky/20';
      case 'direct':
        return 'bg-rural-earth/10 text-rural-earth border-rural-earth/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'fastest':
        return 'Fastest Route';
      case 'cheapest':
        return 'Most Affordable';
      case 'comfortable':
        return 'Most Comfortable';
      case 'direct':
        return 'Direct Route';
      default:
        return 'Standard Route';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header Card */}
      <Card className="rural-card shadow-strong">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-3 text-2xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-rural-green to-rural-leaf">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            Route Options ({options.length} alternatives)
          </CardTitle>
          <p className="text-lg text-muted-foreground">
            Choose the route that best fits your journey needs
          </p>
        </CardHeader>
      </Card>

      {/* Route Options Grid */}
      <div className="grid gap-6">
        {options.map((option, index) => (
          <Card 
            key={option.id} 
            className={`rural-card cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
              selectedRouteId === option.id 
                ? 'ring-2 ring-rural-green shadow-strong bg-rural-green/5' 
                : 'hover:shadow-medium hover:bg-muted/30'
            }`}
            onClick={() => onSelectRoute(option)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Route Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <Badge 
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold ${getTypeColor(option.type)}`}
                    >
                      {getTypeIcon(option.type)}
                      {getTypeLabel(option.type)}
                    </Badge>
                    
                    {/* Route Stats */}
                    <div className="flex gap-3">
                      <Badge className="bg-rural-green/10 text-rural-green border-rural-green/20 px-3 py-1">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatTime(option.journey.total_time_min)}
                      </Badge>
                      <Badge className="bg-rural-orange/10 text-rural-orange border-rural-orange/20 px-3 py-1">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        ₹{option.estimatedFare}
                      </Badge>
                      <Badge className="bg-rural-sky/10 text-rural-sky border-rural-sky/20 px-3 py-1">
                        <Bus className="h-4 w-4 mr-1" />
                        {option.journey.transfers} transfer{option.journey.transfers !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                  </div>

                  {/* Route Path */}
                  <div className="flex items-center gap-3 text-lg mb-4">
                    <span className="font-semibold text-foreground">{option.journey.from}</span>
                    <div className="flex items-center gap-1 text-rural-green">
                      <ArrowRight className="h-5 w-5" />
                      <span className="text-sm">Route {index + 1}</span>
                    </div>
                    <span className="font-semibold text-foreground">{option.journey.to}</span>
                  </div>

                  {/* Route Highlights */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {option.highlights.map((highlight, index) => (
                      <span 
                        key={index}
                        className="text-sm bg-background/80 border border-border/50 rounded-full px-3 py-1.5 text-muted-foreground flex items-center gap-1"
                      >
                        <Star className="h-3 w-3 text-rural-orange" />
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Route Statistics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-muted/20 rounded-xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-rural-green">
                        {option.journey.itinerary.filter(s => s.mode === 'bus').length}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">Bus rides</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-rural-orange">
                        {formatTime(option.journey.total_time_min)}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">Total time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-rural-sky">
                        {option.journey.transfers}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">Transfers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-rural-green">
                        {option.firstBus}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">First bus</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-rural-orange">
                        {option.lastBus}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">Last bus</div>
                    </div>
                  </div>
                </div>

                {/* Selection Button */}
                <div className="ml-6 flex flex-col items-end gap-3">
                  <Button 
                    variant={selectedRouteId === option.id ? "default" : "outline"}
                    size="lg"
                    className={`min-w-[120px] ${
                      selectedRouteId === option.id 
                        ? 'rural-button-primary' 
                        : 'border-rural-green text-rural-green hover:bg-rural-green hover:text-white'
                    }`}
                  >
                    {selectedRouteId === option.id ? (
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        Selected
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Select Route
                      </div>
                    )}
                  </Button>
                  
                  {/* Route Recommendation */}
                  {option.type === 'fastest' && (
                    <Badge className="bg-rural-green/10 text-rural-green border-rural-green/20">
                      ⭐ Recommended
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RouteOptions;