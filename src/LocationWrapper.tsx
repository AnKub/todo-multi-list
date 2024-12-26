import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ReactNode} from 'react';

interface LocationWrapperProps {
  children: ReactNode; // Додаємо тип для children
}

const LocationWrapper = ({ children }: LocationWrapperProps) => {
  const location = useLocation();

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      const currentClass = body.className;
      if (location.pathname === '/' && !currentClass.includes('registration-page')) {
        body.className = 'registration-page';
      } else if (location.pathname !== '/' && currentClass.includes('registration-page')) {
        body.classList.remove('registration-page');
      }
    }
  }, [location]);

  return <React.Fragment>{children}</React.Fragment>; // Використовуємо явно React.Fragment
};

export default LocationWrapper;
