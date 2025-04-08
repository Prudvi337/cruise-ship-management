
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
import { Dumbbell, Clock, Calendar as CalendarIcon, Timer, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock fitness equipment
const fitnessEquipment = [
  {
    id: 1,
    name: "Treadmill",
    description: "High-end treadmill with incline settings and built-in workout programs.",
    category: "Cardio",
    image: "https://placehold.co/500x300/ocean/white?text=Treadmill",
    availableUnits: 8
  },
  {
    id: 2,
    name: "Rowing Machine",
    description: "Professional rowing machine for full body workouts.",
    category: "Cardio",
    image: "https://placehold.co/500x300/coral/white?text=Rowing+Machine",
    availableUnits: 4
  },
  {
    id: 3,
    name: "Smith Machine",
    description: "Multi-purpose weight training equipment for various exercises.",
    category: "Strength",
    image: "https://placehold.co/500x300/sand/white?text=Smith+Machine",
    availableUnits: 3
  },
  {
    id: 4,
    name: "Free Weights Set",
    description: "Complete set of dumbbells ranging from 5 to 50 pounds.",
    category: "Strength",
    image: "https://placehold.co/500x300/ocean/white?text=Free+Weights",
    availableUnits: 6
  },
  {
    id: 5,
    name: "Yoga Mat",
    description: "Premium non-slip yoga mat for yoga and floor exercises.",
    category: "Flexibility",
    image: "https://placehold.co/500x300/coral/white?text=Yoga+Mat",
    availableUnits: 15
  },
  {
    id: 6,
    name: "Exercise Bike",
    description: "Stationary bike with adjustable resistance levels and digital display.",
    category: "Cardio",
    image: "https://placehold.co/500x300/sand/white?text=Exercise+Bike",
    availableUnits: 6
  }
];

// Mock fitness classes
const fitnessClasses = [
  {
    id: 1,
    name: "Morning Yoga",
    description: "Start your day with a relaxing yet invigorating yoga session suitable for all levels.",
    instructor: "Sarah Johnson",
    duration: "45 min",
    capacity: 12,
    times: ["7:00 AM", "9:00 AM"],
    image: "https://placehold.co/500x300/ocean/white?text=Morning+Yoga"
  },
  {
    id: 2,
    name: "HIIT Workout",
    description: "High-intensity interval training to boost your metabolism and build strength.",
    instructor: "Mark Davis",
    duration: "30 min",
    capacity: 10,
    times: ["11:00 AM", "4:00 PM"],
    image: "https://placehold.co/500x300/coral/white?text=HIIT+Workout"
  },
  {
    id: 3,
    name: "Zumba",
    description: "Fun dance-based workout combining cardio with Latin-inspired dance moves.",
    instructor: "Elena Rodriguez",
    duration: "60 min",
    capacity: 15,
    times: ["2:00 PM", "6:00 PM"],
    image: "https://placehold.co/500x300/sand/white?text=Zumba"
  }
];

// Available time slots
const gymTimeSlots = [
  "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", 
  "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", 
  "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"
];

const FitnessCenter = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("gym");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedEquipment, setSelectedEquipment] = useState<number | null>(null);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"equipment" | "class">("equipment");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState<string | undefined>();
  const [duration, setDuration] = useState<string>("60");

  const handleBookEquipment = (equipmentId: number) => {
    setSelectedEquipment(equipmentId);
    setDialogType("equipment");
    setOpenDialog(true);
  };

  const handleBookClass = (classId: number) => {
    setSelectedClass(classId);
    setDialogType("class");
    setOpenDialog(true);
  };

  const handleConfirmBooking = () => {
    if (dialogType === "equipment") {
      const equipment = fitnessEquipment.find(e => e.id === selectedEquipment);
      toast({
        title: "Equipment Reserved!",
        description: `You have successfully reserved a ${equipment?.name} on ${date ? format(date, "PPP") : ""} at ${timeSlot} for ${duration} minutes.`
      });
    } else {
      const fitnessClass = fitnessClasses.find(c => c.id === selectedClass);
      toast({
        title: "Class Booked!",
        description: `You have successfully booked the ${fitnessClass?.name} class on ${date ? format(date, "PPP") : ""} at ${timeSlot}.`
      });
    }
    
    setOpenDialog(false);
    setTimeSlot(undefined);
    setDuration("60");
  };

  const filteredEquipment = selectedCategory === "All" 
    ? fitnessEquipment 
    : fitnessEquipment.filter(item => item.category === selectedCategory);

  const uniqueCategories = ["All", ...Array.from(new Set(fitnessEquipment.map(e => e.category)))];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Fitness Center</h1>
        <p className="text-muted-foreground">Book gym sessions and fitness equipment</p>
      </div>

      <Tabs defaultValue="gym" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="gym" className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4" />
            <span>Gym Equipment</span>
          </TabsTrigger>
          <TabsTrigger value="classes" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Fitness Classes</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gym" className="mt-0">
          <div className="flex items-center gap-4 mb-6">
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
            {filteredEquipment.map((equipment) => (
              <Card key={equipment.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <img 
                    src={equipment.image} 
                    alt={equipment.name} 
                    className="w-full h-full object-cover"
                  />
                  <Badge 
                    className="absolute top-2 right-2 bg-background text-foreground"
                  >
                    {equipment.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle>{equipment.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{equipment.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant={equipment.availableUnits > 0 ? "outline" : "destructive"} className="bg-ocean/10 text-ocean">
                      {equipment.availableUnits} units available
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-ocean hover:bg-ocean-dark flex items-center gap-2"
                    onClick={() => handleBookEquipment(equipment.id)}
                    disabled={equipment.availableUnits === 0}
                  >
                    <Dumbbell className="h-4 w-4" />
                    Reserve Equipment
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="classes" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fitnessClasses.map((fitnessClass) => (
              <Card key={fitnessClass.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <img 
                    src={fitnessClass.image} 
                    alt={fitnessClass.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{fitnessClass.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{fitnessClass.description}</p>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-ocean" />
                      <span>Instructor: {fitnessClass.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-ocean" />
                      <span>Duration: {fitnessClass.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-ocean" />
                      <span>Capacity: {fitnessClass.capacity} people</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Available times:</p>
                    <div className="flex flex-wrap gap-2">
                      {fitnessClass.times.map((time, idx) => (
                        <Badge key={idx} variant="outline" className="bg-ocean/10">
                          {time}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-ocean hover:bg-ocean-dark flex items-center gap-2"
                    onClick={() => handleBookClass(fitnessClass.id)}
                  >
                    <Users className="h-4 w-4" />
                    Book Class
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
              {dialogType === "equipment" 
                ? `Reserve ${fitnessEquipment.find(e => e.id === selectedEquipment)?.name}` 
                : `Book ${fitnessClasses.find(c => c.id === selectedClass)?.name} Class`}
            </DialogTitle>
            <DialogDescription>
              Choose your preferred date and time.
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
              <Label htmlFor="time">Select Time</Label>
              <Select value={timeSlot} onValueChange={setTimeSlot}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {dialogType === "equipment" 
                    ? gymTimeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))
                    : fitnessClasses.find(c => c.id === selectedClass)?.times.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))
                  }
                </SelectContent>
              </Select>
            </div>
            
            {dialogType === "equipment" && (
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                    <SelectItem value="120">120 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {(selectedEquipment || selectedClass) && (
              <div className="flex items-center justify-between mt-2 p-3 bg-ocean/10 rounded-md">
                <div className="flex flex-col">
                  <span className="font-medium">Your booking details:</span>
                  <span className="text-sm text-muted-foreground">
                    {dialogType === "equipment" 
                      ? fitnessEquipment.find(e => e.id === selectedEquipment)?.name
                      : fitnessClasses.find(c => c.id === selectedClass)?.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-ocean" />
                  <span>
                    {dialogType === "equipment" 
                      ? `${duration} min`
                      : fitnessClasses.find(c => c.id === selectedClass)?.duration}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button
              onClick={handleConfirmBooking}
              className="bg-ocean hover:bg-ocean-dark"
              disabled={!date || !timeSlot || (dialogType === "equipment" && !duration)}
            >
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default FitnessCenter;
