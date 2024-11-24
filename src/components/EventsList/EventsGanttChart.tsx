import React from 'react';
import { Box } from '@chakra-ui/react';
import { Event } from './types';
import { GanttChart } from '../GanttChart';

interface EventsGanttChartProps {
  events: Event[];
  onEventClick?: (eventId: string) => void;
}

export const EventsGanttChart: React.FC<EventsGanttChartProps> = ({ events, onEventClick }) => {
  return (
    <Box height="calc(100vh - 180px)">
      <GanttChart events={events} onEventClick={onEventClick} />
    </Box>
  );
};
