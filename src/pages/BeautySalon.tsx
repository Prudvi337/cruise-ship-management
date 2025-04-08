
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
import { Scissors, Clock, Calendar as CalendarIcon, User, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock beauty treatments
const beautyTreatments = [
  {
    id: 1,
    name: "Classic Manicure",
    description: "A relaxing manicure with nail shaping, cuticle care, and polish application.",
    price: 35,
    duration: "45 min",
    category: "Nails",
    image: "https://placehold.co/500x300/coral/white?text=Classic+Manicure"
  },
  {
    id: 2,
    name: "Deluxe Facial",
    description: "A rejuvenating facial that includes cleansing, exfoliation, mask, and moisturizing treatment.",
    price: 85,
    duration: "60 min",
    category: "Facials",
    image: "https://placehold.co/500x300/ocean/white?text=Deluxe+Facial"
  },
  {
    id: 3,
    name: "Hot Stone Massage",
    description: "Relaxing massage using heated stones to ease muscle tension and improve circulation.",
    price: 95,
    duration: "75 min",
    category: "Massage",
    image: "https://placehold.co/500x300/sand/white?text=Hot+Stone+Massage"
  },
  {
    id: 4,
    name: "Men's Haircut & Styling",
    description: "Professional haircut and styling for men, includes wash and blow dry.",
    price: 45,
    duration: "30 min",
    category: "Hair",
    image: "https://placehold.co/500x300/ocean/white?text=Men's+Haircut"
  },
  {
    id: 5,
    name: "Women's Haircut & Styling",
    description: "Professional haircut and styling for women, includes wash and blow dry.",
    price: 65,
    duration: "60 min",
    category: "Hair",
    image: "https://placehold.co/500x300/coral/white?text=Women's+Haircut"
  },
  {
    id: 6,
    name: "Aromatherapy Massage",
    description: "Therapeutic massage using essential oils to enhance relaxation and well-being.",
    price: 90,
    duration: "60 min",
    category: "Massage",
    image: "https://placehold.co/500x300/sand/white?text=Aromatherapy+Massage"
  }
];

// Available time slots
const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", 
  "12:00 PM", "1:00 PM", "2:00 PM", 
  "3:00 PM", "4:00 PM", "5:00 PM"
];

// Available specialists
const specialists = [
  "Emma Wilson", "James Rodriguez", "Sophie Chen", 
  "Marcus Johnson", "Olivia Taylor", "Daniel Kim"
];

const BeautySalon = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTreatment, setSelectedTreatment] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState<string | undefined>();
  const [specialist, setSpecialist] = useState<string | undefined>();

  const handleBookAppointment = (treatmentId: number) => {
    setSelectedTreatment(treatmentId);
    setOpenDialog(true);
  };

  const handleConfirmBooking = () => {
    const treatment = beautyTreatments.find(t => t.id === selectedTreatment);
    
    toast({
      title: "Appointment Booked!",
      description: `You have successfully booked a ${treatment?.name} with ${specialist} on ${date ? format(date, "PPP") : ""} at ${timeSlot}.`
    });
    
    setOpenDialog(false);
    setTimeSlot(undefined);
    setSpecialist(undefined);
  };

  const filteredTreatments = selectedCategory === "All" 
    ? beautyTreatments 
    : beautyTreatments.filter(treatment => treatment.category === selectedCategory);

  const uniqueCategories = ["All", ...Array.from(new Set(beautyTreatments.map(t => t.category)))];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Beauty Salon</h1>
        <p className="text-muted-foreground">Book appointments for beauty treatments</p>
      </div>

      <div className="flex flex-col space-y-6">
        <div className="flex items-center gap-4">
          <Label htmlFor="category-filter">Filter by:</Label>
          <Select 
            value={selectedCategory} 
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {uniqueCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTreatments.map((treatment) => (
            <Card key={treatment.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                <img 
                  src={treatment.image} 
                  alt={treatment.name} 
                  className="w-full h-full object-cover"
                />
                <Badge 
                  className="absolute top-2 right-2 bg-background text-foreground"
                >
                  {treatment.category}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle>{treatment.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{treatment.description}</p>
                
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-ocean">${treatment.price}</p>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="h-4 w-4 text-ocean" />
                    <span>{treatment.duration}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-ocean hover:bg-ocean-dark flex items-center gap-2"
                  onClick={() => handleBookAppointment(treatment.id)}
                >
                  <Scissors className="h-4 w-4" />
                  Book Appointment
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Book {beautyTreatments.find(t => t.id === selectedTreatment)?.name}
            </DialogTitle>
            <DialogDescription>
              Choose your preferred date, time, and specialist.
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
            
            <div className="grid gap-2">
              <Label htmlFor="time">Select Time Slot</Label>
              <Select value={timeSlot} onValueChange={setTimeSlot}>
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
            
            <div className="grid gap-2">
              <Label htmlFor="specialist">Select Specialist</Label>
              <Select value={specialist} onValueChange={setSpecialist}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialist" />
                </SelectTrigger>
                <SelectContent>
                  {specialists.map((person) => (
                    <SelectItem key={person} value={person}>
                      {person}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedTreatment && (
              <div className="flex items-center justify-between mt-2 p-3 bg-ocean/10 rounded-md">
                <div className="flex flex-col">
                  <span className="font-medium">Your booking summary:</span>
                  <span className="text-sm text-muted-foreground">{beautyTreatments.find(t => t.id === selectedTreatment)?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-ocean" />
                  <span>{beautyTreatments.find(t => t.id === selectedTreatment)?.duration}</span>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button
              onClick={handleConfirmBooking}
              className="bg-ocean hover:bg-ocean-dark"
              disabled={!date || !timeSlot || !specialist}
            >
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default BeautySalon;
