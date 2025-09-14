import type { Metadata } from "next";
import Header from "./components/Header";
import RegisterSW from "./register-sw";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Melix",
  description: "Movies & Tv Shows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <body className="bg-slate-900  text-amber-50">
        <RegisterSW />
        <Header></Header>
          {children}

      </body>
    </html>
  );
}
