import { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="color-scheme" content="dark light" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                document.documentElement.style.setProperty('background-color', isDark ? '#1A202C' : '#F7FAFC');
                document.documentElement.style.setProperty('color', isDark ? '#FFFFFF' : '#1A202C');
              } catch (e) {}
            `,
          }}
        />
      </Head>
      <body>
        <ColorModeScript initialColorMode="system" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
