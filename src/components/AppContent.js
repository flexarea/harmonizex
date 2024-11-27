import Layout from './layout'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

// Separate component to use hooks after SessionProvider
function AppContent({ Component, pageProps, noLayoutPages, router }) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null);
  const [data, setData] = useState(null)
  const { data: sessionData, status } = useSession({ refetchOnWindowFocus: true });

  useEffect(() => {
    if (!sessionData) {
      setIsLoading(false);
      return
    }
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/spotify/data?type=artists');
        if (!response.ok) {
          if (response.status === 401) {
            router.push("/login/signIn")
            return
          }
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data)
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false)
      }
    };
    fetchData();
  }, [sessionData, router]);

  const props = {
    ...pageProps,
    data,
    isLoading,
    error,
    sessionData,
    status
  };

  return noLayoutPages.includes(router.pathname) ? (
    <Component {...props} />
  ) : (
    <Layout data={data}>
      <Component {...props} />
    </Layout>
  );
}

export default AppContent;
