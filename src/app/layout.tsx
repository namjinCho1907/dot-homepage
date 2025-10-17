import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WelcomeU",
  description: "내 프로필 링크",
  openGraph: {
    title: "WelcomeU",
    description: "내 프로필 링크",
    siteName: "WelcomeU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
