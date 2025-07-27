import { useAuth } from '@/contexts/AuthContext';
import { useUsers } from '@/hooks/useUsers';
import { useTickets } from '@/hooks/useTickets';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';
import { User, UserRole, TicketCategory } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  Ticket, 
  BarChart3, 
  Plus, 
  Edit, 
  Trash2, 
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { Navigate } from 'react-router-dom';

export default function AdminPortal() {
  const { user, profile } = useAuth();
  const { users, createUser, updateUser, deleteUser, getUsersByRole, isLoading } = useUsers();
  const { tickets } = useTickets();
  const { toast } = useToast();
  
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  
  // Form states
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    role: '' as UserRole | '',
    department: '',
  });

  // Redirect if not admin
  if (profile?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Analytics calculations
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === 'open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in-progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;
  const closedTickets = tickets.filter(t => t.status === 'closed').length;

  const studentCount = getUsersByRole('student').length;
  const resolverCount = getUsersByRole('resolver').length;
  const adminCount = getUsersByRole('admin').length;

  // Ticket distribution by category
  const ticketsByCategory = tickets.reduce((acc, ticket) => {
    acc[ticket.category] = (acc[ticket.category] || 0) + 1;
    return acc;
  }, {} as Record<TicketCategory, number>);

  const handleCreateUser = () => {
    if (!newUserForm.name || !newUserForm.email || !newUserForm.role) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    try {
      createUser({
        user_id: '', // This will need to be handled by the actual auth system
        name: newUserForm.name,
        role: newUserForm.role as UserRole,
        department: newUserForm.department || undefined,
      });

      toast({
        title: 'User Created',
        description: `${newUserForm.name} has been successfully created.`,
      });

      setNewUserForm({ name: '', email: '', role: '', department: '' });
      setIsCreateUserOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create user. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateUser = () => {
    if (!selectedUser) return;

    updateUser(selectedUser.id, selectedUser);
    toast({
      title: 'User Updated',
      description: `${selectedUser.name} has been successfully updated.`,
    });
    setIsEditUserOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    deleteUser(userId);
    toast({
      title: 'User Deleted',
      description: `${userName} has been removed from the system.`,
    });
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'resolver': return 'default';
      case 'student': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              Admin Portal
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage users, tickets, and system analytics
            </p>
          </div>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="tickets">Ticket Management</TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{users.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {studentCount} students, {resolverCount} resolvers, {adminCount} admins
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
                  <Ticket className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalTickets}</div>
                  <p className="text-xs text-muted-foreground">
                    {openTickets} open, {resolvedTickets} resolved
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {totalTickets > 0 ? Math.round(((resolvedTickets + closedTickets) / totalTickets) * 100) : 0}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {resolvedTickets + closedTickets} resolved/closed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.4h</div>
                  <p className="text-xs text-muted-foreground">
                    Average first response time
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Ticket Status Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ticket Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-destructive" />
                        <span>Open</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-destructive"
                            style={{ width: `${totalTickets > 0 ? (openTickets / totalTickets) * 100 : 0}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{openTickets}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-warning" />
                        <span>In Progress</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-warning"
                            style={{ width: `${totalTickets > 0 ? (inProgressTickets / totalTickets) * 100 : 0}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{inProgressTickets}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span>Resolved</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-success"
                            style={{ width: `${totalTickets > 0 ? (resolvedTickets / totalTickets) * 100 : 0}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{resolvedTickets}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tickets by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(ticketsByCategory).map(([category, count]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm">{category}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary"
                              style={{ width: `${totalTickets > 0 ? (count / totalTickets) * 100 : 0}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">User Management</h2>
              <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New User</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={newUserForm.name}
                        onChange={(e) => setNewUserForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUserForm.email}
                        onChange={(e) => setNewUserForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="user@jecrcu.edu.in"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Role *</Label>
                      <Select 
                        value={newUserForm.role} 
                        onValueChange={(value) => setNewUserForm(prev => ({ ...prev, role: value as UserRole }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="resolver">Resolver</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {newUserForm.role === 'resolver' && (
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select 
                          value={newUserForm.department} 
                          onValueChange={(value) => setNewUserForm(prev => ({ ...prev, department: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="IT">IT Support</SelectItem>
                            <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                            <SelectItem value="Academic">Academic</SelectItem>
                            <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                            <SelectItem value="Transport">Transport</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <div className="flex gap-2 pt-4">
                      <Button variant="outline" onClick={() => setIsCreateUserOpen(false)} className="flex-1">
                        Cancel
                      </Button>
                      <Button onClick={handleCreateUser} className="flex-1">
                        Create User
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Users Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((userData) => (
                      <TableRow key={userData.id}>
                        <TableCell className="font-medium">{userData.name}</TableCell>
                        <TableCell>{userData.user_id}</TableCell>
                        <TableCell>
                          <Badge variant={getRoleColor(userData.role)}>
                            {userData.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{userData.department || '-'}</TableCell>
                        <TableCell>{new Date(userData.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedUser(userData);
                                setIsEditUserOpen(true);
                              }}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            {userData.id !== user.id && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteUser(userData.id, userData.name)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ticket Management Tab */}
          <TabsContent value="tickets" className="space-y-6">
            <h2 className="text-2xl font-bold">All Tickets</h2>
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <Card key={ticket.id} className="hover:bg-accent transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">
                          {ticket.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {ticket.description.length > 150
                            ? `${ticket.description.substring(0, 150)}...`
                            : ticket.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Ticket #{ticket.id}</span>
                          <span>Created by User #{ticket.createdBy}</span>
                          <span>{ticket.location}</span>
                          <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Badge variant={ticket.status === 'open' ? 'destructive' : ticket.status === 'resolved' ? 'secondary' : 'default'}>
                          {ticket.status.replace('-', ' ')}
                        </Badge>
                        <Badge variant={ticket.priority === 'high' ? 'destructive' : 'default'}>
                          {ticket.priority} priority
                        </Badge>
                        <Badge variant="outline">
                          {ticket.category}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Edit User Dialog */}
        <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedUser.name}
                    onChange={(e) => setSelectedUser(prev => prev ? { ...prev, name: e.target.value } : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={selectedUser.user_id}
                    onChange={(e) => setSelectedUser(prev => prev ? { ...prev, user_id: e.target.value } : null)}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select 
                    value={selectedUser.role} 
                    onValueChange={(value) => setSelectedUser(prev => prev ? { ...prev, role: value as UserRole } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="resolver">Resolver</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {selectedUser.role === 'resolver' && (
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Select 
                      value={selectedUser.department || ''} 
                      onValueChange={(value) => setSelectedUser(prev => prev ? { ...prev, department: value } : null)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IT">IT Support</SelectItem>
                        <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                        <SelectItem value="Academic">Academic</SelectItem>
                        <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                        <SelectItem value="Transport">Transport</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsEditUserOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateUser} className="flex-1">
                    Update User
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}