/**
 * Gift/Payment Link Service
 * 
 * Backend Developer Integration Guide:
 * ====================================
 * 
 * This service handles sending personalized thank you gifts to collaborators.
 * 
 * Flow:
 * 1. User selects collaborators from their top collaborators list
 * 2. Frontend calls sendGiftLinks() with collaborator details
 * 3. Backend generates personalized payment/gift links for each collaborator
 * 4. Backend sends email to each collaborator with their unique link
 * 5. Collaborator clicks link and can claim/customize their gift
 * 
 * Backend Implementation Requirements:
 * 
 * 1. Payment Link Generation:
 *    - Create unique Stripe Payment Links or Checkout Sessions
 *    - Customize with collaborator name and relationship details
 *    - Set appropriate gift amount/options
 *    - Track which links are sent/claimed
 * 
 * 2. Email Sending (via Resend):
 *    - Personalized email template
 *    - Include collaborator's name, days worked together
 *    - Link to claim gift
 *    - Professional branding
 * 
 * 3. Gift Options (customize based on your product):
 *    - Calltime Premium subscription
 *    - Merchandise/swag
 *    - Gift cards
 *    - Custom items
 */

import { Collaborator } from "@/types/recap";

export interface GiftRecipient extends Collaborator {
  email?: string; // May need to fetch from your database
}

export interface SendGiftRequest {
  senderUserId: string;
  recipients: GiftRecipient[];
  year: number;
  message?: string;
}

export interface SendGiftResponse {
  success: boolean;
  sentCount: number;
  failedRecipients?: string[];
  error?: string;
}

/**
 * Send gift links to selected collaborators
 * 
 * Backend team: Implement this endpoint
 * POST /api/gifts/send
 * 
 * Request body:
 * {
 *   senderUserId: string,
 *   recipients: Array<{ name, role, daysWorkedTogether, email }>,
 *   year: number,
 *   message?: string
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   sentCount: number,
 *   failedRecipients?: string[],
 *   error?: string
 * }
 */
export const sendGiftLinks = async (request: SendGiftRequest): Promise<SendGiftResponse> => {
  // TODO: Replace with actual API call
  const response = await fetch(`${process.env.REACT_APP_API_URL}/gifts/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`, // Your auth implementation
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Failed to send gift links');
  }

  return response.json();
};

/**
 * Get gift sending history for a user
 * 
 * Backend team: Track which gifts have been sent and claimed
 */
export const getGiftHistory = async (userId: string, year: number) => {
  // TODO: Implement
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/gifts/history/${userId}/${year}`,
    {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch gift history');
  }

  return response.json();
};

// Placeholder for auth token - replace with your actual auth implementation
const getAuthToken = (): string => {
  // TODO: Get from AWS Cognito or your auth system
  return 'your-auth-token';
};
