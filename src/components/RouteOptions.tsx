import React from 'react';
import { Clock, MapPin, Bus, Zap, DollarSign, Shield, ArrowRight, IndianRupee, Calendar } from 'lucide-react';
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
        return <Zap className="h-4 w-4" />;
      case 'cheapest':
        return <DollarSign className="h-4 w-4" />;
      case 'comfortable':
        return <Shield className="h-4 w-4" />;
      case 'direct':
        return <ArrowRight className="h-4 w-4" />;
      default:
        return <Bus className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'fastest':
        return 'bg-green-500/10 text-green-700 border-green-200';
      case 'cheapest':
        return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'comfortable':
        return 'bg-purple-500/10 text-purple-700 border-purple-200';
      case 'direct':
        return 'bg-orange-500/10 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Route Options ({options.length} alternatives)
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose the route that best fits your needs
          </p>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {options.map((option) => (
          <Card 
            key={option.id} 
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedRouteId === option.id 
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:bg-muted/50'
            }`}
            onClick={() => onSelectRoute(option)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge 
                      variant="outline" 
                      className={`flex items-center gap-1 ${getTypeColor(option.type)}`}
                    >
                      {getTypeIcon(option.type)}
                      {option.label}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTime(option.journey.total_time_min)}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <IndianRupee className="h-3 w-3" />
                      ₹{option.estimatedFare}
                    </Badge>
                    <Badge variant="secondary">
                      {option.journey.transfers} transfer{option.journey.transfers !== 1 ? 's' : ''}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span className="font-medium">{option.journey.from}</span>
                    <ArrowRight className="h-3 w-3" />
                    <span className="font-medium">{option.journey.to}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {option.highlights.map((highlight, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-background border rounded-full px-2 py-1 text-muted-foreground"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-5 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-foreground">
                        {option.journey.itinerary.filter(s => s.mode === 'bus').length}
                      </div>
                      <div className="text-muted-foreground">Bus rides</div>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {formatTime(option.journey.total_time_min)}
                      </div>
                      <div className="text-muted-foreground">Total time</div>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {option.journey.transfers}
                      </div>
                      <div className="text-muted-foreground">Transfers</div>
                    </div>
                    <div>
                      <div className="font-medium text-success">
                        {option.firstBus}
                      </div>
                      <div className="text-muted-foreground">First bus</div>
                    </div>
                    <div>
                      <div className="font-medium text-info">
                        {option.lastBus}
                      </div>
                      <div className="text-muted-foreground">Last bus</div>
                    </div>
                  </div>
                </div>

                <div className="ml-4 flex flex-col items-end gap-2">
                  <Button 
                    variant={selectedRouteId === option.id ? "default" : "outline"}
                    size="sm"
                    className="min-w-[100px]"
                  >
                    {selectedRouteId === option.id ? 'Selected' : 'Select'}
                  </Button>
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