import { IconButton, Tooltip } from '@chakra-ui/react';
import { FaTelegram } from 'react-icons/fa';
import { useCallback } from 'react';

interface SaveFiltersButtonProps {
  filters: Record<string, any>; // Replace with your actual filters type
}

export const SaveFiltersButton = ({ filters }: SaveFiltersButtonProps) => {
  const handleSaveFilters = useCallback(() => {
    // In a real app, this would send the filters to your Telegram bot
    window.open('https://t.me/your_bot', '_blank');
  }, [filters]);

  return (
    <Tooltip label="Save filters to Telegram">
      <IconButton
        aria-label="Save filters to Telegram"
        icon={<FaTelegram />}
        colorScheme="telegram"
        size="sm"
        onClick={handleSaveFilters}
      />
    </Tooltip>
  );
};
