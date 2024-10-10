import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccessToken = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) throw new Error('토큰 없음');

        await axios.get('/api/verify-token', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        navigate('/');
      } catch (error) {
        console.error('토큰 검증 실패:', error);
        navigate('/failure'); // 유효하지 않으면 실패 페이지로 이동
      }
    };
    checkAccessToken();
  }, [navigate]);

  return <div>토큰 검증 중...</div>;
};

export default SuccessPage;
