import React from 'react';
import { Clock, MapPin, Bus, Navigation, ArrowRight, IndianRupee, Calendar, Download, MessageSquare, Share2, RotateCcw } from 'lucide-react';
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
        return <Bus className="h-5 w-5" />;
      case 'walk':
        return <Navigation className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  const getStepColor = (mode: string) => {
    switch (mode) {
      case 'bus':
        return 'bg-rural-green text-white';
      case 'walk':
        return 'bg-rural-orange text-white';
      default:
        return 'bg-rural-sky text-white';
    }
  };

  const handleDownload = () => {
    // Implementation for downloading route
    console.log('Downloading route...');
  };

  const handleSMS = () => {
    // Implementation for SMS
    console.log('Sending SMS...');
  };

  const handleShare = () => {
    // Implementation for sharing
    console.log('Sharing route...');
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Journey Summary Card */}
      <Card className="rural-card shadow-strong">
        <CardHeader className="pb-4">
          <CardTitle className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-rural-green to-rural-leaf">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {journey.from} → {journey.to}
                </h2>
                <p className="text-muted-foreground">Your journey plan is ready</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-rural-green/10 text-rural-green border-rural-green/20 px-3 py-2">
                <Clock className="h-4 w-4 mr-2" />
                {formatTime(journey.total_time_min)}
              </Badge>
              {estimatedFare && (
                <Badge className="bg-rural-orange/10 text-rural-orange border-rural-orange/20 px-3 py-2">
                  <IndianRupee className="h-4 w-4 mr-2" />
                  ₹{estimatedFare}
                </Badge>
              )}
              <Badge className="bg-rural-sky/10 text-rural-sky border-rural-sky/20 px-3 py-2">
                {journey.transfers} {journey.transfers !== 1 ? t('journey.transfers.plural') : t('journey.transfers')}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleDownload} className="rural-button-primary">
              <Download className="h-4 w-4 mr-2" />
              Download Route
            </Button>
            <Button onClick={handleSMS} className="rural-button-secondary">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send SMS
            </Button>
            <Button onClick={handleShare} className="rural-button-accent">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            {onPlanReturn && (
              <Button variant="outline" onClick={onPlanReturn} className="border-rural-green text-rural-green hover:bg-rural-green hover:text-white">
                <RotateCcw className="h-4 w-4 mr-2" />
                {t('return.trip')}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Timeline Journey Steps */}
      <Card className="rural-card shadow-strong">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rural-green/10">
              <Navigation className="h-4 w-4 text-rural-green" />
            </div>
            <span className="text-xl">{t('journey.steps')}</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rural-green via-rural-orange to-rural-sky"></div>
            
            <div className="space-y-6">
              {journey.itinerary.map((step, index) => (
                <div key={index} className="relative flex items-start gap-4">
                  {/* Step Icon */}
                  <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full ${getStepColor(step.mode)} shadow-medium`}>
                    {getStepIcon(step.mode)}
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1 pt-2">
                    <div className="bg-muted/30 rounded-xl p-4 border-l-4 border-rural-green">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-lg text-foreground">
                            {step.mode === 'bus' ? `${t('journey.take.bus')} ${step.route}` : t('journey.walk')}
                          </span>
                          <Badge className="bg-white text-foreground border-rural-green/20">
                            {formatTime(step.eta_min)}
                          </Badge>
                        </div>
                        
                        {/* Transfer Indicator */}
                        {step.mode === 'bus' && index > 0 && journey.itinerary[index - 1].mode === 'bus' && (
                          <Badge className="bg-rural-orange text-white animate-pulse">
                            🔄 Transfer Point
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <span className="font-medium">{step.from}</span>
                        <ArrowRight className="h-4 w-4 text-rural-green" />
                        <span className="font-medium">{step.to}</span>
                      </div>
                      
                      {/* Step Details */}
                      <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Duration: {formatTime(step.eta_min)}
                        </span>
                        {step.mode === 'bus' && (
                          <span className="flex items-center gap-1">
                            <Bus className="h-3 w-3" />
                            Route: {step.route}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Journey Statistics */}
      <Card className="rural-card shadow-strong">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-rural-green">{journey.itinerary.length}</div>
              <div className="text-sm text-muted-foreground font-medium">{t('journey.steps.count')}</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-rural-orange">
                {journey.itinerary.filter(s => s.mode === 'bus').length}
              </div>
              <div className="text-sm text-muted-foreground font-medium">{t('journey.bus.rides')}</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-rural-sky">{journey.transfers}</div>
              <div className="text-sm text-muted-foreground font-medium">{t('journey.transfers.count')}</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-rural-green">
                {formatTime(journey.total_time_min)}
              </div>
              <div className="text-sm text-muted-foreground font-medium">{t('journey.total.time')}</div>
            </div>
          </div>
          
          {/* Additional Journey Info */}
          {(estimatedFare || firstBus || lastBus) && (
            <div className="mt-8 pt-6 border-t border-border/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {estimatedFare && (
                  <div className="text-center p-4 bg-rural-green/5 rounded-xl border border-rural-green/20">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <IndianRupee className="h-6 w-6 text-rural-green" />
                      <span className="text-2xl font-bold text-rural-green">₹{estimatedFare}</span>
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">{t('journey.estimated.fare')}</div>
                  </div>
                )}
                {firstBus && (
                  <div className="text-center p-4 bg-rural-orange/5 rounded-xl border border-rural-orange/20">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Calendar className="h-6 w-6 text-rural-orange" />
                      <span className="text-xl font-bold text-rural-orange">{firstBus}</span>
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">First Bus</div>
                  </div>
                )}
                {lastBus && (
                  <div className="text-center p-4 bg-rural-sky/5 rounded-xl border border-rural-sky/20">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Calendar className="h-6 w-6 text-rural-sky" />
                      <span className="text-xl font-bold text-rural-sky">{lastBus}</span>
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">Last Bus</div>
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