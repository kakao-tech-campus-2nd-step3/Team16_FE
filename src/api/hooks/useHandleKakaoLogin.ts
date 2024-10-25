import { useNavigate } from 'react-router-dom';

export const useHandleKakaoLogin = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = (isFailure = false) => {
    if (isFailure) {
      navigate('/login');
    } else {
<<<<<<< HEAD
      window.location.href ='url';  //추후 수정
=======
      window.location.href ='url';  // 추후 수정
>>>>>>> 5a8174d (refactor(FailurePage): FailurePage의 로직을 훅으로 분리)
    }
  };

  return handleKakaoLogin;
};
