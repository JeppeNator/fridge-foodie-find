
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ShoppingCart,
  Plus,
  MessageCircle,
  Clock,
  User,
  CheckCircle,
  MapPin,
  Send,
  Filter,
  Search,
  X,
  Loader2,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Types
interface FoodRequest {
  id: string;
  userInitial: string;
  userName: string;
  userColor: string;
  items: string[];
  location: string;
  timePosted: string;
  timeNeededBy: string;
  status: "active" | "fulfilled" | "expired";
  description?: string;
  distance: number;
}

// Mock data
const mockRequests: FoodRequest[] = [
  {
    id: "req1",
    userInitial: "J",
    userName: "John D.",
    userColor: "bg-foodie-green",
    items: ["Milk", "Bread", "Eggs"],
    location: "Downtown Community Center",
    timePosted: "2 hours ago",
    timeNeededBy: "Today, 5pm",
    status: "active",
    description: "Need these items for my family dinner tonight. Can pick up anywhere in the downtown area. Thank you!",
    distance: 0.8,
  },
  {
    id: "req2",
    userInitial: "S",
    userName: "Sarah M.",
    userColor: "bg-foodie-purple",
    items: ["Rice", "Canned beans", "Pasta sauce"],
    location: "Eastside Food Pantry",
    timePosted: "5 hours ago",
    timeNeededBy: "Tomorrow, 12pm",
    status: "active",
    description: "Lost my job recently, would appreciate any help with these pantry staples.",
    distance: 1.2,
  },
  {
    id: "req3",
    userInitial: "L",
    userName: "Lisa T.",
    userColor: "bg-foodie-orange",
    items: ["Baby formula", "Diapers"],
    location: "Westside Neighborhood Fridge",
    timePosted: "1 day ago",
    timeNeededBy: "ASAP",
    status: "fulfilled",
    description: "Emergency request for my 6-month-old. Any brand of formula is fine.",
    distance: 2.5,
  },
  {
    id: "req4",
    userInitial: "M",
    userName: "Mike P.",
    userColor: "bg-blue-500",
    items: ["Fresh vegetables", "Fruit"],
    location: "North Community Garden",
    timePosted: "3 days ago",
    timeNeededBy: "This week",
    status: "expired",
    description: "Looking for any fresh produce. Can trade homemade bread.",
    distance: 1.7,
  }
];

// Create new request form initial state
const initialFormState = {
  items: [""],
  location: "",
  timeNeededBy: "",
  description: "",
  shareLocation: true,
};

const FoodRequest = () => {
  const [activeTab, setActiveTab] = useState("browse");
  const [requests, setRequests] = useState<FoodRequest[]>(mockRequests);
  const [formData, setFormData] = useState(initialFormState);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<FoodRequest | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFulfilled, setShowFulfilled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter requests based on search and fulfilled status
  const filteredRequests = requests.filter((req) => {
    const matchesSearch = req.items.some((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    ) || req.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = showFulfilled ? true : req.status === "active";
    
    return matchesSearch && matchesStatus;
  });

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...formData.items];
    newItems[index] = value;
    setFormData({ ...formData, items: newItems });
  };

  const addItemField = () => {
    setFormData({ ...formData, items: [...formData.items, ""] });
  };

  const removeItemField = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const openRequestDetail = (request: FoodRequest) => {
    setSelectedRequest(request);
    setDialogOpen(true);
  };

  const submitRequest = () => {
    // Validate form data
    const filledItems = formData.items.filter((item) => item.trim() !== "");
    if (filledItems.length === 0 || !formData.location || !formData.timeNeededBy) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      // Create new request
      const newRequest: FoodRequest = {
        id: `req${Math.random().toString(36).substring(2, 9)}`,
        userInitial: "Y",
        userName: "You",
        userColor: "bg-foodie-green-dark",
        items: filledItems,
        location: formData.location,
        timePosted: "Just now",
        timeNeededBy: formData.timeNeededBy,
        status: "active",
        description: formData.description,
        distance: 0,
      };

      // Add to requests list
      setRequests([newRequest, ...requests]);
      
      // Reset form
      setFormData(initialFormState);
      
      // Show success message
      toast({
        title: "Request posted",
        description: "Your food request has been posted successfully",
      });

      setIsSubmitting(false);
      setActiveTab("browse");
    }, 1000);
  };

  const handleFulfillRequest = (id: string) => {
    // Update request status
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "fulfilled" } : req
      )
    );

    // Close dialog
    setDialogOpen(false);

    // Show success message
    toast({
      title: "Request fulfilled",
      description: "Thank you for helping someone in need!",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingCart className="w-6 h-6 text-foodie-orange-dark" />
        <h1 className="foodie-heading">Food Requests</h1>
      </div>

      <Tabs defaultValue="browse" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="browse" className="data-[state=active]:bg-foodie-orange-light/20 data-[state=active]:text-foodie-orange-dark">
            Browse Requests
          </TabsTrigger>
          <TabsTrigger value="create" className="data-[state=active]:bg-foodie-green-light/20 data-[state=active]:text-foodie-green-dark">
            Make Request
          </TabsTrigger>
        </TabsList>
        
        {/* Browse Requests Tab */}
        <TabsContent value="browse" className="space-y-4">
          {/* Search and Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for items or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="show-fulfilled"
                checked={showFulfilled}
                onCheckedChange={setShowFulfilled}
              />
              <Label htmlFor="show-fulfilled">Show fulfilled requests</Label>
            </div>
          </div>
          
          {/* Requests List */}
          <div className="space-y-3">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <Card
                  key={request.id}
                  className={`hover:shadow-md transition-shadow cursor-pointer ${
                    request.status === "fulfilled" ? "opacity-70" : ""
                  }`}
                  onClick={() => openRequestDetail(request)}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full ${request.userColor} text-white flex items-center justify-center font-medium`}>
                          {request.userInitial}
                        </div>
                        <div>
                          <div className="font-medium">{request.userName}</div>
                          <div className="text-xs text-gray-500">
                            {request.timePosted}
                          </div>
                        </div>
                      </div>
                      {request.status !== "active" && (
                        <Badge
                          className={
                            request.status === "fulfilled"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {request.status === "fulfilled" ? "Fulfilled" : "Expired"}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {request.items.map((item, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="bg-gray-50"
                          >
                            {item}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate max-w-[150px]">
                            {request.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{request.timeNeededBy}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">
                  No requests found
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  No food requests match your search criteria
                </p>
                <Button
                  onClick={() => setActiveTab("create")}
                  className="bg-foodie-orange hover:bg-foodie-orange-dark"
                >
                  Create Request
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Create Request Tab */}
        <TabsContent value="create" className="space-y-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Items Needed</h3>
              <div className="space-y-2">
                {formData.items.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      placeholder={`Item ${index + 1}`}
                      onChange={(e) => handleItemChange(index, e.target.value)}
                      className="flex-1"
                    />
                    {formData.items.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItemField(index)}
                        className="text-gray-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={addItemField}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Another Item
              </Button>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Pickup Location</h3>
              <Input
                value={formData.location}
                placeholder="Where can people bring the food?"
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
              <div className="flex items-center space-x-2 mt-2">
                <Switch
                  id="share-location"
                  checked={formData.shareLocation}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, shareLocation: checked })
                  }
                />
                <Label htmlFor="share-location" className="text-sm text-gray-600">
                  Share my approximate location on the map
                </Label>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700 mb-2">When Needed</h3>
              <Input
                value={formData.timeNeededBy}
                placeholder="e.g. Today, 5pm or ASAP"
                onChange={(e) =>
                  setFormData({ ...formData, timeNeededBy: e.target.value })
                }
              />
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Description (Optional)</h3>
              <Textarea
                value={formData.description}
                placeholder="Add any additional details about your request..."
                rows={3}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            
            <Button
              onClick={submitRequest}
              className="w-full bg-foodie-green hover:bg-foodie-green-dark"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> 
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" /> 
                  Post Request
                </>
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Request Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          {selectedRequest && (
            <>
              <DialogHeader>
                <DialogTitle>Food Request</DialogTitle>
                <DialogDescription>
                  Posted {selectedRequest.timePosted} by {selectedRequest.userName}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-full ${selectedRequest.userColor} text-white flex items-center justify-center font-medium`}>
                      {selectedRequest.userInitial}
                    </div>
                    <div>
                      <div className="font-medium">{selectedRequest.userName}</div>
                      <div className="text-xs text-gray-500">
                        {selectedRequest.timePosted}
                      </div>
                    </div>
                  </div>
                  {selectedRequest.status !== "active" && (
                    <Badge
                      className={
                        selectedRequest.status === "fulfilled"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {selectedRequest.status === "fulfilled" ? "Fulfilled" : "Expired"}
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-700">Items Needed</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedRequest.items.map((item, i) => (
                      <Badge key={i} variant="outline">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-700">Pickup Location</h3>
                  <p className="text-gray-700">{selectedRequest.location}</p>
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-700">Needed By</h3>
                  <p className="text-gray-700">{selectedRequest.timeNeededBy}</p>
                </div>
                
                {selectedRequest.description && (
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-700">
                      Additional Information
                    </h3>
                    <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-md">
                      {selectedRequest.description}
                    </p>
                  </div>
                )}
                
                <Separator />
                
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                    className="flex-1"
                  >
                    Close
                  </Button>
                  {selectedRequest.status === "active" && (
                    <Button
                      className="flex-1 bg-foodie-green hover:bg-foodie-green-dark"
                      onClick={() => handleFulfillRequest(selectedRequest.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" /> 
                      I Can Help
                    </Button>
                  )}
                </DialogFooter>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FoodRequest;
