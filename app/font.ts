import localFont from 'next/font/local'

export const myFont = localFont({
  src: './fonts/Matter-Light.woff2',
  variable: "--font-myfont",
  display: 'swap',
})