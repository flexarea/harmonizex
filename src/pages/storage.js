import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function StoreTokens() {
  const router = useRouter();

  useEffect(() => {
    const { access_token, refresh_token } = router.query;

    if (access_token && refresh_token) {
      // Store tokens in localStorage
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      // Redirect to a main or secure page
      router.push('/');
    }
  }, [router]);

  return <p>Storing tokens...</p>;
}

