
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Ship, Anchor, Utensils, Film, Heart, User } from "lucide-react";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-ocean text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Ship className="h-8 w-8" />
            <span className="font-bold text-xl">Ocean Star Cruises</span>
          </div>
          <div>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-ocean-dark"
              onClick={() => navigate(isAuthenticated ? "/dashboard" : "/login")}
            >
              {isAuthenticated ? "Go to Dashboard" : "Sign In"}
            </Button>
          </div>
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl">
            Cruise Ship Services at Your Fingertips
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl opacity-90">
            Access all ship amenities and services through our convenient online platform
          </p>
          <Button 
            size="lg" 
            className="bg-white text-ocean hover:bg-gray-100 px-8 py-6 text-lg"
            onClick={() => navigate(isAuthenticated ? "/dashboard" : "/login")}
          >
            {isAuthenticated ? "Access Services" : "Sign In to Get Started"}
          </Button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text">
            Everything You Need in One Place
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-ocean-light/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Utensils className="text-ocean h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Dining & Catering</h3>
              <p className="text-muted-foreground">
                Order meals, snacks, and beverages directly to your room with our convenient catering service
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-ocean-light/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Film className="text-ocean h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Entertainment</h3>
              <p className="text-muted-foreground">
                Book resort experiences, movie tickets, and party venues for the perfect cruise entertainment
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-ocean-light/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-ocean h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Health & Wellness</h3>
              <p className="text-muted-foreground">
                Schedule beauty salon appointments and fitness center sessions to feel your best at sea
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-sand-light">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Enhance Your Cruise Experience?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Sign in with your voyager credentials to access all services available on your cruise
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-ocean hover:bg-ocean-dark"
              onClick={() => navigate("/login")}
            >
              <User className="mr-2 h-5 w-5" />
              Sign In
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-ocean text-ocean hover:bg-ocean/10"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Anchor className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ocean-dark text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Ship className="h-6 w-6" />
              <span className="font-bold">Ocean Star Cruises</span>
            </div>
            
            <div className="text-sm opacity-70">
              &copy; {new Date().getFullYear()} Ocean Star Cruises. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
