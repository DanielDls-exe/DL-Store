import Head from "next/head";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <title>DL Store</title>
      </Head>
      <Navbar />
      <main tw="pt-28 pb-16 px-4 min-h-screen">{children}</main>
      <Footer />
    </>
  );
};
