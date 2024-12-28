import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Head>
          <title>Learning Hub</title> {/* Global Title */}
          <meta name="description" content="Welcome to Learning Hub!" />
          <link rel="icon" href="/online-course.png" /> {/* Favicon */}
        </Head>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
