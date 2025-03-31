import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Topbar from "@/components/shared/Topbar";
import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Threads Knock Off",
  description: "Clone of Meta's Threads app",
};

export default function RootLayout({ children, modals }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Topbar />

        <main className="flex">
          <LeftSidebar />

          <section className="main-container">
            <div className="w-full max-w-2xl">
              {children}

              {modals}
              
              <Toaster richColors />
            </div>
          </section>

          {/* <RightSidebar /> */}
        </main>

        <Bottombar />
      </body>
    </html>
  );
}
