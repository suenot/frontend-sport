import { Box } from '@chakra-ui/react';
import { GanttChart } from '../components/GanttChart';
import { mockEvents } from '../components/EventsList/data';

export default function GanttPage() {
  return (
    <Box p={4} h="100vh">
      <GanttChart events={mockEvents} />
    </Box>
  );
}
