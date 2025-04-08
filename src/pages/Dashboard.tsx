
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout, { getUserGreeting } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Ship,
  ShoppingCart,
  BookOpen,
  Ticket,
  Scissors,
  Dumbbell,
  PartyPopper,
  Users,
  ShoppingBag,
  ChefHat,
  ClipboardList,
  LayoutGrid,
  PlusCircle,
  List
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Dashboard content based on user role
  const renderDashboardContent = () => {
    switch (user?.role) {
      case "voyager":
        return <VoyagerDashboard />;
      case "admin":
        return <AdminDashboard />;
      case "manager":
        return <ManagerDashboard />;
      case "headcook":
        return <HeadCookDashboard />;
      case "supervisor":
        return <SupervisorDashboard />;
      default:
        return <div>Unknown user role</div>;
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{getUserGreeting()}, {user?.name}</h1>
        <p className="text-muted-foreground">Welcome to your cruise services dashboard</p>
      </div>
      {renderDashboardContent()}
    </DashboardLayout>
  );
};

// Voyager Dashboard
const VoyagerDashboard = () => {
  const navigate = useNavigate();
  
  const services = [
    { 
      icon: ShoppingCart, 
      title: "Catering", 
      description: "Order food, snacks and beverages", 
      path: "/catering", 
      color: "bg-coral-light" 
    },
    { 
      icon: ShoppingBag, 
      title: "Stationery", 
      description: "Order gift items, books and more", 
      path: "/stationery", 
      color: "bg-ocean-light" 
    },
    { 
      icon: Ticket, 
      title: "Resort & Movies", 
      description: "Book movie tickets and resort experiences", 
      path: "/resort-movies", 
      color: "bg-sand-light" 
    },
    { 
      icon: Scissors, 
      title: "Beauty Salon", 
      description: "Book appointments for beauty treatments", 
      path: "/beauty-salon", 
      color: "bg-coral-light" 
    },
    { 
      icon: Dumbbell, 
      title: "Fitness Center", 
      description: "Book gym sessions and equipment", 
      path: "/fitness-center", 
      color: "bg-ocean-light" 
    },
    { 
      icon: PartyPopper, 
      title: "Party Hall", 
      description: "Book party venues for celebrations", 
      path: "/party-hall", 
      color: "bg-sand-light" 
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card key={index} className="overflow-hidden card-hover">
            <CardHeader className={`${service.color} p-4`}>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <service.icon className="h-6 w-6 text-ocean-dark" />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <Button 
                className="w-full bg-ocean hover:bg-ocean-dark"
                onClick={() => navigate(service.path)}
              >
                Access Service
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Admin Dashboard
const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const adminActions = [
    { 
      icon: PlusCircle, 
      title: "Add Item", 
      description: "Add new items to the system", 
      path: "/add-item", 
      color: "bg-coral-light" 
    },
    { 
      icon: List, 
      title: "Manage Items", 
      description: "Edit or delete existing items", 
      path: "/manage-items", 
      color: "bg-ocean-light" 
    },
    { 
      icon: Users, 
      title: "Voyager Registration", 
      description: "Register new voyagers to the system", 
      path: "/register-voyager", 
      color: "bg-sand-light" 
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adminActions.map((action, index) => (
          <Card key={index} className="overflow-hidden card-hover">
            <CardHeader className={`${action.color} p-4`}>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{action.title}</CardTitle>
                <action.icon className="h-6 w-6 text-ocean-dark" />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-6">{action.description}</p>
              <Button 
                className="w-full bg-ocean hover:bg-ocean-dark"
                onClick={() => navigate(action.path)}
              >
                Go to {action.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Manager Dashboard
const ManagerDashboard = () => {
  const navigate = useNavigate();
  
  const bookings = [
    { 
      icon: Ticket, 
      title: "Resort & Movies", 
      count: 24, 
      path: "/resort-movies-bookings", 
      color: "bg-coral-light" 
    },
    { 
      icon: Scissors, 
      title: "Beauty Salon", 
      count: 18, 
      path: "/beauty-salon-bookings", 
      color: "bg-ocean-light" 
    },
    { 
      icon: Dumbbell, 
      title: "Fitness Center", 
      count: 35, 
      path: "/fitness-center-bookings", 
      color: "bg-sand-light" 
    },
    { 
      icon: PartyPopper, 
      title: "Party Hall", 
      count: 12, 
      path: "/party-hall-bookings", 
      color: "bg-coral-light" 
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {bookings.map((booking, index) => (
          <Card key={index} className="overflow-hidden card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <booking.icon className={`h-10 w-10 p-2 rounded-full ${booking.color}`} />
                <div className="text-2xl font-bold">{booking.count}</div>
              </div>
              <h3 className="font-medium">{booking.title} Bookings</h3>
              <Button 
                variant="link" 
                className="p-0 h-auto text-ocean mt-2"
                onClick={() => navigate(booking.path)}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Head Cook Dashboard
const HeadCookDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <Card className="overflow-hidden card-hover">
        <CardHeader className="bg-ocean-light p-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Catering Orders</CardTitle>
            <ChefHat className="h-6 w-6 text-ocean-dark" />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-muted-foreground mb-6">
            View and manage all catering orders placed by voyagers
          </p>
          <Button 
            className="w-full bg-ocean hover:bg-ocean-dark"
            onClick={() => navigate("/catering-orders")}
          >
            View Catering Orders
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

// Supervisor Dashboard
const SupervisorDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <Card className="overflow-hidden card-hover">
        <CardHeader className="bg-ocean-light p-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Stationery Orders</CardTitle>
            <ClipboardList className="h-6 w-6 text-ocean-dark" />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-muted-foreground mb-6">
            View and manage all stationery orders placed by voyagers
          </p>
          <Button 
            className="w-full bg-ocean hover:bg-ocean-dark"
            onClick={() => navigate("/stationery-orders")}
          >
            View Stationery Orders
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
