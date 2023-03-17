import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.css";

import type { AppProps } from "next/app";

import Layout from "@/components/Layout";
import Metatags from "@/components/Metatags";
import AppWithProviders from "@/lib/AppWithProviders";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWithProviders>
      <Metatags />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppWithProviders>
  );
}
