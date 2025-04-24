
export interface MenuItem {
  id: string;
  name: string;
  name_np?: string;
  description: string;
  description_np?: string;
  price: number;
  image: string;
  vegetarian: boolean;
  spiceLevel: 1 | 2 | 3;
  popular?: boolean;
  category: string;
}

export interface Restaurant {
  id: string;
  name: string;
  name_np?: string;
  cuisine: string[];
  rating: number;
  deliveryTime: number; // minutes
  deliveryFee: number; // rupees
  image: string;
  distance: number; // km
  address: string;
  menu: MenuItem[];
}

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Himalayan Kitchen",
    name_np: "हिमालयन किचन",
    cuisine: ["Newari", "Thakali"],
    rating: 4.7,
    deliveryTime: 25,
    deliveryFee: 80,
    image: "/placeholder.svg",
    distance: 2.5,
    address: "Thamel, Kathmandu",
    menu: [
      {
        id: "m1r1",
        name: "Momo (Chicken)",
        name_np: "मोमो (चिकन)",
        description: "Steamed dumplings filled with minced chicken, onion, and spices",
        description_np: "सानो चिकन पकाएको, प्याज र मरिचहरूले भरिएको",
        price: 180,
        image: "/placeholder.svg",
        vegetarian: false,
        spiceLevel: 2,
        popular: true,
        category: "starters",
      },
      {
        id: "m2r1",
        name: "Momo (Veg)",
        name_np: "मोमो (शाकाहारी)",
        description: "Steamed dumplings filled with mixed vegetables",
        description_np: "मिश्रित तरकारीहरूले भरिएको",
        price: 160,
        image: "/placeholder.svg",
        vegetarian: true,
        spiceLevel: 1,
        category: "starters",
      },
      {
        id: "m3r1",
        name: "Dal Bhat",
        name_np: "दाल भात",
        description: "Traditional Nepali meal with rice, lentil soup, vegetable curry, and pickle",
        description_np: "चामल, दाल, तरकारी र अचार सहितको नेपाली खाना",
        price: 300,
        image: "/placeholder.svg",
        vegetarian: true,
        spiceLevel: 2,
        popular: true,
        category: "mains",
      },
      {
        id: "m4r1",
        name: "Thakali Set",
        name_np: "थकाली सेट",
        description: "Complete meal from Thakali cuisine with rice, dal, meat, vegetables and pickles",
        description_np: "भात, दाल, मासु, तरकारी र अचार सहितको थकाली खाना",
        price: 350,
        image: "/placeholder.svg",
        vegetarian: false,
        spiceLevel: 2,
        category: "mains",
      },
      {
        id: "m5r1",
        name: "Chiya",
        name_np: "चिया",
        description: "Nepali style milk tea",
        description_np: "नेपाली तरिकाको दूध चिया",
        price: 50,
        image: "/placeholder.svg",
        vegetarian: true,
        spiceLevel: 1,
        category: "beverages",
      }
    ]
  },
  {
    id: "r2",
    name: "Taste of Pokhara",
    name_np: "पोखराको स्वाद",
    cuisine: ["Thakali", "Mountain Staples"],
    rating: 4.5,
    deliveryTime: 35,
    deliveryFee: 100,
    image: "/placeholder.svg",
    distance: 3.8,
    address: "Lakeside, Pokhara",
    menu: [
      {
        id: "m1r2",
        name: "Gundruk Soup",
        name_np: "गुन्द्रुक सुप",
        description: "Traditional fermented leafy green soup",
        description_np: "परम्परागत किण्वित हरियो पात सुप",
        price: 120,
        image: "/placeholder.svg",
        vegetarian: true,
        spiceLevel: 2,
        popular: true,
        category: "starters",
      },
      {
        id: "m2r2",
        name: "Sukuti",
        name_np: "सुकुटी",
        description: "Dried meat delicacy with spices",
        description_np: "मसालेदार सुकाइएको मासु",
        price: 250,
        image: "/placeholder.svg",
        vegetarian: false,
        spiceLevel: 3,
        category: "starters",
      },
      {
        id: "m3r2",
        name: "Thakali Thali",
        name_np: "थकाली थाली",
        description: "Complete meal with rice, dal, meat curry, vegetables and pickles",
        description_np: "भात, दाल, मासु तरकारी, तरकारी र अचार सहितको पूर्ण भोजन",
        price: 380,
        image: "/placeholder.svg",
        vegetarian: false,
        spiceLevel: 2,
        popular: true,
        category: "mains",
      }
    ]
  },
  {
    id: "r3",
    name: "Namaste Mithai",
    name_np: "नमस्ते मिठाई",
    cuisine: ["Mithai", "Sweets"],
    rating: 4.8,
    deliveryTime: 20,
    deliveryFee: 60,
    image: "/placeholder.svg",
    distance: 1.2,
    address: "New Road, Kathmandu",
    menu: [
      {
        id: "m1r3",
        name: "Rasbari",
        name_np: "रसबरी",
        description: "Sweet cottage cheese balls soaked in sugar syrup",
        description_np: "चिनीको सिरपमा डुबाएको मीठो पनीर बल",
        price: 50,
        image: "/placeholder.svg",
        vegetarian: true,
        spiceLevel: 1,
        popular: true,
        category: "sweets",
      },
      {
        id: "m2r3",
        name: "Laddu",
        name_np: "लड्डु",
        description: "Sweet ball made with gram flour and sugar",
        description_np: "बेसन र चिनीले बनेको मीठो बल",
        price: 40,
        image: "/placeholder.svg",
        vegetarian: true,
        spiceLevel: 1,
        popular: true,
        category: "sweets",
      }
    ]
  }
];

export default restaurants;
