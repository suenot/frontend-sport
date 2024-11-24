import { useRouter } from 'next/router';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import type { GetStaticProps, GetStaticPaths } from 'next';
import { useEventData } from '../../../../hooks/useEventData';
import { EventForm } from '../../../../components/EventsList/EventForm';
import { Event } from '../../../../components/EventsList/types';
import { EventsPageLayout } from '../../../../components/EventsList/EventsPageLayout';

// Import options from data file
const sportTypes = ['Футбол', 'Баскетбол', 'Волейбол', 'Теннис', 'Хоккей'];
const disciplines = ['Профессионалы', 'Любители', 'Юниоры', 'Ветераны'];
const cities = ['Москва', 'Санкт-Петербург', 'Казань', 'Сочи', 'Екатеринбург'];
const ageGroups = ['Юниоры', 'Взрослые', 'Ветераны'];

export default function EventEditPage() {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation('common');
  const { getEventById } = useEventData();

  const event = id && typeof id === 'string' ? getEventById(id) : null;

  const handleSubmit = (eventData: Partial<Event>) => {
    console.log('Updating event:', eventData);
    // В будущем здесь будет запрос к API
    router.push('/app');
  };

  if (!event) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <EventsPageLayout>
      <Box maxW="container.md" mx="auto">
        <EventForm
          event={event}
          onSubmit={handleSubmit}
          isEdit={true}
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
