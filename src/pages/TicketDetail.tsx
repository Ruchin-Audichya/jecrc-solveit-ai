import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTickets } from '@/hooks/useTickets';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Clock, User, MapPin, AlertCircle, MessageSquare, Send } from 'lucide-react';
import { Ticket, TicketMessage } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function TicketDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tickets, messages, updateTicketStatus, assignTicket, addMessage } = useTickets();
  const { toast } = useToast();
  
  const [newMessage, setNewMessage] = useState('');
  const [isInternal, setIsInternal] = useState(false);

  const ticket = tickets.find(t => t.id === id);
  const ticketMessages = messages.filter(m => m.ticketId === id);

  if (!ticket) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Ticket not found</h2>
          <Button onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const canEdit = user?.role === 'admin' || 
    (user?.role === 'resolver' && ticket.assignedTo === user.id) ||
    (user?.role === 'student' && ticket.createdBy === user.id);

  const handleStatusChange = (newStatus: Ticket['status']) => {
    updateTicketStatus(ticket.id, newStatus);
    toast({
      title: 'Status Updated',
      description: `Ticket status changed to ${newStatus.replace('-', ' ')}.`,
    });
  };

  const handleAssignToSelf = () => {
    if (user && user.role === 'resolver') {
      assignTicket(ticket.id, user.id);
      toast({
        title: 'Ticket Assigned',
        description: 'This ticket has been assigned to you.',
      });
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;

    addMessage({
      ticketId: ticket.id,
      userId: user.id,
      message: newMessage,
      isInternal: isInternal && user.role !== 'student',
    });

    setNewMessage('');
    toast({
      title: 'Message Sent',
      description: 'Your message has been added to the ticket.',
    });
  };

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'open': return 'destructive';
      case 'in-progress': return 'default';
      case 'resolved': return 'secondary';
      case 'closed': return 'outline';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ticket Header */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">{ticket.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Ticket #{ticket.id}</span>
                      <span>•</span>
                      <span>Created {new Date(ticket.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getStatusColor(ticket.status)}>
                      {ticket.status.replace('-', ' ')}
                    </Badge>
                    <Badge variant={getPriorityColor(ticket.priority)}>
                      {ticket.priority} priority
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground whitespace-pre-wrap">{ticket.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{ticket.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{ticket.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Updated {new Date(ticket.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Messages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ticketMessages.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      No messages yet. Start the conversation!
                    </p>
                  ) : (
                    ticketMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-4 rounded-lg ${
                          message.isInternal 
                            ? 'bg-warning/10 border border-warning/20' 
                            : 'bg-accent'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span className="font-medium">User #{message.userId}</span>
                            {message.isInternal && (
                              <Badge variant="outline" className="text-xs">
                                Internal
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Message */}
                {canEdit && (
                  <div className="mt-6 pt-6 border-t">
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <div className="flex justify-between items-center">
                        {user?.role !== 'student' && (
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="internal"
                              checked={isInternal}
                              onChange={(e) => setIsInternal(e.target.checked)}
                            />
                            <label htmlFor="internal" className="text-sm">
                              Internal message (not visible to student)
                            </label>
                          </div>
                        )}
                        <Button 
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                          className="gap-2"
                        >
                          <Send className="h-4 w-4" />
                          Send Message
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            {(user?.role === 'admin' || user?.role === 'resolver') && (
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user.role === 'resolver' && !ticket.assignedTo && (
                    <Button 
                      onClick={handleAssignToSelf}
                      className="w-full"
                      variant="outline"
                    >
                      Assign to Me
                    </Button>
                  )}
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Update Status</label>
                    <Select 
                      value={ticket.status} 
                      onValueChange={handleStatusChange}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Ticket Info */}
            <Card>
              <CardHeader>
                <CardTitle>Ticket Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Created by</label>
                  <p className="text-sm">User #{ticket.createdBy}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Assigned to</label>
                  <p className="text-sm">
                    {ticket.assignedTo ? `User #${ticket.assignedTo}` : 'Unassigned'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Category</label>
                  <p className="text-sm">{ticket.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Priority</label>
                  <p className="text-sm capitalize">{ticket.priority}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Created</label>
                  <p className="text-sm">{new Date(ticket.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last updated</label>
                  <p className="text-sm">{new Date(ticket.updatedAt).toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}