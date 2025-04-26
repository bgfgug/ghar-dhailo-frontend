
import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Wallet, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from "@/hooks/use-toast"

interface PaymentMethod {
  id: string
  name: string
  description: string
  icon: 'credit-card' | 'wallet'
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'cod',
    name: 'Cash on Delivery',
    description: 'Pay when you receive your order',
    icon: 'credit-card'
  },
  {
    id: 'esewa',
    name: 'eSewa',
    description: 'Pay securely with your eSewa wallet',
    icon: 'wallet'
  }
]

interface PaymentMethodSelectorProps {
  onMethodChange?: (methodId: string) => void;
  defaultMethod?: string;
}

export function PaymentMethodSelector({ onMethodChange, defaultMethod = 'cod' }: PaymentMethodSelectorProps) {
  const [selectedMethod, setSelectedMethod] = useState(defaultMethod)
  const [isProcessing, setIsProcessing] = useState(false)
  const [esewaPhoneNumber, setEsewaPhoneNumber] = useState('')
  const [showEsewaFields, setShowEsewaFields] = useState(false)

  const getIcon = (iconName: 'credit-card' | 'wallet') => {
    switch (iconName) {
      case 'credit-card':
        return <CreditCard className="h-5 w-5 text-primary" />
      case 'wallet':
        return <Wallet className="h-5 w-5 text-primary" />
    }
  }

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId)
    if (methodId === 'esewa') {
      setShowEsewaFields(true)
    } else {
      setShowEsewaFields(false)
    }
    if (onMethodChange) {
      onMethodChange(methodId)
    }
  }

  const handleEsewaMockPay = () => {
    if (!esewaPhoneNumber) {
      toast({
        title: "eSewa Phone Required",
        description: "Please enter your eSewa registered phone number.",
        variant: "destructive"
      })
      return
    }

    if (!/^(98|97)\d{8}$/.test(esewaPhoneNumber)) {
      toast({
        title: "Invalid Phone Format",
        description: "Please enter a valid Nepali phone number (e.g., 98XXXXXXXX).",
        variant: "destructive"
      })
      return
    }

    setIsProcessing(true)
    
    // Mock API call to eSewa
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "eSewa Payment Ready",
        description: "Your payment method has been configured. You can place your order now.",
      })
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Payment Method</h3>
      <div className="grid gap-4">
        {paymentMethods.map((method) => (
          <motion.div
            key={method.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              borderColor: selectedMethod === method.id ? '#8B5CF6' : '#E5E7EB'
            }}
            className={`relative rounded-lg border-2 p-4 cursor-pointer
              ${selectedMethod === method.id ? 'border-primary bg-primary/5' : 'border-gray-200'}
            `}
            onClick={() => handleMethodSelect(method.id)}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                {getIcon(method.icon)}
              </div>
              <div>
                <h4 className="font-medium">{method.name}</h4>
                <p className="text-sm text-gray-500">{method.description}</p>
                {method.id === 'esewa' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-2 flex items-center gap-2"
                  >
                    <div className="h-4 w-8 bg-[#60BB46] rounded"></div>
                    <span className="text-xs text-gray-500">Secured by eSewa</span>
                  </motion.div>
                )}
              </div>
              <motion.div
                className="ml-auto h-5 w-5 rounded-full border-2 border-gray-300"
                animate={{
                  backgroundColor: selectedMethod === method.id ? '#8B5CF6' : 'transparent',
                  borderColor: selectedMethod === method.id ? '#8B5CF6' : '#D1D5DB'
                }}
              >
                {selectedMethod === method.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="h-full w-full rounded-full bg-white p-1"
                  />
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}

        {/* eSewa Details Section */}
        {selectedMethod === 'esewa' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gray-50 rounded-lg p-4 overflow-hidden"
          >
            <h4 className="font-medium mb-3">eSewa Payment Details</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  eSewa Mobile Number
                </label>
                <input
                  type="tel"
                  value={esewaPhoneNumber}
                  onChange={(e) => setEsewaPhoneNumber(e.target.value)}
                  placeholder="98XXXXXXXX"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-gray-500 mt-1">Enter your eSewa registered mobile number</p>
              </div>

              <Button 
                onClick={handleEsewaMockPay}
                disabled={isProcessing}
                className="w-full bg-[#60BB46] hover:bg-[#4a9e34] text-white"
              >
                {isProcessing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : "Link eSewa Account"}
              </Button>
              
              <p className="text-xs text-center text-gray-500">
                Your actual eSewa account will not be charged until the backend integration is complete. 
                This is only a UI demonstration.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
