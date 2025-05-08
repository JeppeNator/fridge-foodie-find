
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Refrigerator,
  Plus,
  Edit,
  Trash2,
  Search,
  Calendar,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Types
interface FridgeItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate: string;
}

interface CategoryIcon {
  [key: string]: JSX.Element;
}

// Initial Data
const initialItems: FridgeItem[] = [
  {
    id: "1",
    name: "Milk",
    category: "Dairy",
    quantity: 1,
    unit: "liter",
    expiryDate: "2023-06-01",
  },
  {
    id: "2",
    name: "Chicken Breast",
    category: "Meat",
    quantity: 500,
    unit: "g",
    expiryDate: "2023-05-28",
  },
  {
    id: "3",
    name: "Spinach",
    category: "Vegetables",
    quantity: 200,
    unit: "g",
    expiryDate: "2023-05-25",
  },
  {
    id: "4",
    name: "Eggs",
    category: "Dairy",
    quantity: 6,
    unit: "pcs",
    expiryDate: "2023-06-10",
  },
  {
    id: "5",
    name: "Tomatoes",
    category: "Vegetables",
    quantity: 4,
    unit: "pcs",
    expiryDate: "2023-05-30",
  },
];

const categories = ["Dairy", "Meat", "Vegetables", "Fruits", "Grains", "Other"];
const units = ["g", "kg", "ml", "liter", "pcs", "tbsp", "tsp", "cup"];

const categoryIcons: CategoryIcon = {
  Dairy: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-milk"
    >
      <path d="M8 2h8" />
      <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2" />
      <path d="M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0" />
    </svg>
  ),
  Meat: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-utensils"
    >
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  ),
  Vegetables: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-carrot"
    >
      <path d="M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0 0-6.36 4.5 4.5 0 0 0-6.36 0C5.77 11.84 2.27 21.7 2.27 21.7zM8.64 14l-2.05-2.04M15.34 15l-2.46-2.46" />
      <path d="M18 3s-1.76 1.1-2.33 1.66-1 2.04 0 3.05a2.15 2.15 0 0 0 3.05 0c.57-.56 1.66-2.33 1.66-2.33" />
    </svg>
  ),
  Fruits: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-fruit"
    >
      <path d="M10 14a7 7 0 0 0-7-7" />
      <path d="M17 11a7 7 0 0 0-7-7" />
      <path d="M4 21a4 4 0 0 1 8 0" />
      <path d="M12 21a4 4 0 0 1 8 0" />
      <path d="M19.8 17A4 4 0 0 0 22 13.5a4.3 4.3 0 0 0-3-4 4.2 4.2 0 0 0-3 4 4 4 0 0 0 .8 2.5" />
      <path d="M7.8 17A4 4 0 0 0 10 13.5a4.2 4.2 0 0 0-3-4 4.2 4.2 0 0 0-3 4 4 4 0 0 0 .8 2.5" />
      <path d="M13.8 17a4 4 0 0 0 2.2-3.5 4.2 4.2 0 0 0-3-4 4.2 4.2 0 0 0-3 4 4 4 0 0 0 .8 2.5" />
    </svg>
  ),
  Grains: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-wheat"
    >
      <path d="M2 22 16 8" />
      <path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
      <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
      <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
      <path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" />
      <path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L8 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" />
      <path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L12 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" />
      <path d="M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L16 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" />
    </svg>
  ),
  Other: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
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
  ),
};

function getCategoryColor(category: string): string {
  switch (category) {
    case "Dairy":
      return "bg-blue-100 text-blue-800";
    case "Meat":
      return "bg-red-100 text-red-800";
    case "Vegetables":
      return "bg-green-100 text-green-800";
    case "Fruits":
      return "bg-yellow-100 text-yellow-800";
    case "Grains":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

const FridgeInventory = () => {
  const [items, setItems] = useState<FridgeItem[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<FridgeItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<FridgeItem>>({
    name: "",
    category: "Other",
    quantity: 1,
    unit: "pcs",
    expiryDate: new Date().toISOString().split("T")[0],
  });

  const { toast } = useToast();

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group items by category
  const groupedItems = filteredItems.reduce<{ [key: string]: FridgeItem[] }>(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {}
  );

  const handleAddOrUpdateItem = () => {
    if (!newItem.name || !newItem.category || !newItem.quantity || !newItem.unit) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (editItem) {
      // Update existing item
      setItems(
        items.map((item) =>
          item.id === editItem.id
            ? {
                ...item,
                name: newItem.name || item.name,
                category: newItem.category || item.category,
                quantity: newItem.quantity || item.quantity,
                unit: newItem.unit || item.unit,
                expiryDate: newItem.expiryDate || item.expiryDate,
              }
            : item
        )
      );
      toast({
        title: "Item updated",
        description: `${newItem.name} has been updated in your fridge`,
      });
    } else {
      // Add new item
      const newId = Math.random().toString(36).substr(2, 9);
      setItems([
        ...items,
        {
          id: newId,
          name: newItem.name || "",
          category: newItem.category || "Other",
          quantity: newItem.quantity || 1,
          unit: newItem.unit || "pcs",
          expiryDate: newItem.expiryDate || new Date().toISOString().split("T")[0],
        },
      ]);
      toast({
        title: "Item added",
        description: `${newItem.name} has been added to your fridge`,
      });
    }

    // Reset form and close dialog
    setNewItem({
      name: "",
      category: "Other",
      quantity: 1,
      unit: "pcs",
      expiryDate: new Date().toISOString().split("T")[0],
    });
    setEditItem(null);
    setDialogOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    const itemToDelete = items.find((item) => item.id === id);
    setItems(items.filter((item) => item.id !== id));
    toast({
      title: "Item removed",
      description: `${itemToDelete?.name} has been removed from your fridge`,
    });
  };

  const handleEditClick = (item: FridgeItem) => {
    setEditItem(item);
    setNewItem({
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      expiryDate: item.expiryDate,
    });
    setDialogOpen(true);
  };

  const handleAddNewClick = () => {
    setEditItem(null);
    setNewItem({
      name: "",
      category: "Other",
      quantity: 1,
      unit: "pcs",
      expiryDate: new Date().toISOString().split("T")[0],
    });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Refrigerator className="w-6 h-6 text-foodie-green" />
        <h1 className="foodie-heading">My Fridge</h1>
      </div>

      {/* Search and Add Button */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button
          onClick={handleAddNewClick}
          size="icon"
          className="bg-foodie-green hover:bg-foodie-green-dark"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {/* No Items State */}
      {filteredItems.length === 0 && (
        <div className="foodie-card p-6 text-center">
          <div className="flex justify-center mb-4">
            <Refrigerator className="h-12 w-12 text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Your fridge is empty
          </h3>
          <p className="text-gray-500 mb-4">
            Add items to your fridge to see them here
          </p>
          <Button
            onClick={handleAddNewClick}
            className="bg-foodie-green hover:bg-foodie-green-dark"
          >
            Add Item
          </Button>
        </div>
      )}

      {/* Grouped Items */}
      {Object.keys(groupedItems).map((category) => (
        <div key={category} className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">{categoryIcons[category]}</span>
            <h3 className="foodie-subheading">{category}</h3>
          </div>
          <div className="space-y-2">
            {groupedItems[category].map((item) => (
              <Card key={item.id} className="p-3 flex justify-between items-center">
                <div className="flex flex-col">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <span>
                      {item.quantity} {item.unit}
                    </span>
                    <span className="mx-1">•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(item.expiryDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEditClick(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <Separator className="my-2" />
        </div>
      ))}

      {/* Add/Edit Item Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editItem ? "Edit Item" : "Add New Item"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Item Name
              </label>
              <Input
                id="name"
                placeholder="Enter item name"
                value={newItem.name || ""}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <Select
                  value={newItem.category}
                  onValueChange={(value) =>
                    setNewItem({ ...newItem, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">
                            {categoryIcons[category]}
                          </span>
                          <span>{category}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <label htmlFor="expiry" className="text-sm font-medium">
                  Expiry Date
                </label>
                <Input
                  id="expiry"
                  type="date"
                  value={newItem.expiryDate || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, expiryDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="quantity" className="text-sm font-medium">
                  Quantity
                </label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  step="0.1"
                  value={newItem.quantity || ""}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      quantity: parseFloat(e.target.value),
                    })
                  }
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="unit" className="text-sm font-medium">
                  Unit
                </label>
                <Select
                  value={newItem.unit}
                  onValueChange={(value) =>
                    setNewItem({ ...newItem, unit: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDialogOpen(false);
                setEditItem(null);
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-foodie-green hover:bg-foodie-green-dark"
              onClick={handleAddOrUpdateItem}
            >
              {editItem ? "Update Item" : "Add Item"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FridgeInventory;
