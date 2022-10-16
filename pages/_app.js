import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        //withNormalizeCSS
        theme={{
          colors: {
            tan: [
              "#CBD5DF",
              "#6B86A1",
              "#6B86A1",
              "#6B86A1",
              "#6B86A1",
              "#6B86A1",
              "#6B86A1",
              "#6B86A1",
              "#6B86A1"
            ],
            darkGreen: [
              "#F2F2DC",
              "#C1BF62",
              "#C1BF62",
              "#C1BF62",
              "#C1BF62",
              "#C1BF62",
              "#C1BF62",
              "#C1BF62",
              "#C1BF62"
            ],
            green: [
              "#D9EAB5",
              "#678822",
              "#678822",
              "#678822",
              "#678822",
              "#678822",
              "#678822"
            ],
            lightBrown: [
              "#DDCAB5",
              "#AA8153",
              "#AA8153",
              "#AA8153",
              "#AA8153",
              "#AA8153",
              "#AA8153",
              "#AA8153",
              "#AA8153"
            ],
            midGreen: [
              "#F4FFA4",
              "#DAFF09",
              "#DAFF09",
              "#DAFF09",
              "#DAFF09",
              "#DAFF09",
              "#DAFF09",
              "#DAFF09",
              "#DAFF09",
              "#DAFF09"
            ]
          },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}