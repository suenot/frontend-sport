import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { FaTelegram, FaSignOutAlt } from 'react-icons/fa';
import { useCallback, useState } from 'react';

interface User {
  id: string;
  name: string;
  avatarUrl?: string;
}

export const AuthButton = () => {
  // This is a mock state. In a real app, you would get this from your auth context/store
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = useCallback(() => {
    // In a real app, this would redirect to your Telegram auth URL
    window.open('https://t.me/your_bot', '_blank');
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
  }, []);

  if (!user) {
    return (
      <Button
        leftIcon={<FaTelegram />}
        colorScheme="telegram"
        size="sm"
        onClick={handleLogin}
      >
        Login with Telegram
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
        <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
