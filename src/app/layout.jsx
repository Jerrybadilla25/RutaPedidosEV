import localFont from "next/font/local";
import "./globals.css";
import './local.css'
import { Toaster } from "sonner";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Dashboard de pedidos",
  description: "Creacion y segimiento de pedidos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-center"/>
        </body>
    </html>
  );
}

