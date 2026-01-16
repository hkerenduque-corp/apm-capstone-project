export type SourceType = 'gmail' | 'calendar' | 'docs' | 'sheets';

export interface Signal {
  id: string;
  source: SourceType;
  title: string;
  content: string; // The raw content (email body, comment thread, etc.)
  sender: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  tags: string[];
  isRead: boolean;
  simulationData?: {
    location?: string; // e.g., "Cell E45" or "Line 124"
    originalValue?: string;
    newValue?: string;
  };
}

export interface SuggestedTask {
  type: 'email_draft' | 'doc_edit' | 'calendar_invite' | 'general_reply';
  title: string;
  description: string;
  preview: string;
}

export interface AISummaryResult {
  summary: string;
  actionItems: string[];
  sentiment?: 'positive' | 'neutral' | 'negative' | 'urgent';
  suggestedTask?: SuggestedTask;
}
