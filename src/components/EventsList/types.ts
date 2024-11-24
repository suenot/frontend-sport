export type ViewType = 'list' | 'grid' | 'calendar' | 'map';

export interface Coordinate {
  lat: number;
  lng: number;
  title?: string;
  description?: string;
}

export interface Stage {
  id: string;
  title: string;
  type: string;
  description?: string;
  dates: {
    start: string;
    end: string;
  };
  location?: {
    city: string;
    venue?: string;
    address?: string;
    coordinates?: Coordinate;
    route?: Coordinate[];
  };
  status: 'draft' | 'published' | 'archived';
  maxParticipants?: number;
  currentParticipants?: number;
  requirements?: string[];
  results?: {
    url: string;
    summary: string;
    winners?: {
      place: number;
      participantId: string;
      name: string;
      result: string;
    }[];
  };
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  shortDescription?: string;
  media?: {
    banners: string[];
    thumbnails: string[];
    gallery: string[];
    videos: string[];
  };
  links?: {
    website?: string;
    registration?: string;
    results?: string;
    socialMedia?: {
      telegram?: string;
      vk?: string;
      instagram?: string;
    };
  };
  startDate: string;
  endDate?: string;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  imageUrl?: string;
  location?: {
    city: string;
    venue: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  stages?: Stage[];
  latitude?: number;
  longitude?: number;
  sportType: string;
  discipline: string;
  eventType: 'regional' | 'national' | 'international';
  ageGroup: string;
  gender: 'male' | 'female' | 'mixed';
  participantsCount?: number;
  organizer?: {
    id: string;
    name: string;
    logos: string[];
    contacts: {
      phone?: string;
      email?: string;
      address?: string;
    };
  };
  tags?: string[];
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export type EventStatus = Event['status'];
export type StageStatus = Stage['status'];
export type StageType = Stage['type'];
