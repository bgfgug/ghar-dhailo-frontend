
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { MapPin, Package, Truck, Timer, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const OrderTracking = () => {
  const { orderId } = useParams()
  
  // Mock order status - in real app this would come from API
  const currentStep = 2
  const steps = [
    { icon: Package, label: "Order Confirmed", time: "10:30 AM" },
    { icon: Timer, label: "Preparing", time: "10:45 AM" },
    { icon: Truck, label: "Out for Delivery", time: "11:15 AM" },
    { icon: MapPin, label: "Delivered", time: "11:45 AM" }
  ]

  return (
    <div className="min-h-screen bg-background p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Order #{orderId}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isCompleted = index <= currentStep
              const isActive = index === currentStep
              
              return (
                <div key={step.label} className="relative">
                  {index !== 0 && (
                    <div 
                      className={`absolute h-full w-0.5 -top-8 left-[15px] ${
                        isCompleted ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                  <motion.div 
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div 
                      className={`rounded-full p-2 ${
                        isCompleted 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className={`font-medium ${
                        isActive ? "text-primary" : ""
                      }`}>
                        {step.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {step.time}
                      </p>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default OrderTracking
