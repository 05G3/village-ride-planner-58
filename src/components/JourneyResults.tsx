import React from 'react';
import { Clock, MapPin, Bus, Navigation, ArrowRight, IndianRupee, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export interface JourneyStep {
  mode: 'walk' | 'bus';
  from: string;
  to: string;
  eta_min: number;
  route?: string;
}

export interface JourneyPlan {
  from: string;
  to: string;
  itinerary: JourneyStep[];
  total_time_min: number;
  transfers: number;
}

interface JourneyResultsProps {
  journey: JourneyPlan;
  estimatedFare?: number;
  firstBus?: string;
  lastBus?: string;
  onPlanReturn?: () => void;
}

const JourneyResults: React.FC<JourneyResultsProps> = ({ 
  journey, 
  estimatedFare, 
  firstBus, 
  lastBus, 
  onPlanReturn 
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

  const getStepIcon = (mode: string) => {
    switch (mode) {
      case 'bus':
        return <Bus className="h-4 w-4" />;
      case 'walk':
        return <Navigation className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getStepColor = (mode: string) => {
    switch (mode) {
      case 'bus':
        return 'bg-primary text-primary-foreground';
      case 'walk':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Journey Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {journey.from} → {journey.to}
            </span>
            <div className="flex gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatTime(journey.total_time_min)}
              </Badge>
              {estimatedFare && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <IndianRupee className="h-3 w-3" />
                  ₹{estimatedFare}
                </Badge>
              )}
              <Badge variant="secondary">
                {journey.transfers} {journey.transfers !== 1 ? t('journey.transfers.plural') : t('journey.transfers')}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Journey Steps */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{t('journey.steps')}</CardTitle>
            {onPlanReturn && (
              <Button variant="outline" size="sm" onClick={onPlanReturn}>
                🔄 {t('return.trip')}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {journey.itinerary.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`rounded-full p-2 ${getStepColor(step.mode)}`}>
                      {getStepIcon(step.mode)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">
                          {step.mode === 'bus' ? `${t('journey.take.bus')} ${step.route}` : t('journey.walk')}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {formatTime(step.eta_min)}
                        </Badge>
                        {/* Highlight transfer points */}
                        {step.mode === 'bus' && index > 0 && journey.itinerary[index - 1].mode === 'bus' && (
                          <Badge variant="destructive" className="text-xs animate-pulse">
                            🔄 Transfer Point
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{step.from}</span>
                        <ArrowRight className="h-3 w-3" />
                        <span>{step.to}</span>
                      </div>
                    </div>
    
                    {index < journey.itinerary.length - 1 && (
                      <div className="w-px h-8 bg-border ml-4" />
                    )}
                  </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{journey.itinerary.length}</div>
              <div className="text-sm text-muted-foreground">{t('journey.steps.count')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {journey.itinerary.filter(s => s.mode === 'bus').length}
              </div>
              <div className="text-sm text-muted-foreground">{t('journey.bus.rides')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{journey.transfers}</div>
              <div className="text-sm text-muted-foreground">{t('journey.transfers.count')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {formatTime(journey.total_time_min)}
              </div>
              <div className="text-sm text-muted-foreground">{t('journey.total.time')}</div>
            </div>
          </div>
          
          {(estimatedFare || firstBus || lastBus) && (
            <div className="mt-6 pt-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                {estimatedFare && (
                  <div className="flex items-center justify-center gap-2">
                    <IndianRupee className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-semibold">₹{estimatedFare}</div>
                      <div className="text-xs text-muted-foreground">{t('journey.estimated.fare')}</div>
                    </div>
                  </div>
                )}
                {firstBus && (
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-semibold">{firstBus}</div>
                      <div className="text-xs text-muted-foreground">First Bus</div>
                    </div>
                  </div>
                )}
                {lastBus && (
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-semibold">{lastBus}</div>
                      <div className="text-xs text-muted-foreground">Last Bus</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JourneyResults;