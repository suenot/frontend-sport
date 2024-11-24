import { Box } from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { EventForm } from '../../../components/EventsList/EventForm';
import { Event } from '../../../components/EventsList/types';
import { EventsPageLayout } from '../../../components/EventsList/EventsPageLayout';

// Import options from data file
const sportTypes = ['Футбол', 'Баскетбол', 'Волейбол', 'Теннис', 'Хоккей'];
const disciplines = ['Профессионалы', 'Любители', 'Юниоры', 'Ветераны'];
const cities = ['Москва', 'Санкт-Петербург', 'Казань', 'Сочи', 'Екатеринбург'];
const ageGroups = ['Юниоры', 'Взрослые', 'Ветераны'];

export default function EventAddPage() {
  const { t } = useTranslation('common');
  const router = useRouter();

  const handleSubmit = (eventData: Partial<Event>) => {
    console.log('Creating event:', eventData);
    // В будущем здесь будет запрос к API
    router.push('/app');
  };

  return (
    <EventsPageLayout>
      <Box maxW="container.md" mx="auto">
        <EventForm
          onSubmit={handleSubmit}
          isEdit={false}
          sportTypes={sportTypes}
          disciplines={disciplines}
          cities={cities}
          ageGroups={ageGroups}
        />
      </Box>
    </EventsPageLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['common'])),
    },
  };
};
