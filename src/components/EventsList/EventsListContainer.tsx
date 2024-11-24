'use client';

import React, { useCallback, useState } from 'react';
import { Box, IconButton, useBreakpointValue, useDisclosure, useToast } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { EventsListUI } from './EventsListUI';
import { FiltersDrawer } from '../Filters/FiltersDrawer';
import { EventDrawer } from './EventDrawer';
import { EventFormDrawer } from './EventFormDrawer';
import { Event, ViewType } from './types';
import { useEventData } from '../../hooks/useEventData';
import { useQueryStore } from '@deep-foundation/store/query';

interface EventsListContainerProps {
  events: Event[];
  isLoading: boolean;
  role?: string;
  onEventEdit?: (event: Event) => void;
  onEventDelete?: (eventId: string) => void;
  sportTypes: string[];
  disciplines: string[];
  cities: string[];
  countries: string[];
  ageGroups: string[];
}

export const EventsListContainer: React.FC<EventsListContainerProps> = ({
  events,
  isLoading,
  role,
  onEventEdit,
  onEventDelete,
  sportTypes,
  disciplines,
  cities,
  countries,
  ageGroups,
}) => {
  const router = useRouter();
  const toast = useToast();
  const { t } = useTranslation(['sections/events']);
  const { getEventById } = useEventData();
  
  // Используем хуки для управления состоянием
  const [isEventViewOpen, setIsEventViewOpen] = useQueryStore('events.view.open', false);
  const [isEventEditOpen, setIsEventEditOpen] = useQueryStore('events.edit.open', false);
  const [isEventAddOpen, setIsEventAddOpen] = useQueryStore('events.add.open', false);
  const [currentEventId, setCurrentEventId] = useQueryStore<string | null>('events.current', null);
  const [viewType, setViewType] = useState<ViewType>('list');

  const {
    isOpen: isFiltersOpen,
    onOpen: onFiltersOpen,
    onClose: onFiltersClose,
  } = useDisclosure();

  // Получаем текущее событие
  const currentEvent = currentEventId ? getEventById(currentEventId) : null;

  // Функции для открытия/закрытия drawer'ов
  const openEventView = (eventId: string) => {
    setCurrentEventId(eventId);
    setIsEventViewOpen(true);
  };

  const openEventEdit = (eventId: string) => {
    setCurrentEventId(eventId);
    setIsEventEditOpen(true);
  };

  const openEventAdd = () => {
    setIsEventAddOpen(true);
  };

  const closeEvent = () => {
    setIsEventViewOpen(false);
    setIsEventEditOpen(false);
    setIsEventAddOpen(false);
    setCurrentEventId(null);
  };

  // Обработчик клика по событию
  const handleEventClick = useCallback((eventId: string) => {
    openEventView(eventId);
  }, []);

  // Обработчик редактирования события
  const handleEventEdit = (event: Event) => {
    openEventEdit(event.id);
  };

  // Обработчик удаления события
  const handleEventDelete = (eventId: string) => {
    onEventDelete?.(eventId);
  };

  // Обработчик сохранения события
  const handleEventSave = (eventData: Partial<Event>) => {
    if (currentEvent) {
      onEventEdit?.({ ...currentEvent, ...eventData });
    }
    closeEvent();
  };

  const handleViewTypeChange = useCallback((newViewType: ViewType) => {
    setViewType(newViewType);
  }, []);

  return (
    <Box position="relative">
      {/* Кнопки управления drawer'ами */}
      <Box
        position="fixed"
        top="4"
        right="4"
        zIndex="sticky"
        display="flex"
        gap="2"
      >
        {role === 'manager' && (
          <IconButton
            aria-label="Add event"
            icon={<AddIcon />}
            onClick={openEventAdd}
            colorScheme="green"
            variant="solid"
          />
        )}
      </Box>

      {/* Основной контент */}
      <Box
        maxWidth="container.xl"
        mx="auto"
        px={4}
        pt={8}
        pb={4}
      >
        <EventsListUI
          events={events}
          isLoading={isLoading}
          role={role}
          onEventClick={handleEventClick}
          onEventEdit={handleEventEdit}
          onEventDelete={handleEventDelete}
          viewType={viewType}
          onViewTypeChange={handleViewTypeChange}
          onFiltersClick={onFiltersOpen}
        />
      </Box>

      {/* Drawer с фильтрами */}
      <FiltersDrawer
        isOpen={isFiltersOpen}
        onClose={onFiltersClose}
        sportTypes={sportTypes}
        disciplines={disciplines}
        cities={cities}
        countries={countries}
        ageGroups={ageGroups}
      />

      {/* Drawer для просмотра события */}
      {currentEvent && (
        <EventDrawer
          event={currentEvent}
          isOpen={isEventViewOpen}
          onClose={closeEvent}
          onEdit={handleEventEdit}
          onDelete={handleEventDelete}
          role={role}
        />
      )}

      {/* Drawer для редактирования/добавления события */}
      <EventFormDrawer
        event={currentEvent}
        isOpen={isEventEditOpen || isEventAddOpen}
        onClose={closeEvent}
        onSubmit={handleEventSave}
        sportTypes={sportTypes}
        disciplines={disciplines}
        cities={cities}
        ageGroups={ageGroups}
      />
    </Box>
  );
};
