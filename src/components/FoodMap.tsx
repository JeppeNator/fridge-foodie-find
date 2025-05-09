
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Search, Clock, Edit, Lock } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

// Mock location data
const mockLocations = [
  {
    id: "1",
    address: "Högskolan i Borås",
    distance: 0.8,
    items: [
      {
        name: "Gurka",
        quantity: "1",
        Category: "Sallad",
        unit: "st",
        expiryDate: "2025-05-28"
      },
      {
        name: "Ris",
        quantity: "100",
        Category: "Sallad",
        unit: "korn",
        expiryDate: "2025-05-09"
      },
      {
        name: "Pasta",
        quantity: "5",
        Category: "Sallad",
        unit: "spagett",
        expiryDate: "2025-05-12"
      },
    ],
    hours: "09:00 - 12:00",
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4260.975085651297!2d12.936614277180308!3d57.7251620738776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465aa0aee8721f03%3A0xe1fd8213c5fc0bc3!2zSMO2Z3Nrb2xhbiBpIEJvcsOlcw!5e0!3m2!1ssv!2sse!4v1746728034326!5m2!1ssv!2sse"
  },
  {
    id: "2",
    address: "Centiro",
    distance: 2.3,
    items: [
      {
        name: "Kaffe",
        quantity: "5",
        Category: "Sallad",
        unit: "liter",
        expiryDate: "2025-05-28"
      },
      {
        name: "Köttbullemacka",
        quantity: "2",
        Category: "Sallad",
        unit: "st",
        expiryDate: "2025-05-10"
      },
    ],
    hours: "15:00 - 17:00",
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4264.138100583773!2d12.827689377178638!3d57.698296673865954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46500838065dc9f5%3A0xdbea3dda02f559aa!2sCentiro%20Solutions%20AB!5e0!3m2!1ssv!2sse!4v1746728060507!5m2!1ssv!2sse"
  },
];

const daysFromToday = (dateString: string) => {
  const today = new Date();
  const targetDate = new Date(dateString);

  // Zero out time to only compare dates
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

const getTypeColor = (expiryDate: string) => {
  let days = daysFromToday(expiryDate)
  console.log(days)
  if (days < 2) {
    return "bg-foodie-red-light/20 text-foodie-red-dark";
  }
  if (days < 6) {
    return "bg-foodie-orange-light/20 text-foodie-orange-dark";
  }
  return "bg-foodie-green-light/20 text-foodie-green-dark"
};

const getExpireColor = (expiresIn: number) => {
  console.log(expiresIn)
  if (expiresIn < 2) {
    return "bg-foodie-red-light/20 text-foodie-red-dark";
  }
  if (expiresIn < 6) {
    return "bg-foodie-orange-light/20 text-foodie-orange-dark";
  }
  return "bg-foodie-green-light/20 text-foodie-green-dark"
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
  const [activeTab, setActiveTab] = useState("donations");

  // Filter locations based on search and distance
  const filteredLocations = locations.filter(
    (location) =>
      location.address.toLowerCase().includes(searchQuery.toLowerCase()) &&
      location.distance <= distanceFilter[0]
  ); //ToDo: fiter on items

  const handleLocationClick = (location: typeof mockLocations[0]) => {
    setSelectedLocation(location);
    setDialogOpen(true);
  };

  const [data, setData] = useState({ name: 'John', age: 30 });

  const updateName = () => {
    setData(prev => ({ ...prev, name: 'Jane' }));
  };

  const handleAllocate = (itemToUpdate: FridgeItem) => {
    const updatedItems = selectedLocation.items.map(item =>
      item.name === itemToUpdate.name
        ? { ...item, reserverad: true } // or whatever you want to change
        : item
    );

    setSelectedLocation(prev => ({
      ...prev,
      items: updatedItems,
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-6 h-6 text-foodie-purple" />
        <h1 className="text-xl font-semibold leading-none">Donationer</h1>
      </div>

      <Tabs defaultValue="donations" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="donations" className="data-[state=active]:bg-foodie-green-light/20 data-[state=active]:text-foodie-green">
            Donationer
          </TabsTrigger>
          <TabsTrigger value="myDonations" className="data-[state=active]:bg-foodie-purple-light/20 data-[state=active]:text-foodie-purple">
            Mina Donationer
          </TabsTrigger>
        </TabsList>

        {/* List View Tab */}
        <TabsContent value="donations" className="space-y-4">
          {/* Search and Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Sök matvaror..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-sm text-gray-600">Distance (km)</Label>
                <span className="text-sm font-medium">{distanceFilter[0]} km</span>
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
                        <div className="font-medium">{location.address}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{location.address}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge className={`${getTypeColor(location.address)} flex items-center gap-1`}>
                          {getTypeIcon(location.address)}
                          <span className="capitalize">{location.address}</span>
                        </Badge>
                        <span className="text-sm font-medium mt-1">
                          {location.distance} km
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{location.hours}</span>
                        <span className="mx-1">•</span>
                        <span>{location.hours}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {location.items.slice(0, 2).map((item, i) => (
                          <Badge variant="outline" key={i} className="text-xs">
                            {item.name}
                          </Badge>
                        ))}
                        {location.items.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{location.items.length - 2} fler
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
                  Inga donationer hittade
                </h3>
                <p className="text-gray-500 text-sm">
                  Försök sök på andra råvaror eller öka distansen
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Map Tab */}
        <TabsContent value="myDonations" className="space-y-4">

          {/* Nearby Locations */}
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
                      <div className="font-medium">{location.address}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{location.address}</span>
                      </div>
                    </div>
                    <Badge className={`${getTypeColor(location.address)} flex items-center gap-1`}>
                      {getTypeIcon(location.address)}
                      <span className="capitalize">{location.address}</span>
                    </Badge>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{location.hours}</span>
                    </div>
                    <div className="text-sm font-medium">{location.distance} km</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Location Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          {selectedLocation && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedLocation.address}</DialogTitle>
                <DialogDescription>
                  {selectedLocation.distance} km bort
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-gray-100 h-40 rounded-md overflow-hidden">
                  <iframe
                    src={selectedLocation.mapLink}
                    loading="lazy"
                    className="w-full h-full"
                    style={{ border: 0 }}
                  ></iframe>
                </div>


                <div className="space-y-1 flex items-center">
                  <h4 style={{ paddingRight: "0.2rem" }} className="text-sm font-medium text-gray-700">Tillgänglighet: </h4>
                  <p className="text-sm font-medium text-gray-700">{selectedLocation.hours}</p>
                </div>


              </div>
              <div className="space-y-2">
                {selectedLocation.items.map((item: FridgeItem) => (
                  <Card key={item.id} className="p-3 flex justify-between items-center">
                    <div className="flex flex-col">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <span>
                          {item.quantity} {item.unit}
                        </span>
                        <span className="mx-1">•</span>
                        <span className="flex items-center gap-1">
                          {Math.ceil((new Date(item.expiryDate).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24))} dagar till utgångsdatum
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!item.reserverad && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleAllocate(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {item.reserverad && (
                        <Lock></Lock>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FoodMap;