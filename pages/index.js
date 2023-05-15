import React, { useEffect } from 'react';

const MyPage = () => {
  useEffect(() => {
    window.location.href = '/view/main.html';
  }, []);

  return null; // or replace with appropriate JSX
};

export default MyPage;
