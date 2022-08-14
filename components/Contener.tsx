import Head from "next/head";
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
      <Header />

      <div className="mx-5  max-w-5xl sm:mx-auto sm:px-20  ">
        {children}
        <Footer />
      </div>
    </div>
  );
}
