import React from 'react';
import {
  Box,
  Text,
  Image,
  Badge,
  HStack,
  VStack,
  Spinner,
  Center,
  IconButton,
  Tooltip,
  Flex,
  useColorModeValue,
  Heading,
  ButtonGroup,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
} from '@chakra-ui/react';
import { 
  CalendarIcon, 
  EditIcon, 
  DeleteIcon,
  TimeIcon,
  HamburgerIcon,
} from '@chakra-ui/icons';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { FaMapMarkedAlt, FaFilter } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { useTranslation } from 'next-i18next';
import { Event, ViewType } from './types';
import { GanttChart } from '../GanttChart';
import { EventsMap } from '../EventsMap';

interface EventsListUIProps {
  events: Event[];
  onEventClick: (eventId: string) => void;
  isLoading: boolean;
  role?: string;
  onEventEdit?: (event: Event) => void;
  onEventDelete?: (eventId: string) => void;
  viewType: ViewType;
  onViewTypeChange: (viewType: ViewType) => void;
  onFiltersClick?: () => void;
}

const getStatusColor = (status: Event['status']) => {
  switch (status) {
    case 'published':
      return 'green';
    case 'draft':
      return 'gray';
    case 'cancelled':
      return 'red';
    case 'completed':
      return 'blue';
    default:
      return 'gray';
  }
};

export const EventsListUI: React.FC<EventsListUIProps> = ({
  events,
  onEventClick,
  isLoading,
  role,
  onEventEdit,
  onEventDelete,
  viewType,
  onViewTypeChange,
  onFiltersClick,
}) => {
  const { t } = useTranslation(['sections/events']);
  const bgColor = useColorModeValue('white', 'gray.800');

  if (isLoading) {
    return (
      <Center h="200px">
        <Spinner />
      </Center>
    );
  }

  if (!events || events.length === 0) {
    return (
      <Center h="calc(100vh - 64px)">
        <Text>{t('noEvents')}</Text>
      </Center>
    );
  }

  const renderDefaultView = () => (
    <VStack spacing={4} align="stretch">
      {events.map((event) => (
        <Box
          key={event.id}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          onClick={() => onEventClick(event.id)}
          cursor="pointer"
          _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
        >
          <Flex justify="space-between" align="center">
            <Box flex="1">
              <HStack>
                {event.media?.thumbnails?.[0] && (
                  <Image
                    boxSize="40px"
                    objectFit="cover"
                    src={event.media.thumbnails[0]}
                    alt={event.title}
                    borderRadius="md"
                  />
                )}
                <Box>
                  <Text fontWeight="bold" fontSize="lg">
                    {event.title}
                  </Text>
                  <HStack spacing={2} mt={1}>
                    <Badge colorScheme={getStatusColor(event.status)}>
                      {t(`status.${event.status}`)}
                    </Badge>
                    {(event.stages?.length ?? 0) > 0 && (
                      <Badge colorScheme="purple">
                        {event.stages?.length} {t('stages')}
                      </Badge>
                    )}
                  </HStack>
                  {event.description && (
                    <Text color="gray.500" mt={2} noOfLines={2}>
                      {event.description}
                    </Text>
                  )}
                  <HStack mt={2} spacing={4} color="gray.600">
                    {event.startDate && (
                      <HStack fontSize="sm">
                        <CalendarIcon />
                        <Text>{new Date(event.startDate).toLocaleDateString()}</Text>
                        {event.endDate && (
                          <>
                            <Text>-</Text>
                            <Text>{new Date(event.endDate).toLocaleDateString()}</Text>
                          </>
                        )}
                      </HStack>
                    )}
                    {event.location?.city && (
                      <HStack fontSize="sm">
                        <Box as={MdLocationOn} /> 
                        <Text>{event.location.city}</Text>
                      </HStack>
                    )}
                  </HStack>
                </Box>
              </HStack>
              {role === 'manager' && (
                <HStack>
                  <Tooltip label={t('edit')}>
                    <IconButton
                      icon={<EditIcon />}
                      aria-label={t('edit')}
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventEdit?.(event);
                      }}
                    />
                  </Tooltip>
                  <Tooltip label={t('delete')}>
                    <IconButton
                      icon={<DeleteIcon />}
                      aria-label={t('delete')}
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventDelete?.(event.id);
                      }}
                    />
                  </Tooltip>
                </HStack>
              )}
            </Box>
          </Flex>
        </Box>
      ))}
    </VStack>
  );

  const renderGridView = () => (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      gap={6}
      w="full"
    >
      {events.map((event) => (
        <Box
          key={event.id}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          onClick={() => onEventClick(event.id)}
          cursor="pointer"
          _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
        >
          {event.media?.thumbnails?.[0] && (
            <Image
              w="full"
              h="200px"
              objectFit="cover"
              src={event.media.thumbnails[0]}
              alt={event.title}
              borderRadius="md"
              mb={4}
            />
          )}
          <Box>
            <Text fontWeight="bold" fontSize="lg">
              {event.title}
            </Text>
            <HStack spacing={2} mt={1}>
              <Badge colorScheme={getStatusColor(event.status)}>
                {t(`status.${event.status}`)}
              </Badge>
              {(event.stages?.length ?? 0) > 0 && (
                <Badge colorScheme="purple">
                  {event.stages?.length} {t('stages')}
                </Badge>
              )}
            </HStack>
            {event.description && (
              <Text color="gray.500" mt={2} noOfLines={2}>
                {event.description}
              </Text>
            )}
            <HStack mt={2} spacing={4} color="gray.600">
              {event.startDate && (
                <HStack fontSize="sm">
                  <CalendarIcon />
                  <Text>{new Date(event.startDate).toLocaleDateString()}</Text>
                  {event.endDate && (
                    <>
                      <Text>-</Text>
                      <Text>{new Date(event.endDate).toLocaleDateString()}</Text>
                    </>
                  )}
                </HStack>
              )}
              {event.location?.city && (
                <HStack fontSize="sm">
                  <Box as={MdLocationOn} /> 
                  <Text>{event.location.city}</Text>
                </HStack>
              )}
            </HStack>
          </Box>
        </Box>
      ))}
    </Box>
  );

  const renderCalendarView = () => (
    <Box 
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      mt="60px"
    >
      <GanttChart events={events} onEventClick={onEventClick} />
    </Box>
  );

  const renderMapView = () => (
    <EventsMap events={events} onEventClick={onEventClick} />
  );

  const renderViewTypeButtons = () => (
    <Flex justify="space-between" align="center" mb={4}>
      <Heading size="lg">{t('eventsList')}</Heading>
      <HStack spacing={4}>
        {onFiltersClick && (
          <IconButton
            aria-label={t('filter.title')}
            icon={<FaFilter />}
            onClick={onFiltersClick}
            size="sm"
          />
        )}
        <ButtonGroup size="sm" isAttached variant="outline">
          <Tooltip label={t('listView')}>
            <IconButton
              aria-label={t('listView')}
              icon={<HamburgerIcon />}
              isActive={viewType === 'list'}
              onClick={() => onViewTypeChange('list')}
            />
          </Tooltip>
          <Tooltip label={t('gridView')}>
            <IconButton
              aria-label={t('gridView')}
              icon={<BsGrid3X3Gap />}
              isActive={viewType === 'grid'}
              onClick={() => onViewTypeChange('grid')}
            />
          </Tooltip>
          <Tooltip label={t('calendarView')}>
            <IconButton
              aria-label={t('calendarView')}
              icon={<CalendarIcon />}
              isActive={viewType === 'calendar'}
              onClick={() => onViewTypeChange('calendar')}
            />
          </Tooltip>
          <Tooltip label={t('mapView')}>
            <IconButton
              aria-label={t('mapView')}
              icon={<FaMapMarkedAlt />}
              isActive={viewType === 'map'}
              onClick={() => onViewTypeChange('map')}
            />
          </Tooltip>
        </ButtonGroup>
      </HStack>
    </Flex>
  );

  const renderContent = () => {
    switch (viewType) {
      case 'calendar':
        return (
          <Box h="calc(100vh - 120px)">
            <GanttChart events={events} onEventClick={onEventClick} />
          </Box>
        );
      case 'map':
        return (
          <Box 
            h="calc(100vh - 120px)" 
            position="relative"
            sx={{
              '& > div': {
                height: '100% !important'
              }
            }}
          >
            <EventsMap events={events} onEventClick={onEventClick} />
          </Box>
        );
      case 'grid':
        return renderGridView();
      case 'list':
      default:
        return renderDefaultView();
    }
  };

  return (
    <Box 
      h="100%" 
      display="flex" 
      flexDirection="column"
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">{t('eventsList')}</Heading>
        <HStack spacing={4}>
          {onFiltersClick && (
            <IconButton
              aria-label={t('filter.title')}
              icon={<FaFilter />}
              onClick={onFiltersClick}
              size="sm"
            />
          )}
          <ButtonGroup size="sm" isAttached variant="outline">
            <Tooltip label={t('listView')}>
              <IconButton
                aria-label={t('listView')}
                icon={<HamburgerIcon />}
                isActive={viewType === 'list'}
                onClick={() => onViewTypeChange('list')}
              />
            </Tooltip>
            <Tooltip label={t('gridView')}>
              <IconButton
                aria-label={t('gridView')}
                icon={<BsGrid3X3Gap />}
                isActive={viewType === 'grid'}
                onClick={() => onViewTypeChange('grid')}
              />
            </Tooltip>
            <Tooltip label={t('calendarView')}>
              <IconButton
                aria-label={t('calendarView')}
                icon={<CalendarIcon />}
                isActive={viewType === 'calendar'}
                onClick={() => onViewTypeChange('calendar')}
              />
            </Tooltip>
            <Tooltip label={t('mapView')}>
              <IconButton
                aria-label={t('mapView')}
                icon={<FaMapMarkedAlt />}
                isActive={viewType === 'map'}
                onClick={() => onViewTypeChange('map')}
              />
            </Tooltip>
          </ButtonGroup>
        </HStack>
      </Flex>
      <Box flex="1">
        {renderContent()}
      </Box>
    </Box>
  );
};
