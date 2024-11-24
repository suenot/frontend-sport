'use client';

import React from 'react';
import { useTranslation } from 'next-i18next';
import { AppDrawer } from '../common/AppDrawer';
import { EventsFilters } from './EventsFilters';
import { Box } from '@chakra-ui/react';
import { TelegramSubscribeButton } from './TelegramSubscribeButton';
import { useQueryStore } from '@deep-foundation/store/query';

interface FiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sportTypes: string[];
  disciplines: string[];
  cities: string[];
  countries: string[];
  ageGroups: string[];
}

export const FiltersDrawer: React.FC<FiltersDrawerProps> = ({
  isOpen,
  onClose,
  sportTypes,
  disciplines,
  cities,
  countries,
  ageGroups,
}) => {
  const { t } = useTranslation(['sections/events']);
  const [filters] = useQueryStore('filters');

  return (
    <AppDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={t('filter.title')} 
      placement="left"
    >
      <Box 
        maxHeight="calc(100vh - 120px)" 
        overflowY="auto"
        px={2}
      >
        <TelegramSubscribeButton filters={filters} />
        <EventsFilters
          sportTypes={sportTypes}
          disciplines={disciplines}
          cities={cities}
          countries={countries}
          ageGroups={ageGroups}
        />
      </Box>
    </AppDrawer>
  );
};
