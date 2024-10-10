import { useNavigate } from 'react-router-dom';

export const useHandleKakaoLogin = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = (isFailure = false) => {
    if (isFailure) {
      navigate('/login');
    } else {
      window.location.href ='url';  //추후 수정
    }
  };

  return handleKakaoLogin;
};
