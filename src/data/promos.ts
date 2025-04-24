
export interface Promo {
  id: string;
  title: string;
  title_np?: string;
  description: string;
  description_np?: string;
  image: string;
  expiry?: string; // ISO date
  code?: string;
  discount?: number; // percentage
  type: 'festival' | 'offer' | 'emergency';
}

export const promos: Promo[] = [
  {
    id: "p1",
    title: "Dashain Special",
    title_np: "दशैं विशेष",
    description: "20% off on all festival essentials",
    description_np: "चाडपर्व सामग्रीमा २०% छुट",
    image: "/placeholder.svg",
    expiry: "2025-10-24",
    code: "DASHAIN20",
    discount: 20,
    type: "festival"
  },
  {
    id: "p2",
    title: "Free Delivery Weekend",
    title_np: "नि:शुल्क डेलिभरी सप्ताहन्त",
    description: "No delivery charges on orders above Rs. 500",
    description_np: "रु ५०० भन्दा माथिको अर्डरमा डेलिभरी शुल्क लाग्दैन",
    image: "/placeholder.svg",
    expiry: "2025-04-30",
    code: "WEEKEND",
    type: "offer"
  },
  {
    id: "p3",
    title: "Power Outage Alert",
    title_np: "विद्युत कटौती सूचना",
    description: "Delivery times may be extended due to scheduled power cuts",
    description_np: "सूचित विद्युत कटौतीका कारण डेलिभरी समयमा ढिलाई हुन सक्छ",
    image: "/placeholder.svg",
    type: "emergency"
  }
];

export default promos;
