import Head from "next/head";
import Script from "next/script";
import Footer from "./Footer";
import Header from "./Header";

export default function Contener(props: { children: React.ReactNode; title: string; description: string }) {
  const { children, title, description } = props;
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-M9YN517WD9" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-M9YN517WD9');
        `}
      </Script>
      <Header />

      <div className="mx-5  max-w-5xl sm:mx-auto sm:px-20  ">
        {children}
        <Footer />
      </div>
    </div>
  );
}
