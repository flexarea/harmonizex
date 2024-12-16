/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Layout from './layout'

// Separate component to use hooks after SessionProvider
function AppContent({ Component, pageProps, noLayoutPages, router }) {
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null)
  const { data: sessionData, status } = useSession({ refetchOnWindowFocus: true });

  useEffect(() => {
    if (!sessionData) {
      return
    }
    const fetchData = async () => {
      try {
        const response = await fetch('/api/spotify/data?type=user');
        if (!response.ok) {
          if (response.status === 401) {
            router.push("/login/signIn")
            return
          }
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data)
        setUserInfo(data);
      // eslint-disable-next-line no-shadow
      } catch (error) {
        setError(error.message);
      } finally {
        // rip
      }
    };
    fetchData();
  }, [sessionData, router]);

  const props = {
    ...pageProps,
    userInfo,
    error,
    setError,
    sessionData,
    status
  };

  return noLayoutPages.includes(router.pathname) ? (
    <Component {...props} />
  ) : (
    <Layout userInfo={userInfo}>
      <Component {...props} />
    </Layout>
  );
}

export default AppContent;
