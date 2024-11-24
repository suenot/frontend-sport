import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import type { GetStaticProps } from 'next';
import { useEventData } from '../../hooks/useEventData';
import { EventsPageLayout } from '../../components/EventsList/EventsPageLayout';
import { useState } from 'react';

export default function AppHome() {
  const { t } = useTranslation('sections/events');
  const [role, setRole] = useState<'user' | 'manager'>('user');

  return (
    <EventsPageLayout 
      title={t('title')}
      role={role}
      onRoleChange={setRole}
      showEventsList={true}
    />
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['sections/events', 'sections/common'])),
    },
  };
};
