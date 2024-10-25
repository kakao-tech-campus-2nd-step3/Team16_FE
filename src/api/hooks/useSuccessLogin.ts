import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSuccessLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getCookieValue = (name: string): string | undefined => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };

    const deleteCookie = (name: string) => {
      document.cookie = `${name}=; Max-Age=0; path=/;`;
    };

    const accessToken = getCookieValue('accessToken');

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      deleteCookie('accessToken');
      navigate('/');
    } else {
      navigate('/failure');
    }
  }, [navigate]);
};
