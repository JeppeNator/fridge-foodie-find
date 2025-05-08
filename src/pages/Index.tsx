
import { useState } from "react";
import Layout from "../components/Layout";
import FridgeInventory from "../components/FridgeInventory";
import RecipeRecommendations from "../components/RecipeRecommendations";
import FoodMap from "../components/FoodMap";
import FoodRequest from "../components/FoodRequest";

const Index = () => {
  const [activeTab, setActiveTab] = useState("inventory");

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === "inventory" && <FridgeInventory />}
      {activeTab === "recipes" && <RecipeRecommendations />}
      {activeTab === "map" && <FoodMap />}
      {activeTab === "request" && <FoodRequest />}
    </Layout>
  );
};

export default Index;
