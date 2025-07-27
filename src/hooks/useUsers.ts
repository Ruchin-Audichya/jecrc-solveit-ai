import { useState, useEffect } from 'react';
import { User, Ticket } from '@/types';

// Enhanced mock data with more users
const mockUsers: User[] = [
  {
    id: '1',
    email: 'student@jecrcu.edu.in',
    name: 'Rahul Sharma',
    role: 'student',
    createdAt: '2024-01-10T10:00:00Z',
  },
  {
    id: '2',
    email: 'resolver@jecrcu.edu.in',
    name: 'IT Support Team',
    role: 'resolver',
    department: 'IT',
    createdAt: '2024-01-05T14:30:00Z',
  },
  {
    id: '3',
    email: 'admin@jecrcu.edu.in',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01T09:00:00Z',
  },
  {
    id: '4',
    email: 'priya.student@jecrcu.edu.in',
    name: 'Priya Patel',
    role: 'student',
    createdAt: '2024-01-12T11:20:00Z',
  },
  {
    id: '5',
    email: 'maintenance@jecrcu.edu.in',
    name: 'Maintenance Team',
    role: 'resolver',
    department: 'Housekeeping',
    createdAt: '2024-01-03T16:45:00Z',
  },
  {
    id: '6',
    email: 'infrastructure@jecrcu.edu.in',
    name: 'Infrastructure Team',
    role: 'resolver',
    department: 'Infrastructure',
    createdAt: '2024-01-02T12:30:00Z',
  },
];

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(mockUsers);
      setIsLoading(false);
    }, 1000);
  }, []);

  const createUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setUsers(prev => [newUser, ...prev]);
    return newUser;
  };

  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? { ...user, ...updates }
          : user
      )
    );
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const getUserById = (id: string) => {
    return users.find(user => user.id === id);
  };

  const getUsersByRole = (role: User['role']) => {
    return users.filter(user => user.role === role);
  };

  const getUsersByDepartment = (department: string) => {
    return users.filter(user => user.department === department);
  };

  return {
    users,
    isLoading,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    getUsersByRole,
    getUsersByDepartment,
  };
}