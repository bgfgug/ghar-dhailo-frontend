
export interface GroceryItem {
  id: string;
  name: string;
  name_np?: string;
  category: string;
  price: number;
  unit: string;
  unitAlt?: string;
  image: string;
  vegetarian: boolean;
  organic?: boolean;
  inStock: boolean;
}

export interface GroceryCategory {
  id: string;
  name: string;
  name_np?: string;
}

export const groceryCategories: GroceryCategory[] = [
  { id: "rice-grains", name: "Rice & Grains", name_np: "चामल र अनाज" },
  { id: "daal", name: "Lentils & Pulses", name_np: "दाल" },
  { id: "spices", name: "Spices & Masalas", name_np: "मसला" },
  { id: "dairy", name: "Dairy & Milk", name_np: "दुग्ध उत्पादन" },
  { id: "vegetables", name: "Fresh Vegetables", name_np: "ताजा तरकारी" },
  { id: "pickles", name: "Pickles & Chutneys", name_np: "अचार र चट्नी" }
];

export const groceries: GroceryItem[] = [
  {
    id: "g1",
    name: "Basmati Rice",
    name_np: "बासमती चामल",
    category: "rice-grains",
    price: 220,
    unit: "kg",
    unitAlt: "mana",
    image: "/placeholder.svg",
    vegetarian: true,
    inStock: true,
  },
  {
    id: "g2",
    name: "Toor Dal",
    name_np: "अरहर दाल",
    category: "daal",
    price: 170,
    unit: "kg",
    unitAlt: "mana",
    image: "/placeholder.svg",
    vegetarian: true,
    inStock: true,
  },
  {
    id: "g3",
    name: "Himalayan Rock Salt",
    name_np: "हिमालयन नुन",
    category: "spices",
    price: 85,
    unit: "pack",
    image: "/placeholder.svg",
    vegetarian: true,
    organic: true,
    inStock: true,
  },
  {
    id: "g4",
    name: "Garam Masala",
    name_np: "गरम मसला",
    category: "spices",
    price: 65,
    unit: "pack",
    image: "/placeholder.svg",
    vegetarian: true,
    inStock: true,
  },
  {
    id: "g5",
    name: "Farm Fresh Milk",
    name_np: "ताजा दूध",
    category: "dairy",
    price: 110,
    unit: "liter",
    image: "/placeholder.svg",
    vegetarian: true,
    organic: true,
    inStock: true,
  },
  {
    id: "g6",
    name: "Himalayan Yak Cheese",
    name_np: "हिमालय याक चीज",
    category: "dairy",
    price: 550,
    unit: "piece",
    image: "/placeholder.svg",
    vegetarian: true,
    inStock: true,
  },
  {
    id: "g7",
    name: "Fresh Potato",
    name_np: "ताजा आलु",
    category: "vegetables",
    price: 60,
    unit: "kg",
    unitAlt: "mana",
    image: "/placeholder.svg",
    vegetarian: true,
    organic: true,
    inStock: true,
  },
  {
    id: "g8",
    name: "Gundruk Pickle",
    name_np: "गुन्द्रुक अचार",
    category: "pickles",
    price: 120,
    unit: "bottle",
    image: "/placeholder.svg",
    vegetarian: true,
    inStock: true,
  },
];

export default groceries;
