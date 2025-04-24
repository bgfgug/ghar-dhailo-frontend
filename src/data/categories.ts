
import { Utensils, ShoppingBasket, Carrot, CircleDashed, Star } from "lucide-react";

interface Category {
  id: string;
  name: string;
  name_np: string;
  icon: any;
  image: string;
}

export const categories: Category[] = [
  {
    id: "all",
    name: "All",
    name_np: "सबै",
    icon: CircleDashed,
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "meals",
    name: "Meals",
    name_np: "खाना",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "groceries",
    name: "Groceries",
    name_np: "किराना",
    icon: ShoppingBasket,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "fresh",
    name: "Fresh Produce",
    name_np: "ताजा उत्पादन",
    icon: Carrot,
    image: "https://images.unsplash.com/photo-1467453678174-768ec283a940?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "special",
    name: "Festival Special",
    name_np: "चाड विशेष",
    icon: Star,
    image: "https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?auto=format&fit=crop&w=2000&q=80",
  },
];

export default categories;
