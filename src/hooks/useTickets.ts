import { useState, useEffect } from 'react';
import { Ticket, TicketMessage, User } from '@/types';

// Mock data
const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'WiFi not working in Library',
    description: 'The WiFi connection is very slow and keeps disconnecting in the main library building.',
    category: 'IT',
    priority: 'high',
    status: 'open',
    location: 'Library - Ground Floor',
    createdBy: '1',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Broken chair in classroom',
    description: 'Chair in Room 301 is broken and needs replacement.',
    category: 'Infrastructure',
    priority: 'medium',
    status: 'in-progress',
    location: 'Academic Block - Room 301',
    createdBy: '1',
    assignedTo: '2',
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-15T09:15:00Z',
  },
  {
    id: '3',
    title: 'AC not working in hostel',
    description: 'Air conditioning unit in hostel room H-205 is not cooling properly.',
    category: 'Housekeeping',
    priority: 'high',
    status: 'resolved',
    location: 'Hostel Block H - Room 205',
    createdBy: '1',
    assignedTo: '2',
    createdAt: '2024-01-13T16:45:00Z',
    updatedAt: '2024-01-14T11:20:00Z',
  },
];

const mockMessages: TicketMessage[] = [
  {
    id: '1',
    ticketId: '2',
    userId: '2',
    message: 'We have received your request and will look into it shortly.',
    isInternal: false,
    createdAt: '2024-01-14T15:00:00Z',
  },
  {
    id: '2',
    ticketId: '2',
    userId: '2',
    message: 'Maintenance team dispatched to room 301.',
    isInternal: true,
    createdAt: '2024-01-15T09:15:00Z',
  },
];

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTickets(mockTickets);
      setMessages(mockMessages);
      setIsLoading(false);
    }, 1000);
  }, []);

  const createTicket = (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTickets(prev => [newTicket, ...prev]);
    return newTicket;
  };

  const updateTicketStatus = (ticketId: string, status: Ticket['status']) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === ticketId
          ? { ...ticket, status, updatedAt: new Date().toISOString() }
          : ticket
      )
    );
  };

  const assignTicket = (ticketId: string, assignedTo: string) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === ticketId
          ? { ...ticket, assignedTo, updatedAt: new Date().toISOString() }
          : ticket
      )
    );
  };

  const addMessage = (message: Omit<TicketMessage, 'id' | 'createdAt'>) => {
    const newMessage: TicketMessage = {
      ...message,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return {
    tickets,
    messages,
    isLoading,
    createTicket,
    updateTicketStatus,
    assignTicket,
    addMessage,
  };
}