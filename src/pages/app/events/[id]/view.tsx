import { useRouter } from 'next/router';
import { Box, Heading, Text, Badge, Image, VStack, SimpleGrid, Divider, Spinner, Center } from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import type { GetStaticProps, GetStaticPaths } from 'next';
import { useEventData } from '../../../../hooks/useEventData';
import { EventsPageLayout } from '../../../../components/EventsList/EventsPageLayout';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'published':
      return 'blue';
    case 'draft':
      return 'gray';
    case 'cancelled':
      return 'red';
    case 'completed':
      return 'green';
    default:
      return 'gray';
  }
};

export default function EventViewPage() {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation('common');
  const { getEventById } = useEventData();

  const event = id && typeof id === 'string' ? getEventById(id) : null;

  if (!event) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  const title = `${t(`events.sports.${event.sportType}`)} - ${event.title.split(' - ')[1]}`;

  return (
    <EventsPageLayout>
      <VStack spacing={6} align="stretch">
        {event.media?.thumbnails?.[0] && (
          <Image
            src={event.media.thumbnails[0]}
            alt={event.title}
            objectFit="cover"
            borderRadius="lg"
            fallbackSrc="https://via.placeholder.com/800x400"
          />
        )}

        <Box>
          <Badge
            colorScheme={getStatusColor(event.status)}
            mb={2}
            px={2}
            py={1}
            borderRadius="full"
          >
            {t(`events.status.${event.status}`)}
          </Badge>
          <Text color="gray.600" fontSize="lg">
            {event.shortDescription}
          </Text>
        </Box>

        <Divider />

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Box>
            <Heading size="md" mb={3}>{t('events.location')}</Heading>
            <Text fontSize="lg">{event.location?.city}</Text>
            <Text color="gray.600">{event.location?.venue}</Text>
            <Text color="gray.600">{event.location?.address}</Text>
          </Box>
          <Box>
            <Heading size="md" mb={3}>{t('events.sportType')}</Heading>
            <Text fontSize="lg">{t(`events.sports.${event.sportType}`)}</Text>
            <Text color="gray.600">{t(`events.disciplines.${event.discipline}`)}</Text>
          </Box>
        </SimpleGrid>

        <Box>
          <Heading size="md" mb={4}>{t('events.stages')}</Heading>
          <VStack spacing={4} align="stretch">
            {(event.stages || []).map((stage) => (
              <Box
                key={stage.id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
              >
                <Text fontWeight="bold">
                  {t('events.stage.title', {
                    number: stage.title.split(':')[0].split(' ')[1],
                    name: stage.title.split(':')[1].trim(),
                  })}
                </Text>
                <Badge
                  colorScheme={getStatusColor(stage.status)}
                  mt={1}
                >
                  {t(`events.stage.status.${stage.status}`)}
                </Badge>
                {stage.description && (
                  <Text mt={2} color="gray.600">
                    {stage.description}
                  </Text>
                )}
              </Box>
            ))}
          </VStack>
        </Box>
      </VStack>
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
