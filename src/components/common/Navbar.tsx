'use client';

import {
  Box,
  Flex,
  IconButton,
  Button,
  ButtonGroup,
  Container,
  useColorMode
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { memo, useCallback } from 'react';
import { TelegramAuthButton } from './TelegramAuthButton';
import { Logo } from './Logo';

interface NavbarProps {
  role?: 'user' | 'manager';
  onRoleChange?: (role: 'user' | 'manager') => void;
}

export const Navbar: React.FC<NavbarProps> = memo(({ 
  role = 'user',
  onRoleChange 
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { i18n, t } = useTranslation(['sections/common']);
  const router = useRouter();

  const handleLanguageChange = useCallback((newLocale: string) => {
    router.push(router.pathname, router.asPath, { locale: newLocale });
  }, [router]);

  const handleRoleToggle = useCallback(() => {
    if (onRoleChange) {
      onRoleChange(role === 'user' ? 'manager' : 'user');
    }
  }, [onRoleChange, role]);

  return (
    <Box 
      bg="transparent" 
      borderBottom="1px solid"
      borderColor="gray.200"
      _dark={{
        borderColor: "gray.700"
      }}
      position="sticky"
      top={0}
      zIndex={1000}
      backdropFilter="blur(10px)"
      w="100%"
    >
      <Container maxW="container.xl" px={4}>
        <Flex 
          alignItems="center" 
          justifyContent="space-between"
          h="48px"
          w="100%"
        >
          <Logo />
          
          <Flex alignItems="center" gap={4}>
            <ButtonGroup size="sm" isAttached variant="outline">
              <Button
                onClick={() => handleLanguageChange('en')}
                variant={i18n.language === 'en' ? 'solid' : 'outline'}
                aria-label={t('language.en')}
              >
                {t('language.en')}
              </Button>
              <Button
                onClick={() => handleLanguageChange('ru')}
                variant={i18n.language === 'ru' ? 'solid' : 'outline'}
                aria-label={t('language.ru')}
              >
                {t('language.ru')}
              </Button>
            </ButtonGroup>

            <TelegramAuthButton />

            <IconButton
              size="sm"
              aria-label={t(colorMode === 'light' ? 'theme.dark' : 'theme.light')}
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              title={t(colorMode === 'light' ? 'theme.dark' : 'theme.light')}
            />

            {onRoleChange && (
              <Button
                size="sm"
                onClick={handleRoleToggle}
                aria-label={t(`roles.${role === 'user' ? 'manager' : 'user'}`)}
              >
                {t(`roles.${role}`)}
              </Button>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
});

Navbar.displayName = 'Navbar';
