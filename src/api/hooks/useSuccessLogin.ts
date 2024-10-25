import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteCookie, getCookieValue } from 'src/utils/cookie';

export const useSuccessLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
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
