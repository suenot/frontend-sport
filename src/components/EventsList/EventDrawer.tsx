import React from 'react';
import { useTranslation } from 'next-i18next';
import { AppDrawer } from '../common/AppDrawer';
import { Event } from './types';
import {
  VStack,
  Text,
  Image,
  Badge,
  Box,
  Heading,
  Divider,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';

interface EventDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
  onEdit?: (event: Event) => void;
  onDelete?: (eventId: string) => void;
  role?: string;
}

const getStatusColor = (status: Event['status'] | string) => {
  switch (status) {
    case 'published':
      return 'blue';
    case 'draft':
      return 'gray';
    case 'cancelled':
      return 'red';
    case 'completed':
      return 'green';
    case 'upcoming':
      return 'blue';
    case 'ongoing':
      return 'green';
    default:
      return 'gray';
  }
};

export const EventDrawer: React.FC<EventDrawerProps> = ({
  isOpen,
  onClose,
  event,
  onEdit,
  onDelete,
  role,
}) => {
  const { t } = useTranslation(['sections/events']);
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  if (!event) return null;

  return (
    <AppDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={t('details')}
      placement="right"
    >
      <Box 
        maxHeight="calc(100vh - 120px)" 
        overflowY="auto"
        px={2}
      >
        <VStack spacing={6} align="stretch">
          {event.media?.thumbnails?.[0] && (
            <Image
              src={event.media.thumbnails[0]}
              alt={event.title}
              objectFit="cover"
              borderRadius="lg"
              fallbackSrc="https://via.placeholder.com/400x200"
            />
          )}

          <Box>
            <Badge
              colorScheme={getStatusColor(event.status)}
              mb={2}
              px={2}
              py={1}
              borderRadius="full"
            >
              {t(`status.${event.status}`)}
            </Badge>
            <Heading size="md">
              {t(`sports.${event.sportType}`)} - {event.title.split(' - ')[1]}
            </Heading>
            <Text color="gray.600" mt={2}>
              {event.shortDescription}
            </Text>
          </Box>

          <Divider />

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <Box>
              <Text fontWeight="bold" mb={1}>{t('location')}</Text>
              <Text>{event.location?.city}</Text>
              <Text fontSize="sm" color="gray.600">{event.location?.venue}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold" mb={1}>{t('sportType')}</Text>
              <Text>{t(`sports.${event.sportType}`)}</Text>
              <Text fontSize="sm" color="gray.600">
                {t(`disciplines.${event.discipline}`)}
              </Text>
            </Box>
          </SimpleGrid>

          <Box>
            <Text fontWeight="bold" mb={3}>{t('stages')}:</Text>
            <VStack spacing={4} align="stretch">
              {event.stages?.map((stage) => (
                <Box
                  key={stage.id}
                  p={4}
                  bg={bgColor}
                  borderWidth="1px"
                  borderColor={borderColor}
                  borderRadius="md"
                >
                  <Text fontWeight="medium">
                    {t('stage.title', {
                      number: stage.title.split(':')[0].split(' ')[1],
                      name: stage.title.split(':')[1].trim(),
                    })}
                  </Text>
                  <Badge
                    colorScheme={getStatusColor(stage.status)}
                    mt={1}
                    px={2}
                    py={0.5}
                    borderRadius="full"
                  >
                    {t(`stage.status.${stage.status}`)}
                  </Badge>
                  {stage.description && (
                    <Text fontSize="sm" mt={2} color="gray.600">
                      {stage.description}
                    </Text>
                  )}
                </Box>
              ))}
            </VStack>
          </Box>
        </VStack>
      </Box>
    </AppDrawer>
  );
};
