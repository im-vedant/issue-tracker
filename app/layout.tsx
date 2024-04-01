import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import { Container, Theme } from '@radix-ui/themes';
import Navbar from "@/components/Navbar";
import './theme.config.css'
import { ThemePanel } from "@radix-ui/themes";
import QueryClientProvider from "./QueryClientProvider";
import AuthProvider from "./auth/Provider";
const inter = Inter({ subsets: ["latin"], variable : "--font-inter" });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryClientProvider>
      <AuthProvider>
      <body className={inter.variable}>
       
       <Theme accentColor="purple" panelBackground="solid">
        <Navbar/>
        <main className="p-5">
        <Container>{children}</Container>
        </main>
 
        </Theme>
        </body>

      </AuthProvider>
      </QueryClientProvider>
     
    </html>
  );
}
