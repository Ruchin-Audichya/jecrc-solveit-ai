export type UserRole = 'student' | 'resolver' | 'admin';

export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';

export type TicketPriority = 'low' | 'medium' | 'high';

export type TicketCategory = 'IT' | 'Housekeeping' | 'Academic' | 'Infrastructure' | 'Transport' | 'Other';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  location: string;
  createdBy: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  attachments?: string[];
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  userId: string;
  message: string;
  isInternal: boolean;
  createdAt: string;
  attachments?: string[];
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}