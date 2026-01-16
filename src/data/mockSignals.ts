import { Signal } from '../types';

export const MOCK_SIGNALS: Signal[] = [
  {
    id: '1',
    source: 'gmail',
    title: 'Re: Q4 Marketing Strategy Review',
    content: `Hi Team,

I've reviewed the latest draft of the Q4 Marketing Strategy. Overall, it looks strong, but I have a few concerns regarding the budget allocation for the social media campaign. 

We seem to be over-indexing on Instagram while neglecting LinkedIn, which has been our highest converting channel this year. Can we shift about 20% of the ad spend to LinkedIn?

Also, @User, please double-check the dates for the holiday promo. I think they overlap with the product launch window we discussed last week. We need to ensure there's no cannibalization.

Let's sync up on this by Thursday.

Best,
Sarah`,
    sender: {
      name: 'Sarah Jenkins',
      avatar: 'https://picsum.photos/seed/sarah/100/100',
    },
    timestamp: '2025-12-12T09:30:00Z',
    priority: 'high',
    tags: ['Strategy', 'Budget', 'Q4'],
    isRead: false,
    simulationData: {
      location: "Reply Draft",
      newValue: "Hi Sarah, thanks for the feedback. I'll shift 20% of the Instagram budget to LinkedIn and verify the holiday promo dates against the product launch window. Let's discuss on Thursday."
    }
  },
  {
    id: '2',
    source: 'docs',
    title: 'Product Requirements Document - v2.4',
    content: `Comment on "User Authentication Flow":

@User I think we're missing an edge case here. What happens if the user tries to reset their password but their account is locked due to multiple failed attempts? 

We need to define the error message and the recovery path. Can you update this section? 

Also, checking the latency requirements - are we still aiming for <200ms for the auth token generation?`,
    sender: {
      name: 'David Chen',
      avatar: 'https://picsum.photos/seed/david/100/100',
    },
    timestamp: '2025-12-12T10:15:00Z',
    priority: 'medium',
    tags: ['PRD', 'Auth', 'UX'],
    isRead: false,
    simulationData: {
      location: "Comment Reply",
      newValue: "Good catch, David. I'll add the account-locked recovery flow to the PRD. Regarding latency, yes, we are still targeting <200ms."
    }
  },
  {
    id: '3',
    source: 'sheets',
    title: 'Q3 Financials - Final',
    content: `Comment on Cell E45:

@User These numbers don't match the export from Stripe. I'm seeing a $5k discrepancy in the MRR column for September. 

Can you reconcile this with the raw data logs? We need to close the books by EOD tomorrow.`,
    sender: {
      name: 'Elena Rodriguez',
      avatar: 'https://picsum.photos/seed/elena/100/100',
    },
    timestamp: '2025-12-12T11:00:00Z',
    priority: 'high',
    tags: ['Finance', 'Q3', 'Discrepancy'],
    isRead: false,
    simulationData: {
      location: "Cell E45",
      originalValue: "$45,000",
      newValue: "$50,000"
    }
  },
  {
    id: '4',
    source: 'calendar',
    title: 'Emergency Sync: Server Outage',
    content: `You have been invited to "Emergency Sync: Server Outage".

Time: Today, 1:00 PM - 1:30 PM
Location: Google Meet

Description:
We are seeing elevated error rates on the payment gateway. Need engineering and support leads on this call immediately to triage.

@User please bring the logs from the last deployment.`,
    sender: {
      name: 'Marcus Johnson',
      avatar: 'https://picsum.photos/seed/marcus/100/100',
    },
    timestamp: '2025-12-12T12:45:00Z',
    priority: 'high',
    tags: ['Incident', 'Urgent'],
    isRead: false,
  },
  {
    id: '5',
    source: 'gmail',
    title: 'Team Lunch Next Week?',
    content: `Hey everyone,

Thinking of organizing a team lunch next Friday to celebrate the launch. 

@User do you have any dietary restrictions we should be aware of? Also, any preference between Thai or Italian?

Let me know!`,
    sender: {
      name: 'Jessica Wu',
      avatar: 'https://picsum.photos/seed/jessica/100/100',
    },
    timestamp: '2025-12-12T14:00:00Z',
    priority: 'low',
    tags: ['Social', 'Lunch'],
    isRead: true,
  },
];
