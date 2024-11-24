import { Button, Avatar, Menu, MenuButton, MenuItem, MenuList, Text, Flex } from '@chakra-ui/react';
import { FaSignInAlt } from 'react-icons/fa';
import { useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';

interface User {
  name: string;
  avatarUrl?: string;
}

export const TelegramAuthButton = () => {
  const [user, setUser] = useState<User | null>(null);
  const { t } = useTranslation(['sections/common']);

  const handleLogin = useCallback(() => {
    // Simulate successful login
    setUser({
      name: "John Doe",
      avatarUrl: "https://bit.ly/dan-abramov" // placeholder avatar
    });
    // window.open('https://t.me/your_bot', '_blank');
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
  }, []);

  if (!user) {
    return (
      <Button
        leftIcon={<FaSignInAlt />}
        size="sm"
        onClick={handleLogin}
        aria-label={t('auth.login')}
      >
        {t('auth.login')}
      </Button>
    );
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="ghost"
        size="sm"
      >
        <Flex alignItems="center" gap={2}>
          <Avatar size="xs" name={user.name} src={user.avatarUrl} />
          <Text>{user.name}</Text>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handleLogout}>
          {t('auth.logout')}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
