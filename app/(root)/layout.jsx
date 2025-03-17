import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Topbar from "@/components/shared/Topbar";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Threads Knock Off",
  description: "Clone of Meta's Threads app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Topbar />

        <main className="flex">
          <LeftSidebar />

          <section className="main-container">
            <div className="w-full max-w-4xl">
              {children}
            </div>
          </section>

          {/* <RightSidebar /> */}
        </main>

        <Bottombar />
      </body>
    </html>
  );
}
