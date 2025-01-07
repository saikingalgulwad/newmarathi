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
      <head>
    <link rel='icon' type='image/png' href='./public/logo1.png'/>
    </head>
      <body
       className={outfit.className}
      >
        {children}
      </body>
    </html>
  );
}
