import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export default function Demo() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const demoAccounts = [
    {
      role: 'Student',
      email: 'student@jecrcu.edu.in',
      description: 'Create and track tickets, view assigned tickets',
      color: 'bg-blue-500',
      features: ['Submit tickets', 'Track status', 'View responses']
    },
    {
      role: 'Resolver',
      email: 'resolver@jecrcu.edu.in', 
      description: 'Resolve tickets, manage assigned cases',
      color: 'bg-green-500',
      features: ['View assigned tickets', 'Update status', 'Add responses']
    },
    {
      role: 'Admin',
      email: 'admin@jecrcu.edu.in',
      description: 'Full system access, user management, analytics',
      color: 'bg-purple-500',
      features: ['User management', 'System analytics', 'All permissions']
    }
  ];

  const handleDemoLogin = async (email: string, role: string) => {
    setIsLoading(email);
    
    try {
      const { error } = await signIn(email, 'password123');
      if (error) throw error;
      
      toast({
        title: `Welcome to ${role} Portal`,
        description: 'Demo login successful!',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Demo Login Failed',
        description: 'Please try again or contact support.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-20 h-20 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">J</span>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            JECRC SolveIt Demo Portal
          </h1>
          <p className="text-muted-foreground mb-4">
            Test different user roles and features
          </p>
          <Badge variant="secondary" className="mb-6">
            All accounts use password: password123
          </Badge>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {demoAccounts.map((account) => (
            <Card key={account.email} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className={`mx-auto mb-3 w-12 h-12 ${account.color} rounded-full flex items-center justify-center`}>
                  <span className="text-white font-bold">
                    {account.role.charAt(0)}
                  </span>
                </div>
                <CardTitle className="text-xl">{account.role} Portal</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {account.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <p className="text-sm font-medium">Features:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {account.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1 h-1 bg-current rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  onClick={() => handleDemoLogin(account.email, account.role)}
                  disabled={isLoading === account.email}
                  className="w-full"
                >
                  {isLoading === account.email ? 'Logging in...' : `Test ${account.role} Portal`}
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  {account.email}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => navigate('/auth')}
            className="mr-4"
          >
            Real Sign Up
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/auth?mode=signin')}
          >
            Real Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}