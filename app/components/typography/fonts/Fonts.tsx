import { Inter } from 'next/font/google';
import { Merriweather_Sans } from 'next/font/google';

export const fontFamily = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const fontDisplay = Merriweather_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});
