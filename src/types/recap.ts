/**
 * Data types for Calltime Wrapped
 * Backend team: Implement these interfaces when connecting to AWS data sources
 */

export interface UserRecapData {
  userId: string;
  year: number;
  stats: CareerStats;
  archetype: Archetype;
  collaborators: Collaborator[];
  locations: LocationData;
  habits: HabitData;
}

export interface CareerStats {
  daysOnSet: number;
  totalHours: number;
  projectCount: number;
  waterBottlesConsumed: number;
  stepsOnSet: number;
  powerDistroRuns: number;
  avgCallTime: string;
  earliestCall: string;
  latestWrap: string;
}

export interface Archetype {
  type: 'specialist' | 'generalist' | 'rising-star' | 'veteran' | 'collaborator';
  title: string;
  description: string;
  stats: {
    label: string;
    value: string | number;
  }[];
}

export interface Collaborator {
  name: string;
  role: string;
  daysWorkedTogether: number;
  avatarUrl?: string;
}

export interface LocationData {
  primaryLocation: {
    city: string;
    state: string;
    percentage: number;
    daysWorked: number;
  };
  secondaryLocations: {
    city: string;
    state: string;
    daysWorked: number;
  }[];
  onLocationDays: number;
  totalUniqueLocations: number;
}

export interface HabitData {
  avgSleepHours: number;
  avgMorningRoutine: number;
  avgArrivalEarly: number;
  mostCommonCallTime: string;
  noPeelStreak: number;
}

export interface RecapSlideData {
  type: 'welcome' | 'stats' | 'archetype' | 'collaborators' | 'locations' | 'habits' | 'share';
  data?: any;
}
