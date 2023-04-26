import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const MyPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/main.html');
  }, []);
};

export default MyPage;
