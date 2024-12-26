import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Outfit} from "next/font/google"

const outfit=Outfit({subsets:['latin']});


export const metadata = {
  title: "Marathi Rap",
  description: "It is Marathi Rap . Saiprasad Algulwad ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
       className={outfit.className}
      >
        {children}
      </body>
    </html>
  );
}
