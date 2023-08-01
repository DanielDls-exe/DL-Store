import Head from "next/head";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useState } from 'react';

export const Layout = ({ children, setIsCartOpen }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <title>DL Store</title>
      </Head>
      <Navbar setIsCartOpen={setIsCartOpen} />
      <main tw="pt-28 pb-16 px-4 min-h-screen">{children}</main>
      <Footer />
    </>
  );
};
