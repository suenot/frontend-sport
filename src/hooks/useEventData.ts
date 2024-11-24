import { useLocalStore } from '@deep-foundation/store/local';
import { mockEvents } from '../components/EventsList/data';
import { Event } from '../components/EventsList/types';

export const useEventData = () => {
  const [isDemo] = useLocalStore('demo', true);

  const getEvents = (): Event[] => {
    if (isDemo) {
      return mockEvents;
    }
    // В будущем здесь будет запрос к API
    return [];
  };

  const getEventById = (id: string): Event | null => {
    if (isDemo) {
      return mockEvents.find(event => event.id === id) || null;
    }
    // В будущем здесь будет запрос к API
    return null;
  };

  return {
    isDemo,
    getEvents,
    getEventById,
  };
};
