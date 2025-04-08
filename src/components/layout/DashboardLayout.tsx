
import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Ship, 
  LogOut, 
  User, 
  ShoppingCart, 
  BookOpen, 
  Ticket, 
  Scissors, 
  Dumbbell, 
  PartyPopper,
  LayoutDashboard,
  ShoppingBag,
  PlusCircle,
  List,
  Users,
  ChefHat,
  ClipboardList,
  Menu,
  X
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const getUserGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getNavItems = () => {
    switch (user?.role) {
      case "voyager":
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
          { icon: ShoppingCart, label: "Catering", path: "/catering" },
          { icon: ShoppingBag, label: "Stationery", path: "/stationery" },
          { icon: Ticket, label: "Resort & Movies", path: "/resort-movies" },
          { icon: Scissors, label: "Beauty Salon", path: "/beauty-salon" },
          { icon: Dumbbell, label: "Fitness Center", path: "/fitness-center" },
          { icon: PartyPopper, label: "Party Hall", path: "/party-hall" },
        ];
      case "admin":
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
          { icon: PlusCircle, label: "Add Item", path: "/add-item" },
          { icon: List, label: "Manage Items", path: "/manage-items" },
          { icon: Users, label: "Voyager Registration", path: "/register-voyager" },
        ];
      case "manager":
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
          { icon: Ticket, label: "Resort & Movies", path: "/resort-movies-bookings" },
          { icon: Scissors, label: "Beauty Salon", path: "/beauty-salon-bookings" },
          { icon: Dumbbell, label: "Fitness Center", path: "/fitness-center-bookings" },
          { icon: PartyPopper, label: "Party Hall", path: "/party-hall-bookings" },
        ];
      case "headcook":
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
          { icon: ChefHat, label: "Catering Orders", path: "/catering-orders" },
        ];
      case "supervisor":
        return [
          { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
          { icon: ClipboardList, label: "Stationery Orders", path: "/stationery-orders" },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();
  const currentPath = location.pathname;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-ocean text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="flex items-center">
          <Ship className="h-6 w-6 mr-2" />
          <span className="font-bold">Cruise Services</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-full hover:bg-ocean-dark/30 transition-colors"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-16 z-40 bg-ocean/95 text-white transform transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full overflow-y-auto py-4">
          <div className="px-4 py-2 mb-6">
            <div className="flex items-center space-x-3 mb-6 p-3 bg-white/10 rounded-lg">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarFallback className="bg-ocean-dark text-white">{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user?.name}</p>
                <p className="text-xs opacity-80 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
          
          <nav className="space-y-1 px-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-md transition-colors",
                  currentPath === item.path
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto px-4 py-2">
            <Separator className="bg-white/20 my-4" />
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-3 rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-ocean text-white p-4 shrink-0 min-h-screen sticky top-0">
        <div className="flex items-center space-x-2 py-4 px-2">
          <Ship className="h-8 w-8" />
          <span className="font-bold text-xl">Cruise Services</span>
        </div>
        
        <div className="flex items-center space-x-3 mb-8 p-3 bg-white/10 rounded-lg">
          <Avatar className="h-10 w-10 border-2 border-white">
            <AvatarFallback className="bg-ocean-dark text-white">{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-xs opacity-80 capitalize">{user?.role}</p>
          </div>
        </div>
        
        <nav className="space-y-1 flex-1 py-2">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 p-3 rounded-md transition-colors",
                currentPath === item.path
                  ? "bg-white/20 text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <Separator className="bg-white/20 my-6" />
        
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="flex items-center space-x-2 justify-start text-white/80 hover:bg-white/10 hover:text-white p-3 h-auto"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 min-h-screen">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
