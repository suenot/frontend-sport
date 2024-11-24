import React from 'react';
import dynamic from 'next/dynamic';
import { Box } from '@chakra-ui/react';
import { Event } from '../EventsList/types';

interface EventsMapProps {
  events: Event[];
  onEventClick?: (eventId: string) => void;
}

const Map = dynamic(
  () => import('./Map').then((mod) => mod.Map),
  { 
    ssr: false,
    loading: () => (
      <Box h="600px" w="100%" bg="gray.100" display="flex" alignItems="center" justifyContent="center">
        Loading map...
      </Box>
    )
  }
);

export const EventsMap: React.FC<EventsMapProps> = ({ events, onEventClick }) => {
  // Default center to some location (you might want to adjust this)
  const defaultCenter: [number, number] = [55.7558, 37.6173];

  return (
    <Box h="600px" w="100%">
      <Box h="100%" w="100%">
        <Map
          center={defaultCenter}
          zoom={10}
          events={events}
          onEventClick={onEventClick}
        />
      </Box>
    </Box>
  );
};
