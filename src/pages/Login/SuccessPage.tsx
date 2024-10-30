import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RouterPath } from '@/routes/path';

export const SuccessPage = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지를 이동합니다.

  const reissueAccessToken = async () => {
    try {
      const baseURL = process.env.REACT_APP_API_URL
      console.log('baseURL:', baseURL);
      const response = await axios.get(`${baseURL}/reissue`, {
        withCredentials: true, // 쿠키를 포함하여 요청
      });

      if (response.status === 200) {
        console.log('토큰 재발급 성공:', response.headers);
        const newAccessToken = response.headers.accessToken;
        localStorage.setItem("accessToken", newAccessToken); 
      } else {
        // 실패 처리
        console.error('Failed to reissue access token:', response.statusText);
      }
    } catch (error) {
      console.error('토큰을 가져오던 중 에러 발생', error);
    }
  };

  useEffect(() => {
    // 페이지에 들어오면 reissueAccessToken 함수 실행
    reissueAccessToken().then(() => {
      // 토큰 재발급 후 필요한 작업 수행 (페이지 이동)
      navigate(RouterPath.home);
    });
  }, [navigate]);

  return null;
};
