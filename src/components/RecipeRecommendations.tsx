
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChefHat,
  Clock,
  Utensils,
  BookOpen,
  ThumbsUp,
  Search,
  Star,
} from "lucide-react";

// Types
interface Recipe {
  id: string;
  name: string;
  image: string;
  prepTime: number;
  ingredients: string[];
  matchedIngredients: string[];
  missingIngredients: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  rating: number;
  instructions: string[];
  category: string;
}

// Sample data
const sampleRecipes: Recipe[] = [
  {
    id: "1",
    name: "Spinach and Egg Breakfast Bowl",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
    prepTime: 15,
    ingredients: [
      "2 eggs", 
      "100g spinach", 
      "1 tomato", 
      "Salt and pepper", 
      "1 tbsp olive oil"
    ],
    matchedIngredients: ["Eggs", "Spinach", "Tomatoes"],
    missingIngredients: ["Olive oil"],
    difficulty: "Easy",
    rating: 4.5,
    instructions: [
      "Heat oil in a pan over medium heat.",
      "Add spinach and cook until wilted, about 2 minutes.",
      "Push spinach to the side and crack eggs into the pan.",
      "Cook eggs to your preference.",
      "Season with salt and pepper.",
      "Slice tomatoes and add to the bowl.",
      "Serve hot."
    ],
    category: "Breakfast",
  },
  {
    id: "2",
    name: "Chicken and Vegetable Stir Fry",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19",
    prepTime: 25,
    ingredients: [
      "200g chicken breast",
      "100g spinach",
      "1 tomato",
      "1 onion",
      "2 cloves garlic",
      "Soy sauce",
      "2 tbsp vegetable oil"
    ],
    matchedIngredients: ["Chicken Breast", "Spinach", "Tomatoes"],
    missingIngredients: ["Onion", "Garlic", "Soy sauce"],
    difficulty: "Medium",
    rating: 4.2,
    instructions: [
      "Cut chicken into thin strips.",
      "Heat oil in a wok or large pan over high heat.",
      "Add chicken and cook until no longer pink, about 5-7 minutes.",
      "Remove chicken and set aside.",
      "Add garlic and onions to the pan and cook for 1-2 minutes.",
      "Add vegetables and stir-fry for 3-4 minutes.",
      "Return chicken to the pan and add soy sauce.",
      "Stir well and cook for another 1-2 minutes.",
      "Serve hot."
    ],
    category: "Main Course",
  },
  {
    id: "3",
    name: "Creamy Tomato and Spinach Pasta",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8",
    prepTime: 20,
    ingredients: [
      "200g pasta",
      "100g spinach",
      "2 tomatoes",
      "100ml cream",
      "1 onion",
      "2 cloves garlic",
      "Parmesan cheese",
      "Salt and pepper"
    ],
    matchedIngredients: ["Spinach", "Tomatoes"],
    missingIngredients: ["Pasta", "Cream", "Onion", "Garlic", "Parmesan cheese"],
    difficulty: "Easy",
    rating: 4.7,
    instructions: [
      "Cook pasta according to package instructions.",
      "In a separate pan, sauté onions and garlic until soft.",
      "Add chopped tomatoes and cook for 5 minutes.",
      "Add spinach and cook until wilted.",
      "Pour in cream and simmer for 3-4 minutes.",
      "Add drained pasta to the sauce and mix well.",
      "Season with salt and pepper.",
      "Serve with grated Parmesan cheese on top."
    ],
    category: "Main Course",
  },
  {
    id: "4",
    name: "Quick Breakfast Egg Muffins",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8",
    prepTime: 25,
    ingredients: [
      "6 eggs",
      "50g spinach",
      "1 tomato",
      "50g cheese",
      "Salt and pepper"
    ],
    matchedIngredients: ["Eggs", "Spinach", "Tomatoes"],
    missingIngredients: ["Cheese"],
    difficulty: "Easy",
    rating: 4.3,
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "Grease a muffin tin.",
      "Chop spinach and tomatoes.",
      "Beat eggs in a bowl with salt and pepper.",
      "Mix in chopped vegetables and cheese.",
      "Pour mixture into muffin tin.",
      "Bake for 15-20 minutes until set.",
      "Let cool for a few minutes before removing from tin."
    ],
    category: "Breakfast",
  },
  {
    id: "5",
    name: "Simple Chicken Salad",
    image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40",
    prepTime: 15,
    ingredients: [
      "200g chicken breast",
      "100g spinach",
      "1 tomato",
      "1/2 cucumber",
      "Olive oil",
      "Balsamic vinegar",
      "Salt and pepper"
    ],
    matchedIngredients: ["Chicken Breast", "Spinach", "Tomatoes"],
    missingIngredients: ["Cucumber", "Olive oil", "Balsamic vinegar"],
    difficulty: "Easy",
    rating: 4.0,
    instructions: [
      "Cook chicken breast and let it cool.",
      "Slice chicken into strips.",
      "Wash and dry spinach leaves.",
      "Slice tomatoes and cucumber.",
      "Arrange all ingredients on a plate.",
      "Drizzle with olive oil and balsamic vinegar.",
      "Season with salt and pepper to taste."
    ],
    category: "Salad",
  }
];

const RecipeRecommendations = () => {
  const [activeTab, setActiveTab] = useState("recommendations");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const openRecipeDetail = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setDialogOpen(true);
  };

  const filteredRecipes = sampleRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(sampleRecipes.map(recipe => recipe.category)));

  // Filter recipes by category
  const getRecipesByCategory = (category: string) => {
    return filteredRecipes.filter(recipe => recipe.category === category);
  };

  // Sort recipes by match percentage (based on matched ingredients)
  const sortedRecipes = [...filteredRecipes].sort((a, b) => 
    b.matchedIngredients.length / b.ingredients.length - 
    a.matchedIngredients.length / a.ingredients.length
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ChefHat className="w-6 h-6 text-foodie-orange" />
          <h1 className="foodie-heading">Recipe Ideas</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-200 rounded-full text-sm w-full max-w-[200px] focus:outline-none focus:ring-2 focus:ring-foodie-orange"
          />
        </div>
      </div>

      <Tabs defaultValue="recommendations" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="recommendations" className="data-[state=active]:bg-foodie-orange-light/20 data-[state=active]:text-foodie-orange">
            For You
          </TabsTrigger>
          <TabsTrigger value="all" className="data-[state=active]:bg-foodie-green-light/20 data-[state=active]:text-foodie-green">
            All Recipes
          </TabsTrigger>
          <TabsTrigger value="categories" className="data-[state=active]:bg-foodie-purple-light/20 data-[state=active]:text-foodie-purple">
            Categories
          </TabsTrigger>
        </TabsList>
        
        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Based on what's in your fridge, we recommend these recipes:
          </p>
          
          {sortedRecipes.length > 0 ? (
            <div className="grid gap-4">
              {sortedRecipes.slice(0, 4).map((recipe) => (
                <Card
                  key={recipe.id}
                  className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => openRecipeDetail(recipe)}
                >
                  <div className="flex h-24">
                    <div
                      className="w-24 bg-cover bg-center"
                      style={{ backgroundImage: `url(${recipe.image})` }}
                    ></div>
                    <div className="flex-1 p-3">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-800 line-clamp-1">
                          {recipe.name}
                        </h3>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                          <span className="text-xs">{recipe.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <Clock className="h-3 w-3" />
                        <span>{recipe.prepTime} mins</span>
                        <span className="mx-1">•</span>
                        <Badge variant="outline" className="text-xs py-0 h-5">
                          {recipe.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="mt-2">
                        <div className="flex items-center gap-1">
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-foodie-green h-1.5 rounded-full"
                              style={{
                                width: `${(recipe.matchedIngredients.length / recipe.ingredients.length) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {Math.round((recipe.matchedIngredients.length / recipe.ingredients.length) * 100)}% match
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <ChefHat className="h-12 w-12 text-gray-300 mx-auto mb-2" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">
                No matching recipes found
              </h3>
              <p className="text-gray-500 text-sm">
                Try adding more items to your inventory
              </p>
            </div>
          )}
        </TabsContent>
        
        {/* All Recipes Tab */}
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => openRecipeDetail(recipe)}
              >
                <div className="flex h-24">
                  <div
                    className="w-24 bg-cover bg-center"
                    style={{ backgroundImage: `url(${recipe.image})` }}
                  ></div>
                  <div className="flex-1 p-3">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-800 line-clamp-1">
                        {recipe.name}
                      </h3>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                        <span className="text-xs">{recipe.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Clock className="h-3 w-3" />
                      <span>{recipe.prepTime} mins</span>
                      <span className="mx-1">•</span>
                      <Badge variant="outline" className="text-xs py-0 h-5">
                        {recipe.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="mt-2">
                      <Badge
                        variant="secondary"
                        className="text-xs bg-gray-100 hover:bg-gray-100"
                      >
                        {recipe.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          {categories.map((category) => (
            <div key={category} className="space-y-3">
              <h3 className="text-lg font-medium text-gray-700">{category}</h3>
              <div className="grid gap-3">
                {getRecipesByCategory(category).map((recipe) => (
                  <Card
                    key={recipe.id}
                    className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => openRecipeDetail(recipe)}
                  >
                    <div className="flex h-20">
                      <div
                        className="w-20 bg-cover bg-center"
                        style={{ backgroundImage: `url(${recipe.image})` }}
                      ></div>
                      <div className="flex-1 p-3">
                        <h3 className="font-medium text-gray-800 line-clamp-1">
                          {recipe.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <Clock className="h-3 w-3" />
                          <span>{recipe.prepTime} mins</span>
                          <span className="mx-1">•</span>
                          <div className="flex items-center gap-0.5 text-amber-500">
                            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                            <span>{recipe.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>

      {/* Recipe Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-xl max-h-[85vh] sm:max-h-[85vh]">
          {selectedRecipe && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedRecipe.name}</DialogTitle>
              </DialogHeader>
              <ScrollArea className="pr-4 max-h-[calc(85vh-120px)]">
                <div className="space-y-4 pb-4">
                  <div
                    className="w-full h-48 bg-cover bg-center rounded-md"
                    style={{ backgroundImage: `url(${selectedRecipe.image})` }}
                  ></div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-foodie-orange text-white hover:bg-foodie-orange-dark">
                        {selectedRecipe.category}
                      </Badge>
                      <Badge variant="outline" className="text-sm">
                        {selectedRecipe.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {selectedRecipe.prepTime} mins
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4 text-foodie-green" />
                      Ingredients you have
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedRecipe.matchedIngredients.map((ingredient) => (
                        <Badge key={ingredient} variant="secondary" className="bg-foodie-green-light/20 text-foodie-green-dark border-foodie-green-light">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                    
                    {selectedRecipe.missingIngredients.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-sm font-semibold mb-2">
                          Need to get:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedRecipe.missingIngredients.map((ingredient) => (
                            <Badge key={ingredient} variant="outline" className="border-gray-300 text-gray-600">
                              {ingredient}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-1">
                      <Utensils className="h-4 w-4 text-foodie-orange" /> 
                      Ingredients
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedRecipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="text-gray-700">
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-foodie-purple" />
                      Instructions
                    </h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      {selectedRecipe.instructions.map((step, index) => (
                        <li key={index} className="text-gray-700">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </ScrollArea>
              <div className="flex justify-end">
                <Button onClick={() => setDialogOpen(false)} variant="outline">
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecipeRecommendations;
