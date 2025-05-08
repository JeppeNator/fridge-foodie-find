
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Refrigerator, ChefHat, MapPin, ShoppingCart } from "lucide-react";
import React from "react";

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout = ({ children, activeTab, onTabChange }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-foodie-green-light/10 to-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Refrigerator className="h-6 w-6 text-foodie-green-dark" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-foodie-green-dark to-foodie-purple text-transparent bg-clip-text">
              Fridge Foodie
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600"
            onClick={() => {}}
          >
            <span className="sr-only">Settings</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-settings"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-4">{children}</main>

      {/* Bottom Navigation */}
      <footer className="sticky bottom-0 z-10 bg-white border-t border-gray-200 shadow-md">
        <div className="container mx-auto px-2">
          <Tabs
            value={activeTab}
            onValueChange={onTabChange}
            className="w-full"
          >
            <TabsList className="w-full grid grid-cols-3 bg-transparent h-16">
              <TabsTrigger
                value="inventory"
                className="data-[state=active]:bg-foodie-green-light/20 data-[state=active]:text-foodie-green flex flex-col items-center justify-center text-xs space-y-1 h-full"
              >
                <Refrigerator className="h-5 w-5" />
                <span>Inventory</span>
              </TabsTrigger>
              <TabsTrigger
                value="recipes"
                className="data-[state=active]:bg-foodie-orange-light/20 data-[state=active]:text-foodie-orange flex flex-col items-center justify-center text-xs space-y-1 h-full"
              >
                <ChefHat className="h-5 w-5" />
                <span>Recept</span>
              </TabsTrigger>
              <TabsTrigger
                value="map"
                className="data-[state=active]:bg-foodie-purple-light/20 data-[state=active]:text-foodie-purple flex flex-col items-center justify-center text-xs space-y-1 h-full"
              >
                <MapPin className="h-5 w-5" />
                <span>Find Food</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
