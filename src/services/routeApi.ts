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
  'vijayawada-kotha-rajanagaram': [
    {
      id: 'fast-1',
      type: 'fastest',
      label: 'Fastest Route',
      highlights: ['Quickest journey', 'Express buses', '1 transfer'],
      estimatedFare: 85,
      firstBus: '5:30 AM',
      lastBus: '9:45 PM',
      journey: {
        from: 'Vijayawada',
        to: 'Kotha Rajanagaram',
        itinerary: [
          {
            mode: 'walk',
            from: 'PNBS Gate 2',
            to: 'Bay 6',
            eta_min: 5
          },
          {
            mode: 'bus',
            route: 'APSRTC 600 Express',
            from: 'Vijayawada PNBS',
            to: 'Rajahmundry RTC',
            eta_min: 135
          },
          {
            mode: 'bus',
            route: 'City 38A',
            from: 'Rajahmundry RTC',
            to: 'Kotha Rajanagaram X Road',
            eta_min: 25
          },
          {
            mode: 'walk',
            from: 'X Road',
            to: 'Village Centre',
            eta_min: 10
          }
        ],
        total_time_min: 175,
        transfers: 1
      }
    },
    {
      id: 'cheap-1',
      type: 'cheapest',
      label: 'Budget Route',
      highlights: ['Lowest cost', 'Local buses', 'More stops'],
      estimatedFare: 65,
      firstBus: '6:00 AM',
      lastBus: '8:30 PM',
      journey: {
        from: 'Vijayawada',
        to: 'Kotha Rajanagaram',
        itinerary: [
          {
            mode: 'walk',
            from: 'PNBS Gate 2',
            to: 'Bay 8',
            eta_min: 7
          },
          {
            mode: 'bus',
            route: 'APSRTC 601 Local',
            from: 'Vijayawada PNBS',
            to: 'Rajahmundry RTC',
            eta_min: 165
          },
          {
            mode: 'bus',
            route: 'Village 38B',
            from: 'Rajahmundry RTC',
            to: 'Kotha Rajanagaram',
            eta_min: 35
          },
          {
            mode: 'walk',
            from: 'Bus Stop',
            to: 'Village Centre',
            eta_min: 8
          }
        ],
        total_time_min: 215,
        transfers: 1
      }
    },
    {
      id: 'comfort-1',
      type: 'comfortable',
      label: 'Comfort Route',
      highlights: ['AC buses', 'Reserved seats', 'Less crowded'],
      estimatedFare: 125,
      firstBus: '6:30 AM',
      lastBus: '10:00 PM',
      journey: {
        from: 'Vijayawada',
        to: 'Kotha Rajanagaram',
        itinerary: [
          {
            mode: 'walk',
            from: 'PNBS Gate 1',
            to: 'Premium Bay',
            eta_min: 3
          },
          {
            mode: 'bus',
            route: 'APSRTC Garuda Plus',
            from: 'Vijayawada PNBS',
            to: 'Rajahmundry RTC',
            eta_min: 140
          },
          {
            mode: 'bus',
            route: 'Express 38X',
            from: 'Rajahmundry RTC',
            to: 'Kotha Rajanagaram',
            eta_min: 28
          },
          {
            mode: 'walk',
            from: 'Main Stop',
            to: 'Village Centre',
            eta_min: 5
          }
        ],
        total_time_min: 176,
        transfers: 1
      }
    }
  ],
  'hyderabad-karimnagar': [
    {
      id: 'direct-1',
      type: 'direct',
      label: 'Direct Route',
      highlights: ['No transfers', 'Express service', 'Direct connection'],
      estimatedFare: 95,
      firstBus: '5:45 AM',
      lastBus: '9:15 PM',
      journey: {
        from: 'Hyderabad',
        to: 'Karimnagar',
        itinerary: [
          {
            mode: 'walk',
            from: 'MGBS Bus Station',
            to: 'Platform 12',
            eta_min: 5
          },
          {
            mode: 'bus',
            route: 'TSRTC Express',
            from: 'Hyderabad MGBS',
            to: 'Karimnagar Bus Stand',
            eta_min: 180
          },
          {
            mode: 'walk',
            from: 'Bus Stand',
            to: 'City Center',
            eta_min: 8
          }
        ],
        total_time_min: 193,
        transfers: 0
      }
    },
    {
      id: 'fast-2',
      type: 'fastest',
      label: 'Fastest Route',
      highlights: ['Super Express', 'Highway route', 'Limited stops'],
      estimatedFare: 105,
      firstBus: '5:15 AM',
      lastBus: '9:30 PM',
      journey: {
        from: 'Hyderabad',
        to: 'Karimnagar',
        itinerary: [
          {
            mode: 'walk',
            from: 'MGBS Bus Station',
            to: 'Express Platform',
            eta_min: 4
          },
          {
            mode: 'bus',
            route: 'TSRTC Super Express',
            from: 'Hyderabad MGBS',
            to: 'Karimnagar',
            eta_min: 165
          },
          {
            mode: 'walk',
            from: 'Express Stop',
            to: 'City Center',
            eta_min: 6
          }
        ],
        total_time_min: 175,
        transfers: 0
      }
    }
  ],
  'warangal-bhadrachalam': [
    {
      id: 'scenic-1',
      type: 'comfortable',
      label: 'Scenic Route',
      highlights: ['Beautiful views', 'Comfortable buses', 'Rest stops'],
      estimatedFare: 88,
      firstBus: '6:15 AM',
      lastBus: '8:45 PM',
      journey: {
        from: 'Warangal',
        to: 'Bhadrachalam',
        itinerary: [
          {
            mode: 'walk',
            from: 'Warangal Bus Station',
            to: 'Bay 4',
            eta_min: 3
          },
          {
            mode: 'bus',
            route: 'TSRTC 142K',
            from: 'Warangal Bus Station',
            to: 'Khammam RTC',
            eta_min: 120
          },
          {
            mode: 'bus',
            route: 'Local 28B',
            from: 'Khammam RTC',
            to: 'Bhadrachalam Temple',
            eta_min: 45
          },
          {
            mode: 'walk',
            from: 'Temple Stop',
            to: 'Town Center',
            eta_min: 5
          }
        ],
        total_time_min: 173,
        transfers: 1
      }
    },
    {
      id: 'direct-2',
      type: 'direct',
      label: 'Direct Route',
      highlights: ['Direct connection', 'No transfers', 'Temple express'],
      estimatedFare: 110,
      firstBus: '5:00 AM',
      lastBus: '7:30 PM',
      journey: {
        from: 'Warangal',
        to: 'Bhadrachalam',
        itinerary: [
          {
            mode: 'walk',
            from: 'Warangal Bus Station',
            to: 'Long Distance Bay',
            eta_min: 5
          },
          {
            mode: 'bus',
            route: 'TSRTC Bhadrachalam Express',
            from: 'Warangal',
            to: 'Bhadrachalam Temple',
            eta_min: 195
          },
          {
            mode: 'walk',
            from: 'Temple',
            to: 'Town Center',
            eta_min: 8
          }
        ],
        total_time_min: 208,
        transfers: 0
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
    { from: 'Vijayawada', to: 'Kotha Rajanagaram' },
    { from: 'Hyderabad', to: 'Karimnagar' },
    { from: 'Warangal', to: 'Bhadrachalam' }
  ];
};