
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Always redirect to splash screen first
    navigate('/splash');
  }, [navigate]);

  return null;
};

export default Index;
