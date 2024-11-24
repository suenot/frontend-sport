import { faker } from '@faker-js/faker/locale/ru';
import { Event, Stage, EventStatus, StageStatus, StageType } from './types';

// Устанавливаем фиксированный seed для воспроизводимой генерации данных
faker.seed(123);

const stageTypes: StageType[] = ['registration', 'qualification', 'semifinal', 'final', 'other'];
const stageStatuses: StageStatus[] = ['draft', 'published', 'archived'];
const eventStatuses: EventStatus[] = ['draft', 'published', 'cancelled', 'completed'];
const eventTypes = ['regional', 'national', 'international'];
const genderTypes = ['male', 'female', 'mixed'];
export const sportTypes = ['Футбол', 'Баскетбол', 'Волейбол', 'Теннис', 'Хоккей'];
export const disciplines = ['Профессионалы', 'Любители', 'Юниоры', 'Ветераны'];
export const cities = ['Москва', 'Санкт-Петербург', 'Казань', 'Сочи', 'Екатеринбург'];
export const countries = ['Россия', 'Беларусь', 'Казахстан', 'Армения', 'Узбекистан'];
const venues = ['Стадион', 'Спортивный комплекс', 'Арена', 'Дворец спорта', 'Центр'];

type Coordinate = {
  lat: number;
  lng: number;
  title?: string;
  description?: string;
};

const generatePlaceholderImage = (width: number, height: number, text: string) => {
  return `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(text)}`;
};

const generateStage = (index: number, eventStartDate: Date): Stage => {
  const startDate = new Date(eventStartDate);
  startDate.setDate(startDate.getDate() + index * 7); // Каждый этап начинается через неделю
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 3); // Этап длится 3 дня
  
  // Generate 2-5 coordinates for each stage
  const numCoordinates = faker.number.int({ min: 2, max: 5 });
  const coordinates: Coordinate[] = Array.from({ length: numCoordinates }, (_, i) => ({
    lat: Number(faker.location.latitude()),
    lng: Number(faker.location.longitude()),
    title: `Точка ${i + 1}`,
    description: faker.lorem.sentence()
  }));
  
  return {
    id: `stage-${index + 1}`,
    title: `Этап ${index + 1}: ${faker.word.words(2)}`,
    type: stageTypes[index % stageTypes.length],
    description: faker.lorem.paragraph(),
    dates: {
      start: startDate.toISOString(),
      end: endDate.toISOString()
    },
    location: {
      city: cities[index % cities.length],
      venue: `${venues[index % venues.length]} "${faker.company.name()}"`,
      address: faker.location.streetAddress(),
      coordinates: coordinates[0], // Main location
      route: coordinates // All coordinates including checkpoints
    },
    status: stageStatuses[index % stageStatuses.length],
    maxParticipants: 50 + (index * 10),
    currentParticipants: 30 + (index * 5),
    requirements: Array.from({ length: 3 }, () => faker.lorem.sentence()),
    results: faker.datatype.boolean() ? {
      url: faker.internet.url(),
      summary: faker.lorem.paragraph(),
      winners: Array.from({ length: 3 }, (_, i) => ({
        place: i + 1,
        participantId: `participant-${i + 1}`,
        name: faker.person.fullName(),
        result: `${faker.number.int({ min: 80, max: 100 })} очков`
      }))
    } : undefined
  };
};

const generateEvent = (index: number): Event => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + index * 14); // Каждое событие начинается через 2 недели
  const stagesCount = faker.number.int({ min: 2, max: 4 });
  const sportType = sportTypes[index % sportTypes.length];
  
  return {
    id: `event-${index + 1}`,
    title: `${sportType} - ${faker.company.catchPhrase()}`,
    description: faker.lorem.paragraphs(2),
    shortDescription: faker.lorem.sentence(),
    startDate: startDate.toISOString(),
    media: {
      banners: Array.from({ length: 2 }, () => generatePlaceholderImage(800, 400, sportType)),
      thumbnails: Array.from({ length: 2 }, () => generatePlaceholderImage(200, 200, sportType)),
      gallery: Array.from({ length: 5 }, () => generatePlaceholderImage(400, 300, sportType)),
      videos: Array.from({ length: 2 }, () => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    },
    links: {
      website: faker.internet.url(),
      registration: faker.internet.url(),
      socialMedia: {
        telegram: 'https://t.me/sportevent',
        vk: 'https://vk.com/sportevent',
        instagram: 'https://instagram.com/sportevent'
      }
    },
    stages: Array.from({ length: stagesCount }, (_, i) => generateStage(i, startDate)),
    location: {
      city: cities[index % cities.length],
      venue: `${venues[index % venues.length]} "${faker.company.name()}"`,
      address: faker.location.streetAddress(),
      coordinates: {
        lat: Number(faker.location.latitude()),
        lng: Number(faker.location.longitude())
      }
    },
    sportType: sportType,
    discipline: disciplines[index % disciplines.length],
    eventType: eventTypes[index % eventTypes.length] as Event['eventType'],
    ageGroup: faker.helpers.arrayElement(['6-12', '13-17', '18-25', '26-35', '36+']),
    gender: faker.helpers.arrayElement(genderTypes) as Event['gender'],
    participantsCount: faker.number.int({ min: 50, max: 1000 }),
    status: eventStatuses[index % eventStatuses.length],
    organizer: {
      id: `organizer-${index + 1}`,
      name: faker.company.name(),
      logos: Array.from({ length: 2 }, () => generatePlaceholderImage(100, 100, 'Logo')),
      contacts: {
        email: faker.internet.email(),
        phone: faker.helpers.fromRegExp('+7[0-9]{10}')
      }
    },
    tags: Array.from({ length: 3 }, () => faker.word.sample()),
    seo: {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      keywords: Array.from({ length: 5 }, () => faker.word.sample())
    }
  };
};

export const generateEvents = (count: number = 100): Event[] => {
  return Array.from({ length: count }, (_, index) => generateEvent(index));
};

export const mockEvents = generateEvents();
