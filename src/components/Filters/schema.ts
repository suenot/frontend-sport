import { JSONSchema7, JSONSchema7Definition } from 'json-schema';
import { FormContextType, RJSFSchema, UiSchema } from '@rjsf/utils';
import { TFunction } from 'next-i18next';

export const getFilterSchema = (t: TFunction): JSONSchema7 => {
  const schema: JSONSchema7 = {
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
        oneOf: [
          { const: '', title: t('filter.all') },
          { const: '1month', title: t('filter.period.1month') },
          { const: '3months', title: t('filter.period.3months') },
          { const: '6months', title: t('filter.period.6months') },
          { const: 'custom', title: t('filter.period.custom') }
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
        oneOf: [
          { const: '', title: t('filter.all') },
          { const: 'male', title: t('filter.genderMale') },
          { const: 'female', title: t('filter.genderFemale') },
          { const: 'mixed', title: t('filter.genderMixed') }
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
        oneOf: [
          { const: '', title: t('filter.all') },
          { const: 'regional', title: t('filter.eventTypeRegional') },
          { const: 'national', title: t('filter.eventTypeNational') },
          { const: 'international', title: t('filter.eventTypeInternational') }
        ],
        default: '',
      },
      status: {
        type: 'string',
        title: t('filter.status'),
        enum: ['', 'draft', 'published', 'cancelled', 'completed'],
        oneOf: [
          { const: '', title: t('filter.all') },
          { const: 'draft', title: t('status.draft') },
          { const: 'published', title: t('status.published') },
          { const: 'cancelled', title: t('status.cancelled') },
          { const: 'completed', title: t('status.completed') }
        ],
        default: '',
      },
    },
  };
  return schema;
};

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
): JSONSchema7 => {
  const baseSchema = getFilterSchema(t);
  const schema: JSONSchema7 = {
    ...baseSchema,
    properties: {
      ...(baseSchema.properties as { [key: string]: JSONSchema7 }),
      sportType: {
        ...(baseSchema.properties?.sportType as JSONSchema7),
        enum: ['', ...sportTypes],
        oneOf: [
          { const: '', title: t('filter.all') },
          ...sportTypes.map(type => ({ const: type, title: t(`sports.${type}`) })),
        ],
      },
      disciplines: {
        ...(baseSchema.properties?.disciplines as JSONSchema7),
        items: {
          ...(baseSchema.properties?.disciplines as JSONSchema7).items as JSONSchema7,
          enum: ['', ...disciplines],
          oneOf: [
            { const: '', title: t('filter.all') },
            ...disciplines.map(disc => ({ const: disc, title: t(`disciplines.${disc}`) })),
          ],
        },
      },
      cities: {
        ...(baseSchema.properties?.cities as JSONSchema7),
        items: {
          ...(baseSchema.properties?.cities as JSONSchema7).items as JSONSchema7,
          enum: ['', ...cities],
          oneOf: [
            { const: '', title: t('filter.all') },
            ...cities.map(city => ({ const: city, title: city })),
          ],
        },
      },
      countries: {
        ...(baseSchema.properties?.countries as JSONSchema7),
        items: {
          ...(baseSchema.properties?.countries as JSONSchema7).items as JSONSchema7,
          enum: ['', ...countries],
          oneOf: [
            { const: '', title: t('filter.all') },
            ...countries.map(country => ({ const: country, title: country })),
          ],
        },
      },
      ageGroup: {
        ...(baseSchema.properties?.ageGroup as JSONSchema7),
        enum: ['', ...ageGroups],
        oneOf: [
          { const: '', title: t('filter.all') },
          ...ageGroups.map(ageGroup => ({ const: ageGroup, title: ageGroup })),
        ],
      },
    },
  };
  return schema;
};
