import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
  disableTransitionOnChange: true, // Отключаем анимации при смене темы
};

const theme = extendTheme({
  config,
  breakpoints: {
    base: '0em',
    sm: '30em',    // 480px
    md: '48em',    // 768px
    lg: '62em',    // 992px
    xl: '80em',    // 1280px
    '2xl': '96em', // 1536px
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'var(--chakra-colors-chakra-body-bg)',
        color: 'var(--chakra-colors-chakra-body-text)',
      },
    },
  },
  semanticTokens: {
    colors: {
      'chakra-body-bg': { _light: '#F7FAFC', _dark: '#1A202C' },
      'chakra-body-text': { _light: '#1A202C', _dark: '#FFFFFF' },
    },
  },
});

export default theme;
