import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import NotificationBell from "@/components/NotificationBell";
import { User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, profile, signOut } = useAuth();

  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <Link to="/dashboard" className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              {/* JECRC Logo Placeholder */}
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <img 
                  src="/lovable-uploads/31cef77f-7eb8-4fc9-8fd6-2176c5ba9c0b.png" 
                  alt="JECRC University" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-poppins font-bold text-foreground">
                  JECRC <span className="jecrc-text-gradient">SolveIt</span>
                </h1>
                <p className="text-xs font-lato text-muted-foreground">University Grievance System</p>
              </div>
            </div>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="font-lato text-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            {user?.role === 'admin' && (
              <>
                <Link to="/admin" className="font-lato text-foreground hover:text-primary transition-colors">
                  Admin Portal
                </Link>
                <Link to="/logs" className="font-lato text-foreground hover:text-primary transition-colors">
                  System Logs
                </Link>
              </>
            )}
            {(user?.role === 'student' || user?.role === 'admin') && (
              <Link to="/create-ticket" className="font-lato text-foreground hover:text-primary transition-colors">
                Create Ticket
              </Link>
            )}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <NotificationBell />
            
            {/* User Profile & Info */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium">{profile?.name || user?.email}</p>
                <p className="text-xs text-muted-foreground capitalize">{profile?.role || 'student'}</p>
              </div>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                  onClick={signOut}
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile User Actions */}
            <div className="md:hidden flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={signOut}
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;