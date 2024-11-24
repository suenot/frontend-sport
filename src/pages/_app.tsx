import { ChakraProvider } from '@chakra-ui/react';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import theme from '../theme';
import { LocalStoreProvider } from '@deep-foundation/store/local';
import { QueryStoreProvider } from '@deep-foundation/store/query';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <QueryStoreProvider useRouter={useRouter}>
      <ChakraProvider theme={theme}>
        <LocalStoreProvider>
          <Component {...pageProps} />
        </LocalStoreProvider>
      </ChakraProvider>
    </QueryStoreProvider>
  );
}

export default appWithTranslation(App);
