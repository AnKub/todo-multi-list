import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LocationWrapper = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.className = ''; // Сброс классов
      if (location.pathname === '/') {
        body.classList.add('registration-page');
      }
    }
  }, [location]);

  return children;
};

export default LocationWrapper;
