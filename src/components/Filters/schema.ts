import { RJSFSchema } from '@rjsf/utils';
import { UiSchema } from '@rjsf/utils';
import { TFunction } from 'next-i18next';

export const getFilterSchema = (t: TFunction): RJSFSchema => ({
  type: 'object',
  properties: {
    sportType: {
      type: 'string',
      title: t('filter.sportType'),
      default: '',
    },
    period: {
      type: 'string',
      title: t('filter.period'),
      enum: ['', '1month', '3months', '6months', 'custom'],
      enumNames: [
        t('filter.all'),
        t('filter.period.1month'),
        t('filter.period.3months'),
        t('filter.period.6months'),
        t('filter.period.custom')
      ],
      default: '',
    },
    dateRange: {
      type: 'object',
      title: '',
      properties: {
        start: {
          type: 'string',
          format: 'date',
          title: t('filter.dateRange.start'),
        },
        end: {
          type: 'string',
          format: 'date',
          title: t('filter.dateRange.end'),
        },
      },
    },
    countries: {
      type: 'array',
      title: t('filter.countries'),
      items: {
        type: 'string',
      },
      uniqueItems: true,
      default: [],
    },
    cities: {
      type: 'array',
      title: t('filter.cities'),
      items: {
        type: 'string',
      },
      uniqueItems: true,
      default: [],
    },
    disciplines: {
      type: 'array',
      title: t('filter.disciplines'),
      items: {
        type: 'string',
      },
      uniqueItems: true,
      default: [],
    },
    participantsRange: {
      type: 'array',
      title: t('filter.participants'),
      items: {
        type: 'number',
        minimum: 0,
        maximum: 1000,
      },
      minItems: 2,
      maxItems: 2,
      default: [0, 1000],
    },
    gender: {
      type: 'string',
      title: t('filter.gender'),
      enum: ['', 'male', 'female', 'mixed'],
      enumNames: [
        t('filter.all'),
        t('filter.genderMale'),
        t('filter.genderFemale'),
        t('filter.genderMixed')
      ],
      default: '',
    },
    ageGroup: {
      type: 'string',
      title: t('filter.ageGroup'),
      default: '',
    },
    eventType: {
      type: 'string',
      title: t('filter.eventType'),
      enum: ['', 'regional', 'national', 'international'],
      enumNames: [
        t('filter.all'),
        t('filter.eventTypeRegional'),
        t('filter.eventTypeNational'),
        t('filter.eventTypeInternational')
      ],
      default: '',
    },
    status: {
      type: 'string',
      title: t('filter.status'),
      enum: ['', 'draft', 'published', 'cancelled', 'completed'],
      enumNames: [
        t('filter.all'),
        t('status.draft'),
        t('status.published'),
        t('status.cancelled'),
        t('status.completed')
      ],
      default: '',
    },
  },
});

export const uiSchema: UiSchema = {
  'ui:submitButtonOptions': {
    norender: true,
  },
  '*': {
    classNames: 'filter-field',
    'ui:titleMargin': '0.5rem',
    'ui:titleProps': {
      fontSize: 'sm',
      color: 'gray.600'
    }
  },
  participantsRange: {
    'ui:widget': 'range',
  },
  dateRange: {
    'ui:field': 'dateRange',
    classNames: 'date-range-field',
    'ui:titleProps': {
      fontSize: 'xs',
      fontWeight: '500',
      color: 'gray.600'
    }
  },
  countries: {
    'ui:widget': 'checkboxes',
  },
  cities: {
    'ui:widget': 'checkboxes',
  },
  disciplines: {
    'ui:widget': 'checkboxes',
  },
};

// Функция для обновления схемы с динамическими данными
export const getUpdatedSchema = (
  t: TFunction,
  sportTypes: string[],
  disciplines: string[],
  cities: string[],
  countries: string[],
  ageGroups: string[],
): RJSFSchema => {
  const baseSchema = getFilterSchema(t);
  return {
    ...baseSchema,
    properties: {
      ...baseSchema.properties,
      sportType: {
        ...baseSchema.properties.sportType,
        enum: ['', ...sportTypes],
        enumNames: [t('filter.all'), ...sportTypes.map(type => t(`sports.${type}`))],
      },
      disciplines: {
        ...baseSchema.properties.disciplines,
        items: {
          ...baseSchema.properties.disciplines.items,
          enum: ['', ...disciplines],
          enumNames: [t('filter.all'), ...disciplines.map(disc => t(`disciplines.${disc}`))],
        },
      },
      cities: {
        ...baseSchema.properties.cities,
        items: {
          ...baseSchema.properties.cities.items,
          enum: ['', ...cities],
          enumNames: [t('filter.all'), ...cities],
        },
      },
      countries: {
        ...baseSchema.properties.countries,
        items: {
          ...baseSchema.properties.countries.items,
          enum: ['', ...countries],
          enumNames: [t('filter.all'), ...countries],
        },
      },
      ageGroup: {
        ...baseSchema.properties.ageGroup,
        enum: ['', ...ageGroups],
        enumNames: [t('filter.all'), ...ageGroups],
      },
    },
  };
};
