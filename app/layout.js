import { Poppins as siteFont } from 'next/font/google';
import "@/styles/reset.css";
import "@/styles/global.css";

const font = siteFont({
    display: 'swap',
    subsets: ['latin'],
    style: ['normal', 'italic'],
    weight: ['300', '400', '500', '600', '700', '800', '900']
})

export const metadata = {
    title: 'Weather App',
    description: 'Weather app',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={font.className}>{children}</body>
        </html>
    )
}
