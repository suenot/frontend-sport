'use client';

import { Container, Box, VStack } from '@chakra-ui/react';
import { EventsListContainer } from './EventsListContainer';
import { mockEvents, sportTypes, disciplines, cities, countries } from './data';
import { Navbar } from '../common/Navbar';
import { ReactNode } from 'react';

interface EventsPageLayoutProps {
  title?: string;
  role?: 'user' | 'manager';
  onRoleChange?: (role: 'user' | 'manager') => void;
  children?: ReactNode;
  showEventsList?: boolean;
}

export const EventsPageLayout: React.FC<EventsPageLayoutProps> = ({
  title,
  role = 'user',
  onRoleChange,
  children,
  showEventsList = false,
}) => {
  return (
    <VStack h="100vh" spacing={0}>
      <Navbar 
        title={title}
        role={role}
        onRoleChange={onRoleChange}
      />
      
      <Container maxW="container.xl" py={4} flex={1} overflowY="auto">
        <Box h="100%">
          {children || (showEventsList && (
            <EventsListContainer 
              events={mockEvents}
              isLoading={false}
              role={role}
              sportTypes={sportTypes}
              disciplines={disciplines}
              cities={cities}
              countries={countries}
              ageGroups={['children', 'adult', 'senior']}
              onEventEdit={(event) => console.log('Edit event:', event)}
              onEventDelete={(eventId) => console.log('Delete event:', eventId)}
            />
          ))}
        </Box>
      </Container>
    </VStack>
  );
};
