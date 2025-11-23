# Gift Sending Feature - Backend Integration

## Overview
This feature allows users to send thank you gifts to their top collaborators via personalized payment links.

## User Flow
1. User views their Top Collaborators slide in Wrapped
2. User clicks "Send Thank You Gifts" button
3. Dialog opens showing all collaborators
4. User selects which collaborators to send gifts to
5. User clicks "Send Gifts"
6. Backend generates personalized payment links for each selected collaborator
7. Backend sends email to each collaborator with their unique gift link
8. Collaborator receives email, clicks link, and can claim/customize their gift

## Backend Requirements

### 1. API Endpoint: Send Gifts
**Endpoint:** `POST /api/gifts/send`

**Authentication:** Required (AWS Cognito token)

**Request Body:**
```typescript
{
  senderUserId: string;
  recipients: Array<{
    name: string;
    role: string;
    daysWorkedTogether: number;
    email?: string; // Fetch from your contacts/crew database if not provided
  }>;
  year: number;
  message?: string; // Optional custom message from sender
}
```

**Response:**
```typescript
{
  success: boolean;
  sentCount: number;
  failedRecipients?: string[]; // Names of recipients where sending failed
  error?: string;
}
```

### 2. Payment Link Generation

You mentioned you'll provide payment links. Here are the integration options:

#### Option A: Stripe Payment Links (Recommended)
```typescript
// Backend pseudocode
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function createGiftPaymentLink(recipient, sender) {
  const paymentLink = await stripe.paymentLinks.create({
    line_items: [{
      price: 'price_xxxxx', // Your gift product price ID
      quantity: 1,
    }],
    metadata: {
      recipientName: recipient.name,
      recipientRole: recipient.role,
      senderUserId: sender.userId,
      year: '2025',
      daysWorkedTogether: recipient.daysWorkedTogether.toString(),
    },
    custom_text: {
      submit: {
        message: `A thank you gift from your colleague for ${recipient.daysWorkedTogether} days of collaboration!`
      }
    },
    after_completion: {
      type: 'redirect',
      redirect: {
        url: 'https://your-app.com/gift/claimed'
      }
    }
  });
  
  return paymentLink.url;
}
```

#### Option B: Custom Gift Links
If you're providing pre-generated links:
```typescript
// Backend pseudocode
async function generateCustomGiftLink(recipient, sender) {
  // Generate unique code
  const giftCode = generateUniqueCode();
  
  // Store in database
  await db.gifts.create({
    code: giftCode,
    recipientName: recipient.name,
    recipientEmail: recipient.email,
    senderUserId: sender.userId,
    status: 'sent',
    createdAt: new Date(),
  });
  
  // Return your custom link format
  return `https://your-gift-portal.com/claim/${giftCode}`;
}
```

### 3. Email Sending (Resend)

**Setup:**
1. User needs Resend account: https://resend.com
2. Verify email domain: https://resend.com/domains
3. Create API key: https://resend.com/api-keys
4. Add `RESEND_API_KEY` to your secrets

**Example Edge Function:**
```typescript
// supabase/functions/send-gift-email/index.ts
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface GiftEmailRequest {
  recipientName: string;
  recipientEmail: string;
  recipientRole: string;
  daysWorkedTogether: number;
  giftLink: string;
  senderName: string;
  year: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      recipientName, 
      recipientEmail, 
      recipientRole,
      daysWorkedTogether,
      giftLink,
      senderName,
      year 
    }: GiftEmailRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "Calltime <gifts@yourcalltimedomain.com>",
      to: [recipientEmail],
      subject: `${senderName} sent you a thank you gift! 🎁`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
              .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
              .header { text-align: center; margin-bottom: 40px; }
              .emoji { font-size: 64px; margin-bottom: 20px; }
              .title { font-size: 28px; font-weight: bold; color: #000; margin-bottom: 10px; }
              .subtitle { font-size: 18px; color: #666; margin-bottom: 30px; }
              .stats { background: #FDB300; padding: 30px; border-radius: 20px; margin: 30px 0; }
              .stat-item { margin: 10px 0; font-size: 16px; }
              .cta-button { 
                display: inline-block;
                background: #000;
                color: #FDB300;
                padding: 16px 40px;
                border-radius: 12px;
                text-decoration: none;
                font-weight: bold;
                font-size: 18px;
                margin: 20px 0;
              }
              .footer { text-align: center; color: #999; font-size: 14px; margin-top: 40px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="emoji">🎁</div>
                <h1 class="title">You've Got a Thank You Gift!</h1>
                <p class="subtitle">From ${senderName}</p>
              </div>
              
              <div class="stats">
                <p><strong>Your ${year} collaboration:</strong></p>
                <div class="stat-item">🎬 ${daysWorkedTogether} days worked together</div>
                <div class="stat-item">👤 Role: ${recipientRole}</div>
              </div>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333;">
                Hi ${recipientName},<br><br>
                ${senderName} wanted to show their appreciation for working with you this year! 
                They've sent you a special thank you gift to celebrate your collaboration.
              </p>
              
              <div style="text-align: center; margin: 40px 0;">
                <a href="${giftLink}" class="cta-button">
                  Claim Your Gift
                </a>
              </div>
              
              <p class="footer">
                Sent via Calltime Wrapped ${year}<br>
                Celebrating the people who make production happen
              </p>
            </div>
          </body>
        </html>
      `,
    });

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error sending gift email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
```

### 4. Database Schema (Optional)

Track gift sending history:

```sql
CREATE TABLE gift_sends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_user_id UUID NOT NULL,
  recipient_name VARCHAR(255) NOT NULL,
  recipient_email VARCHAR(255) NOT NULL,
  recipient_role VARCHAR(255),
  days_worked_together INTEGER,
  gift_link TEXT NOT NULL,
  year INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'sent', -- sent, claimed, expired
  sent_at TIMESTAMP DEFAULT NOW(),
  claimed_at TIMESTAMP,
  metadata JSONB
);

CREATE INDEX idx_gift_sends_sender ON gift_sends(sender_user_id, year);
CREATE INDEX idx_gift_sends_recipient ON gift_sends(recipient_email);
```

## Integration Checklist

- [ ] Create `/api/gifts/send` endpoint
- [ ] Implement payment link generation (provide your link format/template)
- [ ] Set up Resend account and verify domain
- [ ] Create gift email edge function
- [ ] Test email delivery
- [ ] Add gift tracking database table (optional)
- [ ] Implement error handling for failed sends
- [ ] Add rate limiting to prevent abuse
- [ ] Create gift claiming/redemption page
- [ ] Test end-to-end flow

## What You Need to Provide

Please provide:
1. **Payment link format** - How should the gift links be structured?
2. **Gift options** - What can recipients claim (subscription, merch, gift card amount)?
3. **Email domain** - What domain should emails come from?
4. **Branding assets** - Logo, colors for email template
5. **Gift claiming page** - Where should the link redirect to?

## Testing

Use the SendGiftDialog component to test with mock data. The dialog is already functional and will display success/error messages based on your API responses.
