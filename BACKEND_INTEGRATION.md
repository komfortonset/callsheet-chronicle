# Backend Integration Guide for Calltime Wrapped

## Overview
This frontend is ready for your backend team to connect to AWS and your existing data sources. All data interfaces are typed and mock data can be easily replaced with real API calls.

## Architecture

```
Frontend (This Codebase)
├── Types (TypeScript interfaces) → src/types/recap.ts
├── Data Service (API calls) → src/services/recapDataService.ts
├── React Hook (Data fetching) → src/hooks/useRecapData.ts
└── Components (UI) → src/components/recap/
```

## Data Requirements

### 1. User Recap Endpoint
**Endpoint:** `GET /api/recap/{userId}/{year}`

**Authentication:** AWS Cognito token required

**Response Schema:**
```typescript
{
  userId: string;
  year: number;
  stats: {
    daysOnSet: number;
    totalHours: number;
    projectCount: number;
    waterBottlesConsumed: number;
    stepsOnSet: number;
    powerDistroRuns: number;
    avgCallTime: string;
    earliestCall: string;
    latestWrap: string;
  };
  archetype: {
    type: 'specialist' | 'generalist' | 'rising-star' | 'veteran' | 'collaborator';
    title: string;
    description: string;
    stats: Array<{ label: string; value: string | number; }>;
  };
  collaborators: Array<{
    name: string;
    role: string;
    daysWorkedTogether: number;
    avatarUrl?: string;
  }>;
  locations: {
    primaryLocation: {
      city: string;
      state: string;
      percentage: number;
      daysWorked: number;
    };
    secondaryLocations: Array<{
      city: string;
      state: string;
      daysWorked: number;
    }>;
    onLocationDays: number;
    totalUniqueLocations: number;
  };
  habits: {
    avgSleepHours: number;
    avgMorningRoutine: number;
    avgArrivalEarly: number;
    mostCommonCallTime: string;
    noPeelStreak: number;
  };
}
```

### 2. Share Image Generation Endpoint
**Endpoint:** `POST /api/recap/share/{userId}/{year}`

**Response:**
```typescript
{
  images: string[]; // S3 URLs for social media optimized images (1080x1920)
}
```

## Data Sources Needed from AWS

1. **Callsheet History Table**
   - User daily callsheet submissions
   - Fields: date, production_name, call_time, wrap_time, location, role

2. **Wrap Submissions Table**
   - Daily wrap data with trackables
   - Fields: water_bottles, steps, power_runs, no_peel_status

3. **Contacts/Crew Table**
   - Co-worker relationships from callsheets
   - Fields: contact_name, role, days_worked_together

4. **User Profile Table**
   - Basic user information
   - Fields: user_id, name, profile_photo, preferences

## Integration Steps

### Step 1: Replace Mock Data Service
File: `src/services/recapDataService.ts`

```typescript
// Replace this function:
export const getUserRecapData = async (userId: string, year: number) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/recap/${userId}/${year}`,
    {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch recap data');
  }
  
  return response.json();
};
```

### Step 2: Add Environment Variables
Create `.env` file:
```
REACT_APP_API_URL=https://your-api-gateway.amazonaws.com/prod
```

### Step 3: Implement Authentication
File: `src/pages/Index.tsx`

Replace hardcoded userId with actual authenticated user:
```typescript
// Replace this:
const userId = "demo-user-123";

// With your auth system:
const { user } = useAuth(); // Your AWS Cognito hook
const userId = user.id;
```

### Step 4: Configure CORS
Ensure your AWS API Gateway allows requests from:
- Development: `http://localhost:8080`
- Production: Your deployed domain

### Step 5: Error Handling
The frontend already handles:
- Loading states (shows loading screen)
- Error states (shows error screen with retry)
- Empty data (shows error screen)

## Data Aggregation Logic

The backend should calculate these metrics from your database:

### Statistics Calculations
```sql
-- Example queries your backend should implement

-- Days on set
SELECT COUNT(DISTINCT date) 
FROM callsheets 
WHERE user_id = ? AND YEAR(date) = ?;

-- Total hours
SELECT SUM(TIMESTAMPDIFF(HOUR, call_time, wrap_time))
FROM callsheets
WHERE user_id = ? AND YEAR(date) = ?;

-- Top collaborators
SELECT contact_name, role, COUNT(*) as days_together
FROM callsheet_contacts
WHERE user_id = ? AND YEAR(date) = ?
GROUP BY contact_name, role
ORDER BY days_together DESC
LIMIT 5;
```

### Archetype Logic
Implement business logic to determine user archetype:
- **Specialist**: 80%+ work in same department
- **Generalist**: Work across 5+ different departments
- **Rising Star**: 50%+ increase in work year-over-year
- **Veteran**: 500+ career days on set
- **Collaborator**: Works with 20+ different crew members

## Social Sharing

### Image Generation
Backend should generate 1080x1920 PNG images for Instagram Stories:
1. Use AWS Lambda with headless browser or image generation library
2. Apply Calltime brand colors (yellow #FDB300, black #000000)
3. Store in S3 bucket
4. Return CloudFront URLs

### Recommended Tech Stack for Image Generation
- AWS Lambda + Puppeteer (for complex designs)
- OR Sharp.js (for simpler graphics)
- S3 for storage
- CloudFront for CDN delivery

## Testing Checklist

- [ ] API endpoint returns correct data structure
- [ ] Authentication with AWS Cognito works
- [ ] CORS configured properly
- [ ] Error responses return appropriate HTTP status codes
- [ ] Loading states display correctly
- [ ] Data updates reflect in UI immediately
- [ ] Share functionality generates images
- [ ] Images are optimized for Instagram (1080x1920)

## Performance Considerations

1. **Caching**: Cache recap data in S3 or DynamoDB for repeat views
2. **Computation**: Pre-calculate aggregations daily via Lambda cron job
3. **Images**: Generate share images on-demand, cache in S3 for 7 days
4. **CDN**: Serve all assets through CloudFront

## Support

For questions about the frontend implementation, see:
- Type definitions: `src/types/recap.ts`
- Component documentation: Comments in each component file
- Data flow: `src/hooks/useRecapData.ts`
