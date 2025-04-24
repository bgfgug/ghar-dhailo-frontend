
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { ChevronRight, ChevronLeft } from "lucide-react"

interface Slide {
  title: string;
  description: string;
  image: string;
}

const slides: Slide[] = [
  {
    title: "Delicious Food Delivery",
    description: "Get your favorite local dishes delivered to your doorstep",
    image: "/food-delivery.jpg",
  },
  {
    title: "Fresh Groceries",
    description: "Shop for fresh produce and daily essentials",
    image: "/groceries.jpg",
  },
  {
    title: "Fast Delivery",
    description: "Quick and reliable delivery across the city",
    image: "/delivery.jpg",
  },
]

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      navigate('/auth/login')
    } else {
      setCurrentSlide(prev => prev + 1)
    }
  }

  const previousSlide = () => {
    setCurrentSlide(prev => Math.max(0, prev - 1))
  }

  const skipOnboarding = () => {
    navigate('/auth/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute top-4 right-4">
        <Button variant="ghost" onClick={skipOnboarding}>Skip</Button>
      </div>

      <div className="h-screen flex flex-col items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="text-center max-w-md"
          >
            <img 
              src={slides[currentSlide].image} 
              alt={slides[currentSlide].title}
              className="w-full h-64 object-cover rounded-lg mb-8"
            />
            <h2 className="text-2xl font-bold mb-4">{slides[currentSlide].title}</h2>
            <p className="text-muted-foreground mb-8">{slides[currentSlide].description}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentSlide ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-4">
          {currentSlide > 0 && (
            <Button onClick={previousSlide} variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
          )}
          <Button onClick={nextSlide}>
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
