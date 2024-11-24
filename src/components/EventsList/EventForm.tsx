import React from 'react';
import { useTranslation } from 'next-i18next';
import { Event } from './types';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
  Box,
  useToast,
} from '@chakra-ui/react';

interface EventFormProps {
  event?: Event | null | undefined;
  onSubmit: (event: Partial<Event>) => void;
  isEdit?: boolean;
  sportTypes: string[];
  disciplines: string[];
  cities: string[];
  ageGroups: string[];
}

interface EventFormState {
  title: string;
  shortDescription: string;
  description: string;
  sportType: string;
  discipline: string;
  eventType: 'regional' | 'national' | 'international';
  ageGroup: string;
  gender: 'male' | 'female' | 'mixed';
  participantsCount: number;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  location: {
    city: string;
    venue: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  media: {
    banners: any[];
    thumbnails: any[];
    gallery: any[];
    videos: any[];
  };
  links: {
    socialMedia: any;
  };
  stages: any[];
  tags: any[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

const emptyEvent: EventFormState = {
  title: '',
  shortDescription: '',
  description: '',
  sportType: '',
  discipline: '',
  eventType: 'regional',
  ageGroup: '',
  gender: 'mixed',
  participantsCount: 0,
  status: 'draft',
  location: {
    city: '',
    venue: '',
    address: '',
    coordinates: {
      lat: 0,
      lng: 0,
    },
  },
  media: {
    banners: [],
    thumbnails: [],
    gallery: [],
    videos: [],
  },
  links: {
    socialMedia: {},
  },
  stages: [],
  tags: [],
  seo: {
    title: '',
    description: '',
    keywords: []
  },
};

export const EventForm: React.FC<EventFormProps> = ({
  event,
  onSubmit,
  isEdit = false,
  sportTypes,
  disciplines,
  cities,
  ageGroups,
}) => {
  const { t } = useTranslation(['sections/events']);
  const toast = useToast();

  // Convert Event to EventFormState
  const convertEventToFormState = (event: Event | null | undefined): EventFormState => {
    if (!event) return emptyEvent;
    return {
      ...emptyEvent,
      ...event,
      location: {
        city: event.location?.city || '',
        venue: event.location?.venue || '',
        address: event.location?.address || '',
        coordinates: event.location?.coordinates || { lat: 0, lng: 0 },
      },
      media: {
        banners: event.media?.banners || [],
        thumbnails: event.media?.thumbnails || [],
        gallery: event.media?.gallery || [],
        videos: event.media?.videos || [],
      },
      links: {
        socialMedia: event.links?.socialMedia || {},
      },
      stages: event.stages || [],
      tags: event.tags || [],
      seo: {
        title: event.seo?.title || '',
        description: event.seo?.description || '',
        keywords: event.seo?.keywords || [],
      },
    };
  };

  // Начальное состояние формы
  const [formData, setFormData] = React.useState<EventFormState>(
    convertEventToFormState(event)
  );

  // Обработчик изменения полей формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev?.[parent as keyof typeof prev] as object),
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onSubmit(formData);
      toast({
        title: t(isEdit ? 'form.editSuccess' : 'form.addSuccess'),
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: t('form.error'),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch" pb={4}>
        <FormControl isRequired>
          <FormLabel>{t('form.title')}</FormLabel>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder={t('form.titlePlaceholder')}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t('form.shortDescription')}</FormLabel>
          <Textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder={t('form.shortDescriptionPlaceholder')}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t('form.description')}</FormLabel>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder={t('form.descriptionPlaceholder')}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t('form.sportType')}</FormLabel>
          <Select
            name="sportType"
            value={formData.sportType}
            onChange={handleChange}
            placeholder={t('form.sportTypePlaceholder')}
          >
            {sportTypes.map(sport => (
              <option key={sport} value={sport}>
                {t(`sports.${sport}`)}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t('form.discipline')}</FormLabel>
          <Select
            name="discipline"
            value={formData.discipline}
            onChange={handleChange}
            placeholder={t('form.disciplinePlaceholder')}
          >
            {disciplines.map(discipline => (
              <option key={discipline} value={discipline}>
                {t(`disciplines.${discipline}`)}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t('form.eventType')}</FormLabel>
          <Select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
          >
            <option value="regional">{t('form.types.regional')}</option>
            <option value="national">{t('form.types.national')}</option>
            <option value="international">{t('form.types.international')}</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t('form.location.city')}</FormLabel>
          <Select
            name="location.city"
            value={formData.location.city}
            onChange={handleChange}
            placeholder={t('form.location.cityPlaceholder')}
          >
            {cities.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t('form.location.venue')}</FormLabel>
          <Input
            name="location.venue"
            value={formData.location.venue}
            onChange={handleChange}
            placeholder={t('form.location.venuePlaceholder')}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t('form.location.address')}</FormLabel>
          <Input
            name="location.address"
            value={formData.location.address}
            onChange={handleChange}
            placeholder={t('form.location.addressPlaceholder')}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t('form.ageGroup')}</FormLabel>
          <Select
            name="ageGroup"
            value={formData.ageGroup}
            onChange={handleChange}
            placeholder={t('form.ageGroupPlaceholder')}
          >
            {ageGroups.map(ageGroup => (
              <option key={ageGroup} value={ageGroup}>
                {ageGroup}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t('form.gender')}</FormLabel>
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="male">{t('form.genders.male')}</option>
            <option value="female">{t('form.genders.female')}</option>
            <option value="mixed">{t('form.genders.mixed')}</option>
          </Select>
        </FormControl>

        <Button type="submit" colorScheme="blue" size="lg" w="100%">
          {t(isEdit ? 'actions.saveEvent' : 'actions.addEvent')}
        </Button>
      </VStack>
    </Box>
  );
};
