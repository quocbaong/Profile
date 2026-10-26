import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://quocbao.click";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nguyễn Quốc Bảo — Portfolio",
  description: "Personal portfolio website of Nguyễn Quốc Bảo",
  icons: {
    icon: "/assets/imgs/favicon.png?v=3",
    shortcut: "/assets/imgs/favicon.png?v=3",
    apple: "/assets/imgs/favicon.png?v=3",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteUrl,
    siteName: "Nguyễn Quốc Bảo Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Logo",
      },
    ],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&family=Muli:wght@300;400;600;700;800&family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <meta property="og:image" content="https://quocbao.click/og-image.png" />
        <meta property="og:image:secure_url" content="https://quocbao.click/og-image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
