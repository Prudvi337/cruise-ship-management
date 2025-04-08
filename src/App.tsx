
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Catering from "./pages/Catering";
import Stationery from "./pages/Stationery";
import ResortMovies from "./pages/ResortMovies";
import BeautySalon from "./pages/BeautySalon";
import FitnessCenter from "./pages/FitnessCenter";
import PartyHall from "./pages/PartyHall";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/catering" element={<ProtectedRoute><Catering /></ProtectedRoute>} />
      <Route path="/stationery" element={<ProtectedRoute><Stationery /></ProtectedRoute>} />
      <Route path="/resort-movies" element={<ProtectedRoute><ResortMovies /></ProtectedRoute>} />
      <Route path="/beauty-salon" element={<ProtectedRoute><BeautySalon /></ProtectedRoute>} />
      <Route path="/fitness-center" element={<ProtectedRoute><FitnessCenter /></ProtectedRoute>} />
      <Route path="/party-hall" element={<ProtectedRoute><PartyHall /></ProtectedRoute>} />
      
      {/* Admin routes */}
      {/* <Route path="/add-item" element={<ProtectedRoute><AddItem /></ProtectedRoute>} /> */}
      {/* <Route path="/manage-items" element={<ProtectedRoute><ManageItems /></ProtectedRoute>} /> */}
      {/* <Route path="/register-voyager" element={<ProtectedRoute><RegisterVoyager /></ProtectedRoute>} /> */}
      
      {/* Manager routes */}
      {/* <Route path="/resort-movies-bookings" element={<ProtectedRoute><ResortMoviesBookings /></ProtectedRoute>} /> */}
      {/* <Route path="/beauty-salon-bookings" element={<ProtectedRoute><BeautySalonBookings /></ProtectedRoute>} /> */}
      {/* <Route path="/fitness-center-bookings" element={<ProtectedRoute><FitnessCenterBookings /></ProtectedRoute>} /> */}
      {/* <Route path="/party-hall-bookings" element={<ProtectedRoute><PartyHallBookings /></ProtectedRoute>} /> */}
      
      {/* Head Cook routes */}
      {/* <Route path="/catering-orders" element={<ProtectedRoute><CateringOrders /></ProtectedRoute>} /> */}
      
      {/* Supervisor routes */}
      {/* <Route path="/stationery-orders" element={<ProtectedRoute><StationeryOrders /></ProtectedRoute>} /> */}
      
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
