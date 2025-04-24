
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Splash = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Auto-navigate to onboarding after 3 seconds
    const timer = setTimeout(() => {
      navigate('/onboarding')
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-500 to-crimson-500 dark:from-saffron-700 dark:to-crimson-700 flex items-center justify-center">
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-white"
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        GharDhaailo
      </motion.h1>
    </div>
  )
}

export default Splash
