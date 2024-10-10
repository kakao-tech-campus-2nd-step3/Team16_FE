import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import KakaoLoginButton from 'src/components/common/Button/kakaoLogin';

const FailurePage: React.FC = () => {
  const navigate = useNavigate();

  const retryLogin = async () => {
    try {
      const response = await axios.post('/api/refresh-token', null, {
        withCredentials: true, 
      });

      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);

      navigate('/success');
    } catch (error) {
      console.error('리프레시 토큰 갱신 실패:', error);
      alert('다시 로그인 해주세요.');
    }
  };

  return (
    <div>
      <h1>로그인 실패</h1>
      <p>토큰이 만료되었거나 유효하지 않습니다.</p>
      <KakaoLoginButton onClick={retryLogin}>다시 로그인하기</KakaoLoginButton>
    </div>
  );
};

export default FailurePage;
