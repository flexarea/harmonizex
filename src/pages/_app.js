import { useRouter } from "next/router";
import PropTypes from "prop-types";
import AppContent from "../components/AppContent"
import { SessionProvider } from "next-auth/react";
import AppTheme from "../styles/shared-theme/AppTheme";
import { GlobalStyles } from "@mui/material";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter()
  const noLayoutPages = ['/login/SignIn']

  const globalStyles = {
    'body': {
      backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh'
    },
    '[data-mui-color-scheme="dark"] body': {
      backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))'
    }
  };

  return (
    <AppTheme>
      <GlobalStyles styles={globalStyles} />
      <SessionProvider session={session}>
        <AppContent
          Component={Component}
          pageProps={pageProps}
          noLayoutPages={noLayoutPages}
          router={router}
        />
      </SessionProvider>
    </AppTheme>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
