
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Coffee, 
  Soup, 
  Pizza, 
  Dessert, 
  Wine, 
  UtensilsCrossed,
  ShoppingCart,
  Plus,
  Minus
} from "lucide-react";

// Mock data for catering items
const cateringItems = {
  meals: [
    { id: "m1", name: "Grilled Salmon", description: "Fresh salmon with vegetables", price: 24.99, image: "https://source.unsplash.com/random/300x200/?salmon" },
    { id: "m2", name: "Steak & Potatoes", description: "Prime cut with roasted potatoes", price: 29.99, image: "https://source.unsplash.com/random/300x200/?steak" },
    { id: "m3", name: "Vegetarian Pasta", description: "Pasta with seasonal vegetables", price: 18.99, image: "https://source.unsplash.com/random/300x200/?pasta" },
    { id: "m4", name: "Seafood Platter", description: "Selection of fresh seafood", price: 32.99, image: "https://source.unsplash.com/random/300x200/?seafood" },
  ],
  snacks: [
    { id: "s1", name: "Cheese Platter", description: "Selection of fine cheeses", price: 14.99, image: "https://source.unsplash.com/random/300x200/?cheese" },
    { id: "s2", name: "Fruit Bowl", description: "Fresh seasonal fruits", price: 9.99, image: "https://source.unsplash.com/random/300x200/?fruit" },
    { id: "s3", name: "Nachos & Dip", description: "Tortilla chips with salsa and guacamole", price: 12.99, image: "https://source.unsplash.com/random/300x200/?nachos" },
    { id: "s4", name: "Mixed Nuts", description: "Assortment of premium nuts", price: 8.99, image: "https://source.unsplash.com/random/300x200/?nuts" },
  ],
  beverages: [
    { id: "b1", name: "Premium Coffee", description: "Freshly brewed specialty coffee", price: 4.99, image: "https://source.unsplash.com/random/300x200/?coffee" },
    { id: "b2", name: "Fresh Juice", description: "Variety of fresh squeezed juices", price: 5.99, image: "https://source.unsplash.com/random/300x200/?juice" },
    { id: "b3", name: "Craft Cocktail", description: "Specialty cocktails made by our bartenders", price: 12.99, image: "https://source.unsplash.com/random/300x200/?cocktail" },
    { id: "b4", name: "Wine Selection", description: "Fine wines from around the world", price: 9.99, image: "https://source.unsplash.com/random/300x200/?wine" },
  ],
  desserts: [
    { id: "d1", name: "Chocolate Cake", description: "Rich chocolate layer cake", price: 7.99, image: "https://source.unsplash.com/random/300x200/?chocolate_cake" },
    { id: "d2", name: "Cheesecake", description: "New York style cheesecake", price: 8.99, image: "https://source.unsplash.com/random/300x200/?cheesecake" },
    { id: "d3", name: "Ice Cream", description: "Selection of premium ice creams", price: 6.99, image: "https://source.unsplash.com/random/300x200/?ice_cream" },
    { id: "d4", name: "Fruit Tart", description: "Fresh fruit tart with custard", price: 7.49, image: "https://source.unsplash.com/random/300x200/?tart" },
  ],
};

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const Catering = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [roomNumber, setRoomNumber] = useState("");
  const { toast } = useToast();

  const addToCart = (item: { id: string; name: string; price: number }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart`,
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);
      
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCart.filter((item) => item.id !== id);
      }
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (!roomNumber) {
      toast({
        title: "Room Number Required",
        description: "Please enter your room number to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before checkout",
        variant: "destructive",
      });
      return;
    }
    
    // Log the order details
    console.log("Order placed:", {
      items: cart,
      roomNumber,
      totalPrice: getTotalPrice(),
      timestamp: new Date().toISOString(),
    });
    
    toast({
      title: "Order Placed Successfully",
      description: `Your order will be delivered to room ${roomNumber}`,
    });
    
    // Reset cart and room number
    setCart([]);
    setRoomNumber("");
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Catering Service</h1>
        <p className="text-muted-foreground">
          Order delicious meals, snacks, and beverages delivered to your room
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="meals" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="meals" className="flex flex-col items-center gap-1 py-3">
                <UtensilsCrossed className="h-5 w-5" />
                <span>Meals</span>
              </TabsTrigger>
              <TabsTrigger value="snacks" className="flex flex-col items-center gap-1 py-3">
                <Soup className="h-5 w-5" />
                <span>Snacks</span>
              </TabsTrigger>
              <TabsTrigger value="beverages" className="flex flex-col items-center gap-1 py-3">
                <Coffee className="h-5 w-5" />
                <span>Beverages</span>
              </TabsTrigger>
              <TabsTrigger value="desserts" className="flex flex-col items-center gap-1 py-3">
                <Dessert className="h-5 w-5" />
                <span>Desserts</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="meals" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cateringItems.meals.map((item) => (
                  <CateringItemCard 
                    key={item.id} 
                    item={item} 
                    onAddToCart={() => addToCart(item)} 
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="snacks" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cateringItems.snacks.map((item) => (
                  <CateringItemCard 
                    key={item.id} 
                    item={item} 
                    onAddToCart={() => addToCart(item)} 
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="beverages" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cateringItems.beverages.map((item) => (
                  <CateringItemCard 
                    key={item.id} 
                    item={item} 
                    onAddToCart={() => addToCart(item)} 
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="desserts" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cateringItems.desserts.map((item) => (
                  <CateringItemCard 
                    key={item.id} 
                    item={item} 
                    onAddToCart={() => addToCart(item)} 
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader className="bg-ocean text-white">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <CardTitle>Your Order</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {cart.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Your cart is empty
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-7 w-7 p-0" 
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-7 w-7 p-0" 
                            onClick={() => addToCart(item)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4 mt-6">
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="roomNumber" className="block text-sm font-medium mb-1">
                    Room Number
                  </label>
                  <Input
                    id="roomNumber"
                    placeholder="Enter your room number"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 p-6">
              <Button 
                className="w-full bg-ocean hover:bg-ocean-dark"
                onClick={handleCheckout}
                disabled={cart.length === 0}
              >
                Place Order
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

interface CateringItemCardProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  };
  onAddToCart: () => void;
}

const CateringItemCard: React.FC<CateringItemCardProps> = ({ item, onAddToCart }) => {
  return (
    <Card className="overflow-hidden card-hover">
      <div className="h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{item.name}</h3>
          <Badge variant="outline" className="bg-ocean/10 text-ocean">
            ${item.price.toFixed(2)}
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm mb-6">{item.description}</p>
        <Button 
          className="w-full bg-ocean hover:bg-ocean-dark"
          onClick={onAddToCart}
        >
          Add to Order
        </Button>
      </CardContent>
    </Card>
  );
};

export default Catering;
