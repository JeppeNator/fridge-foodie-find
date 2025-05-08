
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
  difficulty: "Lätt" | "Medel" | "Svår";
  rating: number;
  instructions: string[];
  category: string;
}

// Sample data
const sampleRecipes: Recipe[] = [
  {
    id: "1",
    name: "Spenat med äggsallad", 
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
    prepTime: 15,
    ingredients: [
      "2 Ägg", 
      "100g Spenat", 
      "1 Tomater", 
      "Salt och peppar", 
      "1 Matsked olivolja"
    ],
    matchedIngredients: ["Ägg", "Spenat", "Tomater"],
    missingIngredients: ["Olivolja"],
    difficulty: "Svår",
    rating: 4.5,
    instructions: [
     "Hetta upp olja i en stekpanna på medelvärme.",
"Tillsätt spenaten och stek tills den mjuknat, cirka 2 minuter.",
"Lägg spenaten åt sidan och knäck äggen i pannan.",
"Stek äggen efter egen smak.",
"Krydda med salt och peppar.",
"Skiva tomaterna och lägg dem i skålen.",
"Servera varmt."
    ],
    category: "Frukost",
  },
  {
    id: "2",
    name: "Stekt kyckling med grönsaker",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19",
    prepTime: 25,
    ingredients: [
      "200g Kycklingbröst",
      "100g Spenat",
      "1 Tomater",
      "1 Lök",
      "2 Vitlöksklyftor",
      "1 Matsked sojasås",
      "2 Matskedar grönsaksfond"
    ],
    matchedIngredients: ["Kycklingbröst", "Spenat", "Tomat"],
    missingIngredients: ["Lök", "Vitlök", "Sojasås"],
    difficulty: "Medel",
    rating: 4.2,
    instructions: [
     "Skär kycklingen i tunna strimlor.",
"Hetta upp olja i en wok eller stor stekpanna på hög värme.",
"Tillsätt kycklingen och stek tills den inte längre är rosa, cirka 5–7 minuter.",
"Ta upp kycklingen och lägg åt sidan.",
"Tillsätt vitlök och lök i pannan och stek i 1–2 minuter.",
"Tillsätt grönsakerna och woka i 3–4 minuter.",
"Lägg tillbaka kycklingen i pannan och tillsätt sojasås.",
"Blanda väl och låt steka ytterligare 1–2 minuter.",
"Servera varmt."
    ],
    category: "Middag",
  },
  {
    id: "3",
    name: "Krämig tomat och spenat pasta", 
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8",
    prepTime: 20,
    ingredients: [
      "200g Pasta",
      "100g Spenat",
      "2 Tomater",
      "100ml Grädde",
      "1 Lök",
      "2 Vitlöksklyftor",
      "50g Parmesanost",
      "Salt och Peppar"
    ],
    matchedIngredients: ["Spenat", "Tomater"],
    missingIngredients: ["Pasta", "Grädde", "Lök", "Vitlök", "Parmesanost"],
    difficulty: "Svår",
    rating: 4.7,
    instructions: [
"Koka pastan enligt anvisningarna på förpackningen.",
"Fräs lök och vitlök i en separat stekpanna tills de mjuknat.",
"Tillsätt hackade tomater och koka i 5 minuter.",
"Tillsätt spenat och låt den mjukna.",
"Häll i grädde och låt sjuda i 3–4 minuter.",
"Tillsätt den avrunna pastan i såsen och blanda väl.",
"Krydda med salt och peppar.",
"Servera med riven parmesanost på toppen."

    ],
    category: "Middag",
  },
  {
    id: "4",
    name: "Frukostägg med toast",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8",
    prepTime: 25,
    ingredients: [
      "6 Ägg",
      "50g Spenat",
      "1 Tomater",
      "50g Ost",
      "Salt och Peppar"
    ],
    matchedIngredients: ["Ägg", "Spenat", "Tomater"],
    missingIngredients: ["Ost"],
    difficulty: "Lätt",
    rating: 4.3,
    instructions: [
      "Förvärm ugnen till 190°C.",
      "Smörj en muffinsform.",
      "Hacka spenat och tomater.",
      "Vispa ägg i en skål med salt och peppar.",
      "Blanda i hackade grönsaker och ost.",
      "Häll blandningen i muffinsformen.",
      "Grädda i 15-20 minuter tills dem stelnat.",
      "Låt svalna i några minuter innan du tar ut den ur formen."
    ],
    category: "Frukost",
  },
  {
    id: "5",
    name: "Kycklingsallad",
    image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40",
    prepTime: 15,
    ingredients: [
      "200g Kycklingbröst",
      "100g Spenat",
      "1 Tomat",
      "1/2 Gurka",
      "Olivolja",
      "Salt och peppar"
    ],
    matchedIngredients: ["Kycklingbröst", "Spenat", "Tomat"],
    missingIngredients: ["Gurka", "Olivolja"],
    difficulty: "Lätt",
    rating: 4.0,
    instructions: [
      "Tillaga kycklingbröst och låt det svalna.",
      "Skär kycklingen i strimlor.",
      "Tvätta och torka spenatbladen.",
      "Skär tomater och gurka.",
      "Arrangera alla ingredienser på en tallrik.",
      "Ringla över olivolja och balsamvinäger.",
      "Smaksätt med salt och peppar efter smak."
    ],
    category: "Sallad",
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
          <h1 className="foodie-heading">Recept</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Sök recept..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-200 rounded-full text-sm w-full max-w-[200px] focus:outline-none focus:ring-2 focus:ring-foodie-orange"
          />
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Här är rekommenderade recept baserat på dina råvaror
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
                    <span>{recipe.prepTime} min</span>
                    <span className="mx-1">•</span>
                    <Badge variant="outline" className="text-xs py-0 h-5">
                      {recipe.difficulty}
                    </Badge>
                  </div>

                  <div className="mt-2">
                    <div className="flex items-center gap-1">
                      <div style={{width: "70%"}} className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-foodie-green h-1.5 rounded-full"
                          style={{
                            width: `${(recipe.matchedIngredients.length / recipe.ingredients.length) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {Math.round((recipe.matchedIngredients.length / recipe.ingredients.length) * 100)}% träff
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
                        {selectedRecipe.prepTime} min
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4 text-foodie-green" />
                      Ingredienser du redan har
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
                        Ingredienser du behöver:
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
                      Ingredienser
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
                      Instruktioner
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
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecipeRecommendations;
