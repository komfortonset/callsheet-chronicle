/**
 * Recap Data Service
 * 
 * Backend Developer Integration Guide:
 * ====================================
 * 
 * Replace the mock data in this file with actual AWS API calls.
 * 
 * Data Sources Needed:
 * 1. User callsheet history (from wrapped submissions)
 * 2. Aggregate statistics (days, hours, projects)
 * 3. Co-worker relationships (from callsheet contacts)
 * 4. Location data (from callsheet locations)
 * 5. Habit tracking data (from daily wrap submissions)
 * 
 * AWS Integration Steps:
 * 1. Replace getUserRecapData() with API Gateway endpoint call
 * 2. Add authentication/authorization (AWS Cognito tokens)
 * 3. Implement error handling for failed requests
 * 4. Add loading states
 * 5. Cache data appropriately
 * 
 * Example AWS Integration:
 * 
 * export const getUserRecapData = async (userId: string, year: number): Promise<UserRecapData> => {
 *   const response = await fetch(`${API_GATEWAY_URL}/recap/${userId}/${year}`, {
 *     headers: {
 *       'Authorization': `Bearer ${await getAuthToken()}`,
 *       'Content-Type': 'application/json'
 *     }
 *   });
 *   
 *   if (!response.ok) {
 *     throw new Error('Failed to fetch recap data');
 *   }
 *   
 *   return response.json();
 * };
 */

import { UserRecapData } from '@/types/recap';

// MOCK DATA - Replace with AWS API calls
export const getUserRecapData = async (userId: string, year: number = 2025): Promise<UserRecapData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data structure - Backend should return this exact shape from AWS
  return {
    userId,
    year,
    stats: {
      daysOnSet: 127,
      totalHours: 1524,
      projectCount: 12,
      waterBottlesConsumed: 381,
      stepsOnSet: 892450,
      powerDistroRuns: 67,
      avgCallTime: '7:30 AM',
      earliestCall: '4:15 AM',
      latestWrap: '11:45 PM',
    },
    archetype: {
      type: 'specialist',
      title: "You're a Specialist",
      description: "You've mastered your craft, working consistently in your niche with precision and expertise",
      stats: [
        { label: 'Same Department', value: '92%' },
        { label: 'Repeat Crews', value: 8 },
        { label: 'Avg. Rating', value: '5.2★' },
      ],
    },
    collaborators: [
      { name: 'Sarah Chen', role: 'Director of Photography', daysWorkedTogether: 42 },
      { name: 'Marcus Johnson', role: '1st AD', daysWorkedTogether: 38 },
      { name: 'Elena Rodriguez', role: 'Gaffer', daysWorkedTogether: 34 },
      { name: 'Alex Kim', role: 'Production Designer', daysWorkedTogether: 28 },
      { name: 'Jordan Matthews', role: 'Sound Mixer', daysWorkedTogether: 25 },
    ],
    locations: {
      primaryLocation: {
        city: 'Los Angeles',
        state: 'CA',
        percentage: 67,
        daysWorked: 85,
      },
      secondaryLocations: [
        { city: 'New York', state: 'NY', daysWorked: 28 },
        { city: 'Atlanta', state: 'GA', daysWorked: 14 },
      ],
      onLocationDays: 14,
      totalUniqueLocations: 8,
    },
    habits: {
      avgSleepHours: 7.2,
      avgMorningRoutine: 1.5,
      avgArrivalEarly: 0.75,
      mostCommonCallTime: '7:00 AM',
      noPeelStreak: 8,
    },
  };
};

/**
 * Calculate archetype based on user patterns
 * Backend: Implement this logic in AWS Lambda for better performance
 */
export const calculateArchetype = (stats: UserRecapData['stats']): UserRecapData['archetype'] => {
  // This is a simplified version - backend should implement more sophisticated logic
  // based on department consistency, crew diversity, career progression, etc.
  
  return {
    type: 'specialist',
    title: "You're a Specialist",
    description: "You've mastered your craft, working consistently in your niche with precision and expertise",
    stats: [
      { label: 'Same Department', value: '92%' },
      { label: 'Repeat Crews', value: 8 },
      { label: 'Avg. Rating', value: '5.2★' },
    ],
  };
};

/**
 * Get shareable image URLs for social media
 * Backend: Implement with AWS S3/CloudFront for image generation
 */
export const generateShareImages = async (userId: string, year: number): Promise<string[]> => {
  // Backend should generate social media optimized images (1080x1920 for Stories)
  // and return S3 URLs
  return [
    '/share/slide-1.png',
    '/share/slide-2.png',
    '/share/slide-3.png',
  ];
};
