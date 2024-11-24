import { Box, Text, HStack, VStack, useColorModeValue } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { Event } from '../EventsList/types';

interface GanttChartProps {
  events: Event[];
  onEventClick?: (eventId: string) => void;
}

interface PositionedEvent {
  event: Event;
  row: number;
}

interface MonthGroup {
  month: string;
  year: number;
  startIndex: number;
  daysCount: number;
}

export const GanttChart: React.FC<GanttChartProps> = ({ events, onEventClick }) => {
  const { t } = useTranslation(['sections/events']);
  
  const sortedEvents = useMemo(() => {
    // Сортируем события по максимальному количеству участников среди всех этапов
    return events
      .slice(0, 20)
      .map(event => ({
        ...event,
        maxParticipants: Math.max(...(event.stages || []).map(stage => stage.maxParticipants || 0))
      }))
      .sort((a, b) => b.maxParticipants - a.maxParticipants);
  }, [events]);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Находим минимальную и максимальную даты для определения временного диапазона
  const timeRange = useMemo(() => {
    const dates = sortedEvents.flatMap(event => 
      (event.stages || []).map(stage => [
        new Date(stage.dates.start),
        new Date(stage.dates.end)
      ])
    ).flat();

    if (dates.length === 0) {
      const now = new Date();
      return {
        start: now,
        end: new Date(now.getTime() + 24 * 60 * 60 * 1000) // next day
      };
    }

    return {
      start: new Date(Math.min(...dates.map(d => d.getTime()))),
      end: new Date(Math.max(...dates.map(d => d.getTime())))
    };
  }, [sortedEvents]);

  // Создаем массив дат для шкалы времени
  const dateRange = useMemo(() => {
    const dates = [];
    const currentDate = new Date(timeRange.start);
    while (currentDate <= timeRange.end) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }, [timeRange]);

  // Группируем дни по месяцам
  const monthGroups = useMemo(() => {
    const groups: MonthGroup[] = [];
    let currentGroup: MonthGroup | null = null;

    dateRange.forEach((date, index) => {
      const monthName = date.toLocaleString('default', { month: 'long' });
      const month = t(`calendar.months.${monthName}`);
      const year = date.getFullYear();
      const monthYear = `${month}-${year}`;

      if (!currentGroup || `${currentGroup.month}-${currentGroup.year}` !== monthYear) {
        if (currentGroup) {
          groups.push(currentGroup);
        }
        currentGroup = {
          month,
          year,
          startIndex: index,
          daysCount: 1
        };
      } else {
        currentGroup.daysCount++;
      }
    });

    if (currentGroup) {
      groups.push(currentGroup);
    }

    return groups;
  }, [dateRange, t]);

  // Распределяем события по строкам (как на itch.io)
  const positionedEvents = useMemo(() => {
    const result: PositionedEvent[] = [];
    const rows: { end: number }[][] = [[]]; // массив строк, каждая строка содержит конечные даты событий

    sortedEvents.forEach(event => {
      // Сортируем этапы по количеству участников
      const sortedStages = [...(event.stages || [])].sort((a, b) => (b.maxParticipants || 0) - (a.maxParticipants || 0));
      const eventStart = Math.min(...sortedStages.map(stage => new Date(stage.dates.start).getTime()));
      const eventEnd = Math.max(...sortedStages.map(stage => new Date(stage.dates.end).getTime()));

      // Найдем подходящую строку для события
      let rowIndex = 0;
      let foundRow = false;

      while (!foundRow) {
        if (!rows[rowIndex]) {
          rows[rowIndex] = [];
        }

        // Проверяем, можем ли мы поместить событие в текущую строку
        const canFit = rows[rowIndex].every(existingEvent => {
          return existingEvent.end < eventStart;
        });

        if (canFit) {
          rows[rowIndex].push({ end: eventEnd });
          result.push({ 
            event: { 
              ...event, 
              stages: sortedStages // Используем отсортированные этапы
            }, 
            row: rowIndex 
          });
          foundRow = true;
        } else {
          rowIndex++;
        }
      }
    });

    return result;
  }, [sortedEvents]);

  return (
    <Box 
      h="100%" 
      w="100%" 
      overflow="auto" 
      bg={bgColor} 
      borderRadius="md" 
      borderWidth="1px" 
      borderColor={borderColor}
    >
      {/* Header with months and dates */}
      <VStack spacing={0} mb={4} position="sticky" top={0} bg={bgColor} zIndex={1}>
        {/* Months row */}
        <HStack spacing={0} width="100%" borderBottom="1px" borderColor={borderColor}>
          {monthGroups.map((group, index) => (
            <Box
              key={index}
              minW={`${group.daysCount * 240}px`}
              p={2}
              borderLeft="1px"
              borderColor={borderColor}
              bg={useColorModeValue(
                index % 2 === 0 ? 'gray.200' : 'gray.300',
                index % 2 === 0 ? 'gray.700' : 'gray.800'
              )}
              position="relative"
            >
              <Text 
                fontSize="lg" 
                fontWeight="medium" 
                position="sticky"
                left={0}
                right={0}
                mx="auto"
                display="block"
                width="200px"
                textAlign="center"
                whiteSpace="nowrap"
              >
                {`${group.month} ${group.year}`}
              </Text>
            </Box>
          ))}
        </HStack>

        {/* Days row */}
        <HStack spacing={0} width="100%">
          {dateRange.map((date, index) => {
            // Определяем, к какому месяцу относится день
            const monthIndex = monthGroups.findIndex(group => 
              index >= group.startIndex && 
              index < group.startIndex + group.daysCount
            );
            
            const weekday = date.toLocaleString('default', { weekday: 'long' }).toLowerCase();
            
            return (
              <Box
                key={index}
                minW="240px"
                p={2}
                borderLeft="1px"
                borderColor={borderColor}
                textAlign="center"
                bg={useColorModeValue(
                  monthIndex % 2 === 0 ? 'gray.50' : 'white',
                  monthIndex % 2 === 0 ? 'gray.700' : 'gray.800'
                )}
              >
                <Text fontSize="md">{date.getDate()}</Text>
                <Text fontSize="sm" color="gray.500">
                  {t(`calendar.weekDays.${weekday}`)}
                </Text>
              </Box>
            );
          })}
        </HStack>
      </VStack>

      {/* Events Grid */}
      <Box position="relative" minH="200px">
        {/* Background Grid */}
        <HStack spacing={0} position="absolute" top={0} left={0} width="100%" height="100%">
          {dateRange.map((_, index) => {
            // Определяем, к какому месяцу относится колонка
            const monthIndex = monthGroups.findIndex(group => 
              index >= group.startIndex && 
              index < group.startIndex + group.daysCount
            );

            return (
              <Box
                key={index}
                minW="240px"
                height="100%"
                borderLeft="1px"
                borderColor={borderColor}
                bg={useColorModeValue(
                  monthIndex % 2 === 0 ? 'gray.50' : 'white',
                  monthIndex % 2 === 0 ? 'gray.700' : 'gray.800'
                )}
                opacity={0.3}
              />
            );
          })}
        </HStack>

        {/* Events */}
        {positionedEvents.map(({ event, row }) => (
          <Box
            key={event.id}
            position="absolute"
            top={`${row * 80 + 5}px`}
            left={0}
            width="100%"
            height="70px"
          >
            {(event.stages || []).map((stage) => {
              const startDate = new Date(stage.dates.start);
              const endDate = new Date(stage.dates.end);
              const startIndex = dateRange.findIndex(
                d => d.toDateString() === startDate.toDateString()
              );
              const duration = Math.ceil(
                (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
              );

              return (
                <Box
                  key={stage.id}
                  position="absolute"
                  left={`${startIndex * 240}px`}
                  width={`${duration * 240}px`}
                  height="100%"
                  bg={`hsl(${(row * 60) % 360}, 70%, 60%)`}
                  opacity={0.8}
                  borderRadius="md"
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{
                    opacity: 1,
                    transform: 'translateY(-2px)',
                    boxShadow: 'md'
                  }}
                  onClick={() => onEventClick?.(event.id)}
                >
                  <Box p={2}>
                    <Text
                      fontSize="sm"
                      fontWeight="bold"
                      color="white"
                      noOfLines={2}
                      textShadow="0 0 2px rgba(0,0,0,0.5)"
                    >
                      {event.title} ({stage.maxParticipants || 0})
                    </Text>
                    <Text
                      fontSize="sm"
                      color="white"
                      noOfLines={1}
                      textShadow="0 0 2px rgba(0,0,0,0.5)"
                    >
                      {stage.title}
                    </Text>
                  </Box>
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
