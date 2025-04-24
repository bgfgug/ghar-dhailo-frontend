
export interface Festival {
  id: string;
  name: string;
  name_np: string;
  startDate: string; // ISO date
  endDate: string; // ISO date
  description: string;
  description_np: string;
  image: string;
  specialItems: string[];
}

export const festivals: Festival[] = [
  {
    id: "f1",
    name: "Dashain",
    name_np: "दशैं",
    startDate: "2025-10-11",
    endDate: "2025-10-24",
    description: "The biggest festival in Nepal celebrating the victory of good over evil",
    description_np: "नेपालको सबैभन्दा ठूलो चाड जसले राम्रोको बुराई माथि विजयको उत्सव मनाउँछ",
    image: "/placeholder.svg",
    specialItems: ["Sel Roti", "Masu", "Achar", "Sweets"]
  },
  {
    id: "f2",
    name: "Tihar",
    name_np: "तिहार",
    startDate: "2025-11-01",
    endDate: "2025-11-05",
    description: "Festival of lights celebrating the bond between brothers and sisters",
    description_np: "भाइ र बहिनी बीचको सम्बन्धको उत्सव मनाउने प्रकाशको चाड",
    image: "/placeholder.svg",
    specialItems: ["Sel Roti", "Mithai", "Fruits", "Dry Fruits"]
  },
  {
    id: "f3",
    name: "Holi",
    name_np: "होली",
    startDate: "2026-03-02",
    endDate: "2026-03-02",
    description: "Festival of colors celebrating the arrival of spring",
    description_np: "वसन्त ऋतुको आगमनको उत्सव मनाउने रंगहरूको चाड",
    image: "/placeholder.svg",
    specialItems: ["Thandai", "Gujiyas", "Pakoras"]
  }
];

export default festivals;
