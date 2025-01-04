import "./globals.css";
// Đoạn này để từ từ nhét vào sidebar
import Script from "next/script";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react"

// Các font cần dùng
const conthraxBold = localFont({
  src: "./fonts/conthrax-bold.otf",
  variable: "--font-conthrax-bold",
  preload: true,
});

const conthraxHeavy = localFont({
  src: "./fonts/conthrax-heavy.otf",
  variable: "--font-conthrax-heavy",
  preload: true,
});

const gothamBook = localFont({
  src: "./fonts/gotham-book.otf",
  variable: "--font-gotham-book",
  preload: true,
});

const gothamBold = localFont({
  src: "./fonts/gotham-bold.otf",
  variable: "--font-gotham-bold",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "News Website",
  description: "News Website",
  openGraph: {
    title: "News Website",
    description: "News Website",
    // Chỗ này thay bằng đường dẫn công khai đến trang web của bạn
    url: "#",
    siteName: "News Website",
    // Chỗ này thay bằng đường dẫn ảnh của bạn trong thư mục public 
    images: "/opengraph-image.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${conthraxHeavy.variable} ${conthraxBold.variable} ${gothamBold.variable} ${gothamBook.variable}  bg-blue-dark`}
      >
        {/* Phần nội dung main + layout của trang home */}
        {children}
        <Analytics />

        {/* Cái script này để nó chạy click menu được */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"
          strategy="beforeInteractive"
        />

      </body>
    </html>
  );
}
