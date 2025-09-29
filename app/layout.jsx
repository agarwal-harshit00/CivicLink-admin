import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CivicLink AI - Intelligent Municipal Platform",
  description:
    "AI-powered municipal administrative portal for managing civic complaints and issues",
  generator: "v0.app"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
