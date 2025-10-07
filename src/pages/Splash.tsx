
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useAuth } from "@/context/AuthContext"

const Splash = () => {
  const navigate = useNavigate()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    // Don't navigate while auth is still loading
    if (isLoading) return;

    // Check localStorage flags
    const hasSeenOnboarding = localStorage.getItem('onboarding_complete') === 'true';
    
    console.log('=== SPLASH SCREEN DEBUG ===');
    console.log('isAuthenticated:', isAuthenticated);
    console.log('hasSeenOnboarding:', hasSeenOnboarding);
    console.log('onboarding_complete value:', localStorage.getItem('onboarding_complete'));
    
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        // User is logged in - go to home
        console.log('Navigating to: /home (user is authenticated)');
        navigate('/home', { replace: true })
      } else if (hasSeenOnboarding) {
        // User has seen onboarding but not logged in - go to login
        console.log('Navigating to: /auth/login (onboarding already complete)');
        navigate('/auth/login', { replace: true })
      } else {
        // First time user - go to onboarding
        console.log('Navigating to: /onboarding (first-time user)');
        navigate('/onboarding', { replace: true })
      }
    }, 2000) // Reduced to 2 seconds for better UX

    return () => clearTimeout(timer)
  }, [navigate, isAuthenticated, isLoading])

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
