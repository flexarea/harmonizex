import '../styles/globals.css';  // Import global CSS
import PropTypes from 'prop-types';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout'
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter()
  const noLayoutPages = ['/login/SignIn']

  if (noLayoutPages.includes(router.pathname)) {
    return <Component {...pageProps} />
  }

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
