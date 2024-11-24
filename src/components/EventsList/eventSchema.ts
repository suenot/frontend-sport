import { JSONSchema7 } from 'json-schema';
import { TFunction } from 'next-i18next';

export const getEventSchema = (t: TFunction): JSONSchema7 => ({
  type: 'object',
  required: ['title', 'shortDescription', 'sportType', 'discipline', 'location', 'stages'],
  properties: {
    title: {
      type: 'string',
      title: t('form.title'),
      description: t('form.tooltips.title')
    },
    shortDescription: {
      type: 'string',
      title: t('form.shortDescription'),
      description: t('form.tooltips.shortDescription')
    },
    description: {
      type: 'string',
      title: t('form.description'),
      description: t('form.tooltips.description')
    },
    sportType: {
      type: 'string',
      title: t('form.sportType'),
      description: t('form.tooltips.sportType'),
      enum: ['football', 'basketball', 'volleyball', 'tennis', 'hockey']
    },
    discipline: {
      type: 'string',
      title: t('form.discipline'),
      description: t('form.tooltips.discipline'),
      enum: ['professional', 'amateur', 'junior', 'veteran']
    },
    eventType: {
      type: 'string',
      title: t('form.eventType'),
      description: t('form.tooltips.eventType'),
      enum: ['regional', 'national', 'international']
    },
    ageGroup: {
      type: 'string',
      title: t('form.ageGroup'),
      description: t('form.tooltips.ageGroup'),
      enum: ['6-12', '13-17', '18-25', '26-35', '36+']
    },
    gender: {
      type: 'string',
      title: t('form.gender'),
      description: t('form.tooltips.gender'),
      enum: ['male', 'female', 'mixed']
    },
    location: {
      type: 'object',
      title: t('form.location.title'),
      required: ['city', 'venue', 'address'],
      properties: {
        city: {
          type: 'string',
          title: t('form.location.city'),
          description: t('form.tooltips.location.city')
        },
        venue: {
          type: 'string',
          title: t('form.location.venue'),
          description: t('form.tooltips.location.venue')
        },
        address: {
          type: 'string',
          title: t('form.location.address'),
          description: t('form.tooltips.location.address')
        }
      }
    },
    stages: {
      type: 'array',
      title: t('form.stages.title'),
      description: t('form.tooltips.stages.title'),
      minItems: 1,
      items: {
        type: 'object',
        required: ['title', 'type', 'dates'],
        properties: {
          title: {
            type: 'string',
            title: t('form.stages.stageTitle')
          },
          type: {
            type: 'string',
            title: t('form.stages.type'),
            description: t('form.tooltips.stages.type'),
            enum: ['registration', 'qualification', 'semifinal', 'final', 'other']
          },
          description: {
            type: 'string',
            title: t('form.stages.description')
          },
          dates: {
            type: 'object',
            title: t('form.stages.dates.title'),
            description: t('form.tooltips.stages.dates'),
            required: ['start', 'end'],
            properties: {
              start: {
                type: 'string',
                title: t('form.stages.dates.start'),
                format: 'date'
              },
              end: {
                type: 'string',
                title: t('form.stages.dates.end'),
                format: 'date'
              }
            }
          }
        }
      }
    }
  }
});

export const getUiSchema = (t: TFunction) => ({
  description: {
    'ui:widget': 'textarea'
  },
  shortDescription: {
    'ui:widget': 'textarea'
  },
  sportType: {
    'ui:enumNames': [
      t('sports.football'),
      t('sports.basketball'),
      t('sports.volleyball'),
      t('sports.tennis'),
      t('sports.hockey')
    ]
  },
  discipline: {
    'ui:enumNames': [
      t('disciplines.professional'),
      t('disciplines.amateur'),
      t('disciplines.junior'),
      t('disciplines.veteran')
    ]
  },
  eventType: {
    'ui:enumNames': [
      t('form.types.regional'),
      t('form.types.national'),
      t('form.types.international')
    ],
    'ui:help': t('form.popovers.eventType.title'),
    'ui:options': {
      popover: {
        regional: t('form.popovers.eventType.regional'),
        national: t('form.popovers.eventType.national'),
        international: t('form.popovers.eventType.international')
      }
    }
  },
  gender: {
    'ui:enumNames': [
      t('form.genders.male'),
      t('form.genders.female'),
      t('form.genders.mixed')
    ]
  },
  stages: {
    'ui:options': {
      orderable: true,
      popover: {
        title: t('form.popovers.stages.title'),
        registration: t('form.popovers.stages.registration'),
        qualification: t('form.popovers.stages.qualification'),
        semifinal: t('form.popovers.stages.semifinal'),
        final: t('form.popovers.stages.final')
      }
    },
    items: {
      description: {
        'ui:widget': 'textarea'
      },
      type: {
        'ui:enumNames': [
          t('stage.type.registration'),
          t('stage.type.qualification'),
          t('stage.type.semifinal'),
          t('stage.type.final'),
          t('stage.type.other')
        ]
      }
    }
  }
});
