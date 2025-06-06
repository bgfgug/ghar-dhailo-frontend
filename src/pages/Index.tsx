
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Redirect based on authentication status
    if (isAuthenticated) {
      navigate('/home');
    } else {
      navigate('/onboarding');
    }
  }, [navigate, isAuthenticated]);

  return null;
};

export default Index;
