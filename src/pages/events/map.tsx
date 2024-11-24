import React from 'react';
import { Box, Center, Spinner, Text } from '@chakra-ui/react';
import { EventsMap } from '../../components/EventsMap';
import { useEvents } from '../../hooks/useEvents';
import { useRouter } from 'next/router';

const EventsMapPage: React.FC = () => {
  const { events, isLoading, error } = useEvents();
  const router = useRouter();

  const handleEventClick = (eventId: string) => {
    router.push(`/events/${eventId}`);
  };

  if (isLoading) {
    return (
      <Center h="calc(100vh - 64px)">
        <Spinner />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="calc(100vh - 64px)">
        <Text color="red.500">Error loading events: {error.message}</Text>
      </Center>
    );
  }

  return (
    <Box p={4} h="calc(100vh - 64px)">
      <EventsMap events={events || []} onEventClick={handleEventClick} />
    </Box>
  );
};

export default EventsMapPage;
