import { useNavigate } from 'react-router-dom';

export const useHandleKakaoLogin = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = (isFailure = false) => {
    if (isFailure) {
      navigate('/login');
    } else {
      window.location.href ='url';  // 백엔드 URL로 리다이렉트
    }
  };

  return handleKakaoLogin;
};
