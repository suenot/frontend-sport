'use client';

import React, { useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import Form from '@rjsf/chakra-ui';
import type { UiSchema } from '@rjsf/chakra-ui';
import { JSONSchema7 } from 'json-schema';
import { FormContextType, RJSFSchema, ValidatorType } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { getUpdatedSchema, uiSchema } from './schema';
import { RangeWidget } from './widgets';
import { useQueryStore } from '@deep-foundation/store/query';

export interface FiltersState {
  sportType: string;
  period: string;
  disciplines: string[];
  countries: string[];
  cities: string[];
  participantsRange: [number, number];
  gender: string;
  ageGroup: string;
  eventType: string;
  dateRange: {
    start: string;
    end: string;
  };
  status: string;
}

const defaultFilters: FiltersState = {
  sportType: '',
  period: '',
  disciplines: [],
  countries: [],
  cities: [],
  participantsRange: [0, 1000],
  gender: '',
  ageGroup: '',
  eventType: '',
  dateRange: {
    start: '',
    end: '',
  },
  status: '',
};

interface EventsFiltersProps {
  sportTypes: string[];
  disciplines: string[];
  cities: string[];
  countries: string[];
  ageGroups: string[];
}

export const EventsFilters: React.FC<EventsFiltersProps> = ({
  sportTypes,
  disciplines,
  cities,
  countries,
  ageGroups,
}) => {
  const { t } = useTranslation(['sections/events']);
  const [filters, setFilters] = useQueryStore<FiltersState>('filters', defaultFilters);

  // Получаем обновленную схему с актуальными данными для селектов
  const schema = useMemo(() => 
    getUpdatedSchema(t, sportTypes, disciplines, cities, countries, ageGroups),
    [t, sportTypes, disciplines, cities, countries, ageGroups]
  );

  // Кастомные виджеты для формы
  const widgets = {
    range: RangeWidget,
  };

  // Функция для локализации лейблов формы
  const transformErrors = (errors: any[]) => {
    return errors.map(error => {
      return {
        ...error,
        message: t(error.message)
      };
    });
  };

  // Обработчик изменений формы
  const handleChange = (e: any) => {
    const formData = e.formData;
    
    // Handle period changes
    if (formData.period !== filters.period) {
      const now = new Date();
      let endDate = new Date();
      
      switch (formData.period) {
        case '1month':
          endDate.setMonth(now.getMonth() + 1);
          break;
        case '3months':
          endDate.setMonth(now.getMonth() + 3);
          break;
        case '6months':
          endDate.setMonth(now.getMonth() + 6);
          break;
        case 'custom':
          // Keep existing date range for custom period
          break;
        default:
          // Reset date range for 'all' option
          formData.dateRange = defaultFilters.dateRange;
      }

      if (formData.period && formData.period !== 'custom') {
        formData.dateRange = {
          start: now.toISOString().split('T')[0],
          end: endDate.toISOString().split('T')[0],
        };
      }
    }

    setFilters(formData);
  };

  // Обработчик сброса фильтров
  const handleReset = () => {
    setFilters(defaultFilters);
  };

  return (
    <Box>
      <Form
        schema={schema as JSONSchema7}
        uiSchema={{
          ...uiSchema as UiSchema,
          'ui:submitButtonOptions': {
            norender: true,
          },
        }}
        validator={validator}
        formData={filters}
        onChange={handleChange}
        widgets={widgets}
        transformErrors={transformErrors}
        translateString={id => t(id)}
      >
        <Box display="none" />
      </Form>
    </Box>
  );
};
