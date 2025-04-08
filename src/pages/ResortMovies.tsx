
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Ticket, Utensils, Film, Clock, Calendar as CalendarIcon, Users } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

// Mock movies
const movies = [
  {
    id: 1,
    title: "Ocean's Adventure",
    description: "An exciting adventure on the high seas with breathtaking visuals and thrilling action sequences.",
    duration: "2h 15m",
    rating: "PG-13",
    genre: "Adventure",
    image: "https://placehold.co/500x300/ocean/white?text=Ocean's+Adventure",
    showtimes: ["10:00 AM", "2:30 PM", "7:00 PM"]
  },
  {
    id: 2,
    title: "Voyage of Dreams",
    description: "A heartwarming story about finding yourself during an unexpected journey across the sea.",
    duration: "1h 55m",
    rating: "PG",
    genre: "Drama",
    image: "https://placehold.co/500x300/coral/white?text=Voyage+of+Dreams",
    showtimes: ["11:30 AM", "3:00 PM", "8:30 PM"]
  },
  {
    id: 3,
    title: "Deep Blue Mystery",
    description: "A mystery thriller set aboard a luxury cruise ship where nothing is as it seems.",
    duration: "2h 10m",
    rating: "PG-13",
    genre: "Mystery",
    image: "https://placehold.co/500x300/sand/white?text=Deep+Blue+Mystery",
    showtimes: ["1:00 PM", "5:30 PM", "9:00 PM"]
  }
];

// Mock resort experiences
const resortExperiences = [
  {
    id: 1,
    name: "Ocean View Restaurant",
    description: "Fine dining with panoramic views of the ocean. Enjoy gourmet seafood and international cuisine.",
    price: 89.99,
    duration: "3 hours",
    capacity: "40 people",
    image: "https://placehold.co/500x300/ocean/white?text=Ocean+View+Restaurant"
  },
  {
    id: 2,
    name: "Balcony Lounge Experience",
    description: "Relax in our premium lounge area with a private balcony. Includes complimentary drinks and appetizers.",
    price: 59.99,
    duration: "2 hours",
    capacity: "25 people",
    image: "https://placehold.co/500x300/coral/white?text=Balcony+Lounge"
  },
  {
    id: 3,
    name: "Luxury Dinner Cruise",
    description: "A special dinner cruise around the ship with live music and a 5-course meal prepared by our master chefs.",
    price: 129.99,
    duration: "4 hours",
    capacity: "30 people",
    image: "https://placehold.co/500x300/sand/white?text=Dinner+Cruise"
  }
];

const ResortMovies = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("movies");
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
  const [selectedResort, setSelectedResort] = useState<number | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string | undefined>();
  const [guests, setGuests] = useState("1");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"movie" | "resort">("movie");

  const handleBookMovie = (movieId: number) => {
    setSelectedMovie(movieId);
    setDialogType("movie");
    setOpenDialog(true);
  };

  const handleBookResort = (resortId: number) => {
    setSelectedResort(resortId);
    setDialogType("resort");
    setOpenDialog(true);
  };

  const handleConfirmBooking = () => {
    if (dialogType === "movie") {
      const movie = movies.find(m => m.id === selectedMovie);
      toast({
        title: "Movie Tickets Booked!",
        description: `You have successfully booked tickets for ${movie?.title} on ${date ? format(date, "PPP") : ""}${time ? ` at ${time}` : ""} for ${guests} guest(s).`
      });
    } else {
      const resort = resortExperiences.find(r => r.id === selectedResort);
      toast({
        title: "Resort Experience Booked!",
        description: `You have successfully booked ${resort?.name} on ${date ? format(date, "PPP") : ""} for ${guests} guest(s).`
      });
    }
    setOpenDialog(false);
    setTime(undefined);
    setGuests("1");
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Resort & Movies</h1>
        <p className="text-muted-foreground">Book movie tickets and resort experiences</p>
      </div>

      <Tabs defaultValue="movies" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="movies" className="flex items-center gap-2">
            <Film className="h-4 w-4" />
            <span>Movies</span>
          </TabsTrigger>
          <TabsTrigger value="resort" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            <span>Resort Experiences</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="movies" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <Card key={movie.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{movie.title}</CardTitle>
                    <Badge variant="outline" className="bg-ocean/10 text-ocean">{movie.rating}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{movie.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-ocean" />
                      <span>{movie.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Film className="h-4 w-4 text-ocean" />
                      <span>{movie.genre}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Today's Showtimes:</p>
                    <div className="flex flex-wrap gap-2">
                      {movie.showtimes.map((showtime, idx) => (
                        <Badge key={idx} variant="outline" className="bg-ocean/10 hover:bg-ocean/20 cursor-pointer">
                          {showtime}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-ocean hover:bg-ocean-dark flex items-center gap-2"
                    onClick={() => handleBookMovie(movie.id)}
                  >
                    <Ticket className="h-4 w-4" />
                    Book Tickets
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resort" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resortExperiences.map((resort) => (
              <Card key={resort.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <img src={resort.image} alt={resort.name} className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>{resort.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{resort.description}</p>
                  
                  <p className="text-lg font-semibold text-ocean">${resort.price.toFixed(2)} per person</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-ocean" />
                      <span>{resort.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-ocean" />
                      <span>Up to {resort.capacity}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-ocean hover:bg-ocean-dark flex items-center gap-2"
                    onClick={() => handleBookResort(resort.id)}
                  >
                    <Utensils className="h-4 w-4" />
                    Book Experience
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {dialogType === "movie" 
                ? `Book tickets for ${movies.find(m => m.id === selectedMovie)?.title}` 
                : `Book ${resortExperiences.find(r => r.id === selectedResort)?.name}`}
            </DialogTitle>
            <DialogDescription>
              Fill in the details to complete your booking.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {dialogType === "movie" && (
              <div className="grid gap-2">
                <Label htmlFor="time">Select Time</Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {movies.find(m => m.id === selectedMovie)?.showtimes.map((showtime, idx) => (
                      <SelectItem key={idx} value={showtime}>
                        {showtime}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="guests">Number of Guests</Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger>
                  <SelectValue placeholder="Select number of guests" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "guest" : "guests"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              onClick={handleConfirmBooking}
              className="bg-ocean hover:bg-ocean-dark"
              disabled={dialogType === "movie" ? !date || !time || !guests : !date || !guests}
            >
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ResortMovies;
