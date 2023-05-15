import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  // Easter egg
  useEffect(() => {
    console.log(
      `%c   ,_,
  (O,O)
  (   )
---"-"-------------------------------
TG9va2luZyBhdCBzb3VyY2UgY29kZT8gTWF5Y
mUgeW91J3JlIHRoZSBraW5kIG9mIHBlcnNvbi
B3aG8gd291bGQgZW5qb3kgd29ya2luZyB3aXR
oIG1lISBrdWJhc29iZWNraUBnbWFpbC5jb20=
-------------------------------------`,
      "\n font-family: monospace; \n color: #ADFF16"
    );
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <title>kubasobecki.pl</title>
        <meta name="description" content="Kuba Sobecki" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
