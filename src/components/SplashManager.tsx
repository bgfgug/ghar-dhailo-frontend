
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface SplashManagerProps {
  children: React.ReactNode;
}

const SplashManager = ({ children }: SplashManagerProps) => {
  const [showSplash, setShowSplash] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeApp = async () => {
      // Check if this is the first time opening the app
      const hasSeenSplash = localStorage.getItem('has_seen_splash');
      const onboardingComplete = localStorage.getItem('onboarding_complete');
      
      if (!hasSeenSplash) {
        // Show splash for 3 seconds on first visit
        setTimeout(() => {
          localStorage.setItem('has_seen_splash', 'true');
          setShowSplash(false);
          
          // Navigate based on app state
          if (!onboardingComplete) {
            navigate('/onboarding');
          } else if (!isAuthenticated) {
            navigate('/auth/login');
          } else {
            navigate('/home');
          }
          setIsInitialized(true);
        }, 3000);
      } else {
        // Skip splash on subsequent visits
        setShowSplash(false);
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, [navigate, isAuthenticated]);

  if (showSplash) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-saffron-500 to-crimson-500 dark:from-saffron-700 dark:to-crimson-700 flex items-center justify-center">
        <div className="text-4xl md:text-6xl font-bold text-white animate-pulse">
          GharDhaailo
        </div>
      </div>
    );
  }

  return isInitialized ? <>{children}</> : null;
};

export default SplashManager;
