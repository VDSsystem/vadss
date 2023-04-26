import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const MyPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/main.html');
  }, []);

  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
};

export default MyPage;
