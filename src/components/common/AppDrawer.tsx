import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useMediaQuery,
  DrawerProps,
} from '@chakra-ui/react';

type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left';

interface AppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  placement?: DrawerPlacement;
}

export const AppDrawer: React.FC<AppDrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  placement = 'right',
}) => {
  // Используем медиа-запрос напрямую для определения мобильного устройства
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  // Настройки для мобильного вида
  const mobileProps = {
    placement: 'bottom' as const,
    size: 'full' as const,
    contentProps: {
      maxH: '80vh',
      maxW: '100%',
      borderTopRadius: '12px',
    },
  };

  // Настройки для десктопного вида
  const desktopProps = {
    placement,
    size: 'md' as const,
    contentProps: {
      maxW: '400px',
    },
  };

  // Выбираем нужные настройки в зависимости от размера экрана
  const { placement: currentPlacement, size, contentProps } = isMobile ? mobileProps : desktopProps;

  return (
    <Drawer
      isOpen={isOpen}
      placement={currentPlacement}
      onClose={onClose}
      size={size}
    >
      <DrawerOverlay />
      <DrawerContent {...contentProps}>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          {title}
        </DrawerHeader>
        <DrawerBody>
          {children}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
