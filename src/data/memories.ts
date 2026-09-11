export interface MemoryPlace {
  id: string;
  title: string;
  subtitle: string;
  country: string;
  description: string;
  weather: string;
  spotName: string;
  locationDetails: string;
  image: string;
  liked: boolean;
  likesCount: number;
  categoryIcon: 'camera' | 'bookmark' | 'sparkle' | 'heart';
}

const DEFAULT_MEMORIES: MemoryPlace[] = [
  {
    id: '1',
    title: 'The First Spark',
    subtitle: 'A Moment Worth Keeping',
    country: 'With You ❤️',
    description: 'One ordinary moment became a beautiful memory because I got to share it with you.',
    weather: 'A Soft, Happy Day',
    spotName: 'Our Favorite Beginning',
    locationDetails: 'A memory made together',
    image: '/memories/IMG_20260910_210339_947.jpg',
    liked: true,
    likesCount: 128,
    categoryIcon: 'bookmark',
  },
  {
    id: '2',
    title: 'Little Things, Big Feelings',
    subtitle: 'The Sweetest Details',
    country: 'Just Us ✨',
    description: 'It is the small details, quiet smiles, and time beside you that make every day feel special.',
    weather: 'Warm Memories',
    spotName: 'The Little Things',
    locationDetails: 'A moment close to my heart',
    image: '/memories/IMG_20260911_014639_593.jpg',
    liked: false,
    likesCount: 94,
    categoryIcon: 'camera',
  },
  {
    id: '3',
    title: 'Our Kind of Happy',
    subtitle: 'Laughs We Share',
    country: 'Favorite People 💕',
    description: 'Every laugh feels brighter when it is yours, and every memory feels better when we make it together.',
    weather: 'Bright & Peaceful',
    spotName: 'A Happy Place',
    locationDetails: 'Where our laughter lives',
    image: '/memories/IMG_20260911_015324_847.jpg',
    liked: false,
    likesCount: 112,
    categoryIcon: 'bookmark',
  },
  {
    id: '4',
    title: 'Always Better Together',
    subtitle: 'Wherever We Go',
    country: 'Our Little World 🌷',
    description: 'The place matters less than the person beside me. With you, even the simplest day becomes a story.',
    weather: 'Golden Hour',
    spotName: 'Anywhere With You',
    locationDetails: 'Everywhere feels right',
    image: '/memories/IMG_20260911_015608_593.jpg',
    liked: true,
    likesCount: 145,
    categoryIcon: 'sparkle',
  },
  {
    id: '5',
    title: 'A Memory I Will Keep',
    subtitle: 'Forever In My Heart',
    country: 'Us, Always 🌅',
    description: 'Some memories stay gentle and bright forever. This is one of the moments I will always carry with me.',
    weather: 'Calm & Golden',
    spotName: 'A Forever Memory',
    locationDetails: 'Saved with all my heart',
    image: '/memories/IMG_20260911_015610_653.jpg',
    liked: false,
    likesCount: 76,
    categoryIcon: 'heart',
  },
];

export const PICTURE_FILES = [
  'IMG_20260911_015749_909.jpg',
  'IMG_20260911_020125_988.jpg',
  'IMG_20260911_020419_500.jpg',
  'IMG_20260911_020421_922.jpg',
  'IMG_20260911_025344_887.jpg',
  'IMG_20260911_025308_315.jpg',
  'IMG_20260911_025321_514.jpg',
  'IMG_20260911_025301_622.jpg',
  'IMG_20260911_025818_961.jpg',
  'IMG_20260911_031223_502.jpg',
  'IMG_20260911_031832_576.jpg'
] as const;

export const createPictureMemory = (fileName: string, index: number): MemoryPlace => ({
  id: `picture-${fileName}`,
  title: `Another Beautiful Memory ${index + 1}`,
  subtitle: 'A Moment With You',
  country: 'Just Us ❤️',
  description: 'A simple moment that became special because we shared it together.',
  weather: 'Warm & Peaceful',
  spotName: 'A Memory To Keep',
  locationDetails: 'Saved in our story',
  image: `/memories/${encodeURIComponent(fileName)}`,
  liked: false,
  likesCount: 0,
  categoryIcon: 'heart',
});

export const ALL_MEMORIES: MemoryPlace[] = [
  ...DEFAULT_MEMORIES,
  ...PICTURE_FILES
    .filter((fileName) => !DEFAULT_MEMORIES.some((memory) => memory.image.endsWith(`/${fileName}`)))
    .map((fileName, index) => createPictureMemory(fileName, index + DEFAULT_MEMORIES.length)),
];
