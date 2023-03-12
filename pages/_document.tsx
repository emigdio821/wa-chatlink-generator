import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-zinc-50 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
