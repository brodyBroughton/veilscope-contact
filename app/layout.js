import { Geist, Geist_Mono } from "next/font/google";
import "./contact.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Contact — Veilscope",
  description: "Questions, partnerships, or press — we’d love to hear from you.",
  themeColor: "#F3F4F6",
  icons: {
    icon: "/favicon.ico",
    apple: "/assets/img/icons/apple-touch-icon.png",
  },
  manifest: "/assets/img/icons/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
