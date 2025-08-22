import React from 'react';
import type { JourneyPlan } from './JourneyResults';

interface SimpleRouteMapProps {
  journey: JourneyPlan | null;
}

const SimpleRouteMap: React.FC<SimpleRouteMapProps> = ({ journey }) => {
  if (!journey) {
    return (
      <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Search for a route to see the map</p>
      </div>
    );
  }

  // Create a visual representation of the route
  const steps = journey.itinerary;
  
  return (
    <div className="w-full h-64 bg-gradient-to-br from-primary/5 to-accent/10 rounded-lg p-6 overflow-auto">
      <div className="space-y-4">
        <div className="text-center mb-4">
          <h4 className="font-semibold text-foreground">Route Visualization</h4>
          <p className="text-sm text-muted-foreground">
            {journey.from} → {journey.to}
          </p>
        </div>
        
        <div className="flex flex-col space-y-3">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                step.mode === 'bus' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground'
              }`}>
                {step.mode === 'bus' ? '🚍' : '🚶'}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {step.from}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {step.eta_min}m
                  </span>
                </div>
                
                {step.mode === 'bus' && step.route && (
                  <div className="text-xs text-primary font-medium">
                    {step.route}
                  </div>
                )}
                
                <div className="text-xs text-muted-foreground">
                  → {step.to}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="w-px h-4 bg-border ml-4" />
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-primary">
                {Math.floor(journey.total_time_min / 60)}h {journey.total_time_min % 60}m
              </div>
              <div className="text-xs text-muted-foreground">Total Time</div>
            </div>
            <div>
              <div className="text-lg font-bold text-primary">{journey.transfers}</div>
              <div className="text-xs text-muted-foreground">Transfers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleRouteMap;