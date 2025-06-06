
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useAuth } from "@/context/AuthContext"

const Splash = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    // Auto-navigate after 3 seconds based on authentication status
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate('/home')
      } else {
        navigate('/onboarding')
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate, isAuthenticated])

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
