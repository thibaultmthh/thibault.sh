import Script from "next/script";
import "../styles/globals.scss";
import "styles/Projects.scss";

export const metadata = {
  title: "Thibault Mathian - Fullstack Developer",
  description: "Thibault Mathian - French Fullstack Developer trying to build cool stuff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-M9YN517WD9" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-M9YN517WD9');
        `}
      </Script>
      <body className="mx-5  max-w-5xl sm:mx-auto sm:px-20 my-10 bg-black ">{children}</body>
      <footer className="text-center text-gray-400 text-sm mt-10 mb-3">
        <p>
          Made with <span className="text-red-500">❤</span> by Thibault Mathian
        </p>
      </footer>
    </html>
  );
}
