
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
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "meals",
    name: "Meals",
    name_np: "खाना",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "groceries",
    name: "Groceries",
    name_np: "किराना",
    icon: ShoppingBasket,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "fresh",
    name: "Fresh Produce",
    name_np: "ताजा उत्पादन",
    icon: Carrot,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "special",
    name: "Festival Special",
    name_np: "चाड विशेष",
    icon: Star,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80",
  },
];

export default categories;
