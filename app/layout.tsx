import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SITE_URL } from './utils/site';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl = SITE_URL;

const description =
  'Portfolio of Petar Trifunovic, Full-Stack Developer and UI/UX Designer with 15+ years of experience building web applications from start to finish.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Petar Trifunovic | Full-Stack Developer & UI/UX Designer',
  description,
  authors: [{ name: 'Petar Trifunovic' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Petar Trifunovic',
    title: 'Petar Trifunovic | Full-Stack Developer & UI/UX Designer',
    description,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Petar Trifunovic, Full-Stack Developer and UI/UX Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Petar Trifunovic | Full-Stack Developer & UI/UX Designer',
    description,
    images: ['/og-image.jpg'],
  },
};

const themeScript = `try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
