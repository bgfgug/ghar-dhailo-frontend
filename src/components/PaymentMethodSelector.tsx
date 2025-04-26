
import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PaymentMethod {
  id: string
  name: string
  description: string
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'cod',
    name: 'Cash on Delivery',
    description: 'Pay when you receive your order'
  }
  // Future payment methods can be added here
]

export function PaymentMethodSelector() {
  const [selectedMethod, setSelectedMethod] = useState('cod')

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
            onClick={() => setSelectedMethod(method.id)}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">{method.name}</h4>
                <p className="text-sm text-gray-500">{method.description}</p>
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
      </div>
    </div>
  )
}
