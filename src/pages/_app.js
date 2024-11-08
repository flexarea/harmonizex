/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import "@/styles/globals.css";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Head from "next/head";
import { Main } from "next/document";
import { Component } from "react";

function MainApp({ Component, pageProps }) {

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

export default MainApp;

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}),
};
