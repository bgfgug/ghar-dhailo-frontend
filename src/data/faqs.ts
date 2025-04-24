
export interface FAQ {
  id: string;
  question: string;
  question_np?: string;
  answer: string;
  answer_np?: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    id: "faq1",
    question: "What is the minimum order amount?",
    question_np: "न्यूनतम अर्डर रकम कति हो?",
    answer: "The minimum order amount is Rs. 200 for food delivery and Rs. 300 for grocery delivery.",
    answer_np: "खाना डेलिभरीको लागि न्यूनतम अर्डर रकम रु. २०० र किराना डेलिभरीको लागि रु. ३०० हो।",
    category: "orders"
  },
  {
    id: "faq2",
    question: "What are your delivery hours?",
    question_np: "तपाईंको डेलिभरी समय के हो?",
    answer: "We deliver from 8 AM to 9 PM every day. For festival seasons, we offer extended hours until 11 PM.",
    answer_np: "हामी हरेक दिन बिहान ८ बजे देखि बेलुका ९ बजे सम्म डेलिभरी गर्छौं। चाडपर्वको समयमा हामी राती ११ बजे सम्म विस्तारित समय प्रदान गर्छौं।",
    category: "delivery"
  },
  {
    id: "faq3",
    question: "Do you deliver to all areas in Kathmandu?",
    question_np: "के तपाईं काठमाडौंका सबै क्षेत्रहरूमा डेलिभरी गर्नुहुन्छ?",
    answer: "We currently deliver to most areas within Ring Road. Some mountain areas may have limited service.",
    answer_np: "हामी हाल रिङ रोड भित्रका अधिकांश क्षेत्रहरूमा डेलिभरी गर्छौं। केही पहाडी क्षेत्रहरूमा सीमित सेवा हुन सक्छ।",
    category: "delivery"
  },
  {
    id: "faq4",
    question: "How can I pay for my order?",
    question_np: "म मेरो अर्डरको भुक्तानी कसरी गर्न सक्छु?",
    answer: "We accept cash on delivery, Khalti, eSewa, and major credit/debit cards.",
    answer_np: "हामी डेलिभरीमा नगद, खल्ती, ईसेवा र प्रमुख क्रेडिट/डेबिट कार्डहरू स्वीकार गर्छौं।",
    category: "payment"
  },
  {
    id: "faq5",
    question: "Can I cancel my order?",
    question_np: "के म मेरो अर्डर रद्द गर्न सक्छु?",
    answer: "Yes, you can cancel your order within 5 minutes of placing it. After that, cancellation may be subject to charges if preparation has begun.",
    answer_np: "हो, तपाईं अर्डर गरेको ५ मिनेट भित्र आफ्नो अर्डर रद्द गर्न सक्नुहुन्छ। त्यसपछि, यदि तयारी सुरु भएको छ भने रद्द गर्न शुल्क लाग्न सक्छ।",
    category: "orders"
  }
];

export default faqs;
