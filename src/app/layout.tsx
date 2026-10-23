import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nguyễn Quốc Bảo — Full Stack Developer Portfolio",
  description: "Personal portfolio website of Nguyễn Quốc Bảo, Full Stack Developer & Software Engineer based in Ho Chi Minh City, Vietnam.",
  icons: {
    icon: "/assets/imgs/favicon.png?v=3",
    shortcut: "/assets/imgs/favicon.png?v=3",
    apple: "/assets/imgs/favicon.png?v=3",
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
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
