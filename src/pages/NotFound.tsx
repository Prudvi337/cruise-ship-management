
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Ship, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-ocean/5 to-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <Ship className="h-20 w-20 text-ocean animate-bounce" />
            <div className="absolute -bottom-2 w-20 h-2 bg-ocean/20 rounded-full animate-pulse" />
          </div>
        </div>
        
        <h1 className="text-7xl font-bold text-ocean">404</h1>
        <p className="text-2xl font-semibold">Lost at Sea</p>
        <p className="text-muted-foreground">
          The page you're looking for seems to have sailed away. Let's navigate back to familiar waters.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild variant="outline" className="gap-2">
            <Link to={-1 as any}>
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Link>
          </Button>
          <Button asChild className="gap-2 bg-ocean hover:bg-ocean-dark">
            <Link to="/">
              <Home className="h-4 w-4" />
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
