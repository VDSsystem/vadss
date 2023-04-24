import React, { useEffect } from 'react';

const MyPage = () => {

  const redirectToIndex = () => {
    window.location.href = '/main.html';
  }

  useEffect(() => {
    redirectToIndex();
  }, []);

};