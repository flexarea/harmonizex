/* eslint-disable react/jsx-props-no-spreading */
import "@/styles/globals.css";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Head from "next/head";
import { Main } from "next/document";

function App({ Component, pageProps }) {

  return (
    <div>
      <Head>
        <title>
          Harmonize
        </title>
      </Head>
      <Main>
        <h1 className="title"> Harmonize </h1>
        <Component {...pageProps} />
      </Main>
      <footer>copyright @ middlebury college</footer>
    </div>
  )

}

export default App;

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}),
};
