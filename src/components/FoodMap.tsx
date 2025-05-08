
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Search, User, Clock, Info, Store } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock location data
const mockLocations = [
  {
    id: "1",
    name: "Community Pantry #1",
    type: "pantry",
    address: "123 Main St, Cityville",
    distance: 0.8,
    items: ["Canned beans", "Rice", "Pasta", "Tomato sauce"],
    hours: "9am - 5pm",
    daysOpen: "Mon-Fri",
  },
  {
    id: "2",
    name: "Green Market",
    type: "market",
    address: "456 Oak Ave, Cityville",
    distance: 1.2,
    items: ["Fresh vegetables", "Fruits", "Bread", "Eggs"],
    hours: "8am - 7pm",
    daysOpen: "Mon-Sat",
  },
  {
    id: "3",
    name: "Neighborhood Fridge",
    type: "fridge",
    address: "789 Elm St, Cityville",
    distance: 0.5,
    items: ["Milk", "Cheese", "Leftover meals", "Sandwiches"],
    hours: "24/7",
    daysOpen: "All days",
  },
  {
    id: "4",
    name: "Food Bank Central",
    type: "foodbank",
    address: "101 Pine Rd, Cityville",
    distance: 2.1,
    items: ["Canned goods", "Dry goods", "Personal care items"],
    hours: "10am - 4pm",
    daysOpen: "Tue-Sat",
  },
  {
    id: "5",
    name: "Sarah's Community Share",
    type: "pantry",
    address: "202 Maple Lane, Cityville",
    distance: 1.7,
    items: ["Home-cooked meals", "Baked goods", "Vegetables"],
    hours: "5pm - 8pm",
    daysOpen: "Wed, Fri, Sun",
  },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "pantry":
      return "bg-foodie-orange-light/20 text-foodie-orange-dark";
    case "market":
      return "bg-foodie-green-light/20 text-foodie-green-dark";
    case "fridge":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-foodie-purple-light/20 text-foodie-purple-dark";
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "pantry":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-package"
        >
          <path d="m7.5 4.27 9 5.15" />
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
      );
    case "market":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-store"
        >
          <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
          <path d="M2 7h20" />
          <path d="M22 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7" />
          <path d="M18 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7" />
          <path d="M14 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7" />
          <path d="M10 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7" />
          <path d="M6 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7" />
        </svg>
      );
    case "fridge":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-refrigerator"
        >
          <path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z" />
          <path d="M5 10h14" />
          <path d="M15 7v6" />
        </svg>
      );
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-building"
        >
          <rect width="16" height="20" x="4" y="2" rx="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01" />
          <path d="M16 6h.01" />
          <path d="M12 6h.01" />
          <path d="M12 10h.01" />
          <path d="M12 14h.01" />
          <path d="M16 10h.01" />
          <path d="M16 14h.01" />
          <path d="M8 10h.01" />
          <path d="M8 14h.01" />
        </svg>
      );
  }
};

const FoodMap = () => {
  const [locations, setLocations] = useState(mockLocations);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<typeof mockLocations[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [distanceFilter, setDistanceFilter] = useState([3]);
  const [activeTab, setActiveTab] = useState("map");

  // Filter locations based on search and distance
  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      location.distance <= distanceFilter[0]
  );

  const handleLocationClick = (location: typeof mockLocations[0]) => {
    setSelectedLocation(location);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-6 h-6 text-foodie-purple" />
        <h1 className="foodie-heading">Find Food</h1>
      </div>

      <Tabs defaultValue="map" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="map" className="data-[state=active]:bg-foodie-purple-light/20 data-[state=active]:text-foodie-purple">
            Map
          </TabsTrigger>
          <TabsTrigger value="list" className="data-[state=active]:bg-foodie-green-light/20 data-[state=active]:text-foodie-green">
            List View
          </TabsTrigger>
        </TabsList>
        
        {/* Map Tab */}
        <TabsContent value="map" className="space-y-4">
          {/* Search and Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-sm text-gray-600">Distance (miles)</Label>
                <span className="text-sm font-medium">{distanceFilter[0]} mi</span>
              </div>
              <Slider
                defaultValue={[3]}
                max={5}
                step={0.1}
                value={distanceFilter}
                onValueChange={setDistanceFilter}
                className="mt-2"
              />
            </div>
          </div>
          
          {/* Map Placeholder */}
          <div className="aspect-square bg-gray-100 rounded-lg relative overflow-hidden border border-gray-200">
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l+9B87F5(-73.99,40.73)/-73.99,40.73,13,0/400x400@2x?access_token=pk.placeholder')] bg-cover bg-center opacity-75"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Card className="w-11/12 max-w-sm bg-white/90 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <Info className="h-6 w-6 text-foodie-purple mx-auto" />
                    <h3 className="font-medium">Test Placeholder</h3>
                    <p className="text-sm text-gray-600">
                      In a real application, this would display an interactive map 
                      showing the locations of food sources near you.
                    </p>
                    <Button className="bg-foodie-purple hover:bg-foodie-purple-dark mt-2">
                      View Nearby Locations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Nearby Locations */}
          <h3 className="font-medium text-gray-700">Nearby Locations</h3>
          <div className="space-y-3">
            {filteredLocations.slice(0, 3).map((location) => (
              <Card
                key={location.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleLocationClick(location)}
              >
                <CardContent className="p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{location.name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{location.address}</span>
                      </div>
                    </div>
                    <Badge className={`${getTypeColor(location.type)} flex items-center gap-1`}>
                      {getTypeIcon(location.type)}
                      <span className="capitalize">{location.type}</span>
                    </Badge>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{location.hours}</span>
                    </div>
                    <div className="text-sm font-medium">{location.distance} mi</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* List View Tab */}
        <TabsContent value="list" className="space-y-4">
          {/* Search and Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-sm text-gray-600">Distance (miles)</Label>
                <span className="text-sm font-medium">{distanceFilter[0]} mi</span>
              </div>
              <Slider
                defaultValue={[3]}
                max={5}
                step={0.1}
                value={distanceFilter}
                onValueChange={setDistanceFilter}
                className="mt-2"
              />
            </div>
          </div>
          
          {/* List of Locations */}
          <div className="space-y-3">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <Card
                  key={location.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleLocationClick(location)}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{location.name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{location.address}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge className={`${getTypeColor(location.type)} flex items-center gap-1`}>
                          {getTypeIcon(location.type)}
                          <span className="capitalize">{location.type}</span>
                        </Badge>
                        <span className="text-sm font-medium mt-1">
                          {location.distance} mi
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{location.hours}</span>
                        <span className="mx-1">•</span>
                        <span>{location.daysOpen}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {location.items.slice(0, 2).map((item, i) => (
                          <Badge variant="outline" key={i} className="text-xs">
                            {item}
                          </Badge>
                        ))}
                        {location.items.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{location.items.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">
                  No locations found
                </h3>
                <p className="text-gray-500 text-sm">
                  Try adjusting your search or increasing the distance
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Location Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          {selectedLocation && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedLocation.name}</DialogTitle>
                <DialogDescription>
                  {selectedLocation.address}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-gray-100 h-40 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm text-gray-600"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2131.1844304028423!2d12.93845449090742!3d57.713324878934564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465aa0a911161ae1%3A0x9810b6e7a1ed4fb1!2sKellgrensgatan%2C%20Bor%C3%A5s!5e0!3m2!1ssv!2sse!4v1746715005043!5m2!1ssv!2sse" 
                    loading="lazy"></iframe></p>
                    
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-gray-700">Type</h4>
                    <Badge className={`${getTypeColor(selectedLocation.type)} flex items-center gap-1`}>
                      {getTypeIcon(selectedLocation.type)}
                      <span className="capitalize">{selectedLocation.type}</span>
                    </Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-gray-700">Distance</h4>
                    <p>{selectedLocation.distance} miles away</p>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-gray-700">Hours</h4>
                    <p>{selectedLocation.hours}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-gray-700">Days Open</h4>
                    <p>{selectedLocation.daysOpen}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Available Items</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedLocation.items.map((item, i) => (
                      <Badge key={i} variant="outline">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between gap-3 mt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setDialogOpen(false)}
                  >
                    Close
                  </Button>
                  <Button className="flex-1 bg-foodie-purple hover:bg-foodie-purple-dark flex gap-1 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-navigation"
                    >
                      <polygon points="3 11 22 2 13 21 11 13 3 11" />
                    </svg>
                    Get Directions
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FoodMap;
