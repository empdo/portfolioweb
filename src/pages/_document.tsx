import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='bg-gradient-to-r from-slate-900 to-gray-900 text-white scroll-smooth'>
      <Head />
      <body >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
