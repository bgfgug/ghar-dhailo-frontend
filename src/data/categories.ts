
import { CircleDashed, BadgeCheck, ShoppingBasket, Utensils, Carrot } from "lucide-react";

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
    image: "/placeholder.svg",
  },
  {
    id: "meals",
    name: "Meals",
    name_np: "खाना",
    icon: Utensils,
    image: "/placeholder.svg",
  },
  {
    id: "groceries",
    name: "Groceries",
    name_np: "किराना",
    icon: ShoppingBasket,
    image: "/placeholder.svg",
  },
  {
    id: "fresh",
    name: "Fresh Produce",
    name_np: "ताजा उत्पादन",
    icon: Carrot,
    image: "/placeholder.svg",
  },
  {
    id: "special",
    name: "Festival Special",
    name_np: "चाड विशेष",
    icon: BadgeCheck,
    image: "/placeholder.svg",
  },
];

export default categories;

