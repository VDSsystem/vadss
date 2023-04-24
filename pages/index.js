import React, { useEffect } from 'react';

const MyPage = () => {

  const redirectToIndex = () => {
    window.location.href = '/index.html';
  }

  useEffect(() => {
    redirectToIndex();
  }, []);

};

export default MyPage;
