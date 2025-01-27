import { inter } from "@/lib/fonts/fonts";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} text-[16px] text-neutral-600 antialiased`}
            >
                <Toaster />
                {children}
            </body>
        </html>
    );
}