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
            <body className={`${inter.className} bg-dark-1`}>
                {children}
            </body>
        </html>
    );
}
