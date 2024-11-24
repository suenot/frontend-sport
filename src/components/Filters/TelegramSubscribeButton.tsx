import { Alert, Text, Link, Icon, VStack } from '@chakra-ui/react';
import { FaTelegram } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';
import { useCallback } from 'react';

interface TelegramSubscribeButtonProps {
  filters: Record<string, any>;
}

export const TelegramSubscribeButton = ({ filters }: TelegramSubscribeButtonProps) => {
  const { t } = useTranslation(['sections/events']);

  const handleSubscribe = useCallback(() => {
    // Temporarily commented out for testing
    // window.open('https://t.me/your_bot', '_blank');
    console.log('Subscribe to filters:', filters);
  }, [filters]);

  return (
    <Alert 
      status="info" 
      variant="subtle" 
      mb={4}
      borderRadius="md"
      colorScheme="teal"
    >
      <VStack align="flex-start" spacing={1} flex={1}>
        <Text>{t('filter.subscribeAlert')}</Text>
        <Link
          color="teal.500"
          onClick={handleSubscribe}
          display="inline-flex"
          alignItems="center"
          _hover={{ textDecoration: 'none', color: 'teal.600' }}
        >
          <Text>{t('filter.subscribeTelegram')}</Text>
          <Icon as={FaTelegram} ml={1} />
        </Link>
      </VStack>
    </Alert>
  );
};
