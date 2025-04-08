
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { PartyPopper, Clock, Calendar as CalendarIcon, Users, Timer, Music, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Mock party halls
const partyHalls = [
  {
    id: 1,
    name: "Grand Ballroom",
    description: "Elegant ballroom with panoramic ocean views, perfect for large events and formal gatherings.",
    capacity: 200,
    pricePerHour: 550,
    features: ["Dance floor", "Stage", "Full bar", "Ocean view"],
    image: "https://placehold.co/500x300/ocean/white?text=Grand+Ballroom",
    partyTypes: ["Wedding", "Gala", "Corporate", "Birthday"]
  },
  {
    id: 2,
    name: "Sunset Terrace",
    description: "Beautiful outdoor terrace with sunset views, ideal for cocktail parties and receptions.",
    capacity: 80,
    pricePerHour: 350,
    features: ["Outdoor setting", "Bar area", "Lounge seating", "Sunset view"],
    image: "https://placehold.co/500x300/coral/white?text=Sunset+Terrace",
    partyTypes: ["Cocktail Party", "Engagement", "Birthday", "Anniversary"]
  },
  {
    id: 3,
    name: "Starlight Lounge",
    description: "Intimate lounge with starry ceiling and cozy atmosphere for smaller gatherings.",
    capacity: 50,
    pricePerHour: 250,
    features: ["Lounge seating", "Private bar", "Sound system", "Mood lighting"],
    image: "https://placehold.co/500x300/sand/white?text=Starlight+Lounge",
    partyTypes: ["Birthday", "Get-together", "Anniversary", "Private Dinner"]
  },
  {
    id: 4,
    name: "Ocean View Hall",
    description: "Spacious hall with floor-to-ceiling windows offering spectacular ocean views.",
    capacity: 120,
    pricePerHour: 450,
    features: ["Panoramic windows", "Dance floor", "Full service kitchen", "Ocean view"],
    image: "https://placehold.co/500x300/ocean/white?text=Ocean+View+Hall",
    partyTypes: ["Wedding", "Corporate", "Gala", "Birthday"]
  }
];

// Party types
const partyTypes = [
  "Wedding", "Birthday", "Anniversary", "Engagement", 
  "Corporate", "Gala", "Get-together", "Cocktail Party", 
  "Private Dinner", "Other"
];

// Available time slots
const timeSlots = [
  "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", 
  "6:00 PM", "8:00 PM", "10:00 PM"
];

// Duration options
const durationOptions = [
  { value: "2", label: "2 hours" },
  { value: "3", label: "3 hours" },
  { value: "4", label: "4 hours" },
  { value: "5", label: "5 hours" },
  { value: "6", label: "6 hours" }
];

// Catering options
const cateringOptions = [
  { id: "buffet", label: "Buffet Service" },
  { id: "plated", label: "Plated Service" },
  { id: "cocktail", label: "Cocktail Reception" },
  { id: "none", label: "No Catering Needed" }
];

// Entertainment options
const entertainmentOptions = [
  { id: "dj", label: "DJ" },
  { id: "liveband", label: "Live Band" },
  { id: "solo", label: "Solo Performer" },
  { id: "none", label: "No Entertainment Needed" }
];

const PartyHall = () => {
  const { toast } = useToast();
  const [selectedPartyType, setSelectedPartyType] = useState<string>("All");
  const [selectedHall, setSelectedHall] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  
  // Booking form state
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState<string | undefined>();
  const [duration, setDuration] = useState<string>("3");
  const [eventType, setEventType] = useState<string | undefined>();
  const [guestCount, setGuestCount] = useState<string>("50");
  const [catering, setCatering] = useState<string>("buffet");
  const [entertainment, setEntertainment] = useState<string>("dj");
  const [specialRequests, setSpecialRequests] = useState<string>("");

  const handleBookHall = (hallId: number) => {
    setSelectedHall(hallId);
    setOpenDialog(true);
  };

  const handleConfirmBooking = () => {
    const hall = partyHalls.find(h => h.id === selectedHall);
    const totalPrice = hall ? hall.pricePerHour * parseInt(duration) : 0;
    
    toast({
      title: "Party Hall Booked!",
      description: `You have successfully booked the ${hall?.name} for your ${eventType} on ${date ? format(date, "PPP") : ""} starting at ${startTime} for ${duration} hours.`
    });
    
    setOpenDialog(false);
    setStartTime(undefined);
    setDuration("3");
    setEventType(undefined);
    setGuestCount("50");
    setCatering("buffet");
    setEntertainment("dj");
    setSpecialRequests("");
  };

  const filteredHalls = selectedPartyType === "All" 
    ? partyHalls 
    : partyHalls.filter(hall => hall.partyTypes.includes(selectedPartyType));

  const uniquePartyTypes = ["All", ...Array.from(new Set(partyHalls.flatMap(h => h.partyTypes)))];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Party Hall Booking</h1>
        <p className="text-muted-foreground">Book party venues for celebrations and events</p>
      </div>

      <div className="flex flex-col space-y-6">
        <div className="flex items-center gap-4">
          <Label htmlFor="party-type-filter">Filter by Event Type:</Label>
          <Select 
            value={selectedPartyType} 
            onValueChange={setSelectedPartyType}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              {uniquePartyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredHalls.map((hall) => (
            <Card key={hall.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-64">
                <img 
                  src={hall.image} 
                  alt={hall.name} 
                  className="w-full h-full object-cover"
                />
                <Badge 
                  className="absolute top-2 right-2 bg-background text-foreground"
                >
                  Up to {hall.capacity} guests
                </Badge>
              </div>
              <CardHeader>
                <CardTitle>{hall.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{hall.description}</p>
                
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-ocean">${hall.pricePerHour}/hour</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Features:</p>
                  <div className="flex flex-wrap gap-2">
                    {hall.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="bg-ocean/10">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Perfect for:</p>
                  <div className="flex flex-wrap gap-2">
                    {hall.partyTypes.map((type, idx) => (
                      <Badge key={idx} variant="outline" className="bg-coral/10">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-ocean hover:bg-ocean-dark flex items-center gap-2"
                  onClick={() => handleBookHall(hall.id)}
                >
                  <PartyPopper className="h-4 w-4" />
                  Book Venue
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              Book {partyHalls.find(h => h.id === selectedHall)?.name}
            </DialogTitle>
            <DialogDescription>
              Fill in the details to complete your booking for this venue.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="event-type">Event Type</Label>
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  {partyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Event Date</Label>
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
              
              <div className="grid gap-2">
                <Label htmlFor="start-time">Start Time</Label>
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="guest-count">Number of Guests</Label>
                <Input
                  id="guest-count"
                  type="number"
                  min="1"
                  max={partyHalls.find(h => h.id === selectedHall)?.capacity}
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="catering">Catering Options</Label>
              <Select value={catering} onValueChange={setCatering}>
                <SelectTrigger>
                  <SelectValue placeholder="Select catering option" />
                </SelectTrigger>
                <SelectContent>
                  {cateringOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="entertainment">Entertainment</Label>
              <Select value={entertainment} onValueChange={setEntertainment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select entertainment option" />
                </SelectTrigger>
                <SelectContent>
                  {entertainmentOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="special-requests">Special Requests</Label>
              <Textarea
                id="special-requests"
                placeholder="Any special requests or setup instructions..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            
            {selectedHall && (
              <div className="flex items-center justify-between mt-2 p-4 bg-ocean/10 rounded-md">
                <div className="flex flex-col">
                  <span className="font-medium">Booking Summary:</span>
                  <span className="text-sm">{partyHalls.find(h => h.id === selectedHall)?.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {duration} hours × ${partyHalls.find(h => h.id === selectedHall)?.pricePerHour}/hour
                  </span>
                </div>
                <div className="text-xl font-bold text-ocean">
                  ${(parseInt(duration) * (partyHalls.find(h => h.id === selectedHall)?.pricePerHour || 0)).toFixed(2)}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button
              onClick={handleConfirmBooking}
              className="bg-ocean hover:bg-ocean-dark"
              disabled={!eventType || !date || !startTime || !duration || !guestCount}
            >
              Complete Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default PartyHall;
