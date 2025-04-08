
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingBag, BookOpen, Gift } from "lucide-react";

// Mock stationery products
const stationeryProducts = [
  {
    id: 1,
    name: "Premium Notebook",
    description: "High-quality hardcover notebook with 200 pages",
    price: 15.99,
    category: "Books",
    image: "https://placehold.co/300x200/ocean/white?text=Notebook",
    icon: BookOpen
  },
  {
    id: 2,
    name: "Cruise Ship Model",
    description: "Detailed miniature model of our cruise ship",
    price: 29.99,
    category: "Gifts",
    image: "https://placehold.co/300x200/coral/white?text=Ship+Model",
    icon: Gift
  },
  {
    id: 3,
    name: "Ocean View Postcard Set",
    description: "Set of 10 beautiful postcards featuring ocean views",
    price: 8.99,
    category: "Stationery",
    image: "https://placehold.co/300x200/sand/white?text=Postcards",
    icon: ShoppingBag
  },
  {
    id: 4,
    name: "Luxury Pen Set",
    description: "Set of 3 premium ballpoint pens with the cruise logo",
    price: 19.99,
    category: "Stationery",
    image: "https://placehold.co/300x200/ocean/white?text=Pen+Set",
    icon: ShoppingBag
  },
  {
    id: 5,
    name: "Travel Journal",
    description: "Beautiful journal to document your cruise adventures",
    price: 12.99,
    category: "Books",
    image: "https://placehold.co/300x200/coral/white?text=Journal",
    icon: BookOpen
  },
  {
    id: 6,
    name: "Voyage Memories Photo Frame",
    description: "Elegant photo frame to preserve your cruise memories",
    price: 24.99,
    category: "Gifts",
    image: "https://placehold.co/300x200/sand/white?text=Photo+Frame",
    icon: Gift
  }
];

const Stationery = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<{id: number, quantity: number}[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const handleAddToCart = (productId: number) => {
    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
      setCartItems(
        cartItems.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }
    
    toast({
      title: "Item added to cart",
      description: "The stationery item has been added to your cart."
    });
  };

  const filteredProducts = selectedCategory === "All" 
    ? stationeryProducts 
    : stationeryProducts.filter(product => product.category === selectedCategory);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Stationery Shop</h1>
        <p className="text-muted-foreground">Order books, gifts, and stationery items for your voyage</p>
      </div>
      
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
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
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Books">Books</SelectItem>
                <SelectItem value="Gifts">Gifts</SelectItem>
                <SelectItem value="Stationery">Stationery</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => toast({
              title: "Cart",
              description: `You have ${cartItems.reduce((acc, item) => acc + item.quantity, 0)} items in your cart`
            })}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 bg-ocean-light">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-background rounded-full p-1">
                  <product.icon className="h-5 w-5 text-ocean" />
                </div>
              </div>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                <p className="text-lg font-semibold text-ocean">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-ocean hover:bg-ocean-dark"
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Stationery;
