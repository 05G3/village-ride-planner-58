import type { JourneyPlan } from '@/components/JourneyResults';

export interface RouteOption {
  id: string;
  type: 'fastest' | 'cheapest' | 'comfortable' | 'direct';
  label: string;
  journey: JourneyPlan;
  highlights: string[];
  estimatedFare: number;
  firstBus: string;
  lastBus: string;
}

// Mock route data with multiple alternatives for each route
const mockRoutes: { [key: string]: RouteOption[] } = {
  'vijayawada-buttayagudem': [
    {
      id: 'vjw-btg-fast',
      type: 'fastest',
      label: 'Vijayawada → Buttayagudem',
      highlights: ['3 buses', '1 ticket per leg', 'Rural connectivity'],
      estimatedFare: 275,
      firstBus: '5:30 AM',
      lastBus: '9:00 PM',
      journey: {
        from: 'Vijayawada',
        to: 'Buttayagudem',
        itinerary: [
          { mode: 'bus', route: 'Bus 101', from: 'Vijayawada', to: 'Eluru', eta_min: 90 },
          { mode: 'bus', route: 'Bus 202', from: 'Eluru', to: 'Jangareddygudem', eta_min: 120 },
          { mode: 'bus', route: 'Bus 303', from: 'Jangareddygudem', to: 'Buttayagudem', eta_min: 75 }
        ],
        total_time_min: 285,
        transfers: 2
      }
    }
  ],
  'rajahmundry-maredumilli': [
    {
      id: 'rjy-mml-direct',
      type: 'direct',
      label: 'Rajahmundry → Maredumilli',
      highlights: ['Forest route', '2 legs', 'Scenic ride'],
      estimatedFare: 200,
      firstBus: '6:00 AM',
      lastBus: '8:00 PM',
      journey: {
        from: 'Rajahmundry',
        to: 'Maredumilli',
        itinerary: [
          { mode: 'bus', route: 'Bus 111', from: 'Rajahmundry', to: 'Rampachodavaram', eta_min: 105 },
          { mode: 'bus', route: 'Bus 222', from: 'Rampachodavaram', to: 'Maredumilli', eta_min: 75 }
        ],
        total_time_min: 180,
        transfers: 1
      }
    }
  ],
  'rajahmundry-rampachodavaram': [
    {
      id: 'rjy-rcm-direct',
      type: 'direct',
      label: 'Rajahmundry → Rampachodavaram',
      highlights: ['Single bus', 'Hilly stretch'],
      estimatedFare: 125,
      firstBus: '5:45 AM',
      lastBus: '7:30 PM',
      journey: {
        from: 'Rajahmundry',
        to: 'Rampachodavaram',
        itinerary: [
          { mode: 'bus', route: 'Bus 121', from: 'Rajahmundry', to: 'Rampachodavaram', eta_min: 100 }
        ],
        total_time_min: 100,
        transfers: 0
      }
    }
  ],
  'visakhapatnam-chintapalli': [
    {
      id: 'viz-cpl-scenic',
      type: 'comfortable',
      label: 'Visakhapatnam → Chintapalli',
      highlights: ['Araku belt', 'Ghats', '2 legs'],
      estimatedFare: 245,
      firstBus: '5:00 AM',
      lastBus: '7:00 PM',
      journey: {
        from: 'Visakhapatnam',
        to: 'Chintapalli',
        itinerary: [
          { mode: 'bus', route: 'Bus 131', from: 'Visakhapatnam', to: 'Narsipatnam', eta_min: 150 },
          { mode: 'bus', route: 'Bus 241', from: 'Narsipatnam', to: 'Chintapalli', eta_min: 120 }
        ],
        total_time_min: 270,
        transfers: 1
      }
    }
  ]
};

// Generate a route key from source and destination
const getRouteKey = (from: string, to: string): string => {
  return `${from.toLowerCase().replace(/\s+/g, '-')}-${to.toLowerCase().replace(/\s+/g, '-')}`;
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const findRoutes = async (from: string, to: string): Promise<RouteOption[] | null> => {
  // Simulate API call delay
  await delay(1500);
  
  const routeKey = getRouteKey(from, to);
  
  // Check if we have predefined routes
  if (mockRoutes[routeKey]) {
    return mockRoutes[routeKey];
  }
  
  // Check reverse route
  const reverseKey = getRouteKey(to, from);
  if (mockRoutes[reverseKey]) {
    const reverseRoutes = mockRoutes[reverseKey];
    return reverseRoutes.map(route => ({
      ...route,
      id: `${route.id}-reverse`,
      journey: {
        ...route.journey,
        from: to,
        to: from,
        itinerary: route.journey.itinerary.map(step => ({
          ...step,
          from: step.to,
          to: step.from
        })).reverse()
      }
    }));
  }
  
  // If no predefined route, return null (route not found)
  return null;
};

// Legacy function for backward compatibility
export const findRoute = async (from: string, to: string): Promise<JourneyPlan | null> => {
  const routes = await findRoutes(from, to);
  if (!routes || routes.length === 0) return null;
  
  // Return the fastest route by default
  const fastestRoute = routes.find(r => r.type === 'fastest') || routes[0];
  return fastestRoute.journey;
};

// Get available routes for demo
export const getAvailableRoutes = (): Array<{ from: string; to: string }> => {
  return [
    { from: 'Vijayawada', to: 'Buttayagudem' },
    { from: 'Rajahmundry', to: 'Maredumilli' },
    { from: 'Rajahmundry', to: 'Rampachodavaram' },
    { from: 'Visakhapatnam', to: 'Chintapalli' }
  ];
};