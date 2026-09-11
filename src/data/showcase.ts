export interface FeatureItem {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  videoUrl: string;
}

export const FEATURE_ITEMS: FeatureItem[] = [
  {
    id: 'feature-ease',
    step: '01',
    tag: 'Our Beginning',
    title: 'Every moment feels like home',
    subtitle: 'A quiet beginning to something beautiful',
    description:
      'Some moments do not need a grand beginning. They simply arrive, feel right, and become the memories we want to keep forever.',
    videoUrl: 'showcase/VID_20260910_070405_055 (1).mp4',
    
  },
  {
    id: 'feature-start',
    step: '02',
    tag: 'Little Moments',
    title: 'The sweetest parts are unplanned',
    subtitle: 'Love grows in the little things we share',
    description:
      'A smile, a glance, or a quiet moment together can turn an ordinary day into something we will always remember.',
    videoUrl: 'showcase/VID_20260910_120708_707 (3).mp4',
  },
  {
    id: 'feature-focus',
    step: '03',
    tag: 'Always Us',
    title: 'Wherever you go, it feels like bueauty follows',
    subtitle: 'The best view is the one beside you',
    description:
      'The places may change and the days may pass, but every adventure feels warmer when we are together.',
    videoUrl: 'showcase/VID_20260910_120825_835.mp4',
  },
  {
    id: 'feature-end',
    step: '04',
    tag: 'Our Journey',
    title: 'The journey is just as important as the destination',
    subtitle: 'Every step we take together is a memory we will cherish',
    description:
      'The path we walk together is filled with moments that make the journey worthwhile.',
    videoUrl: 'showcase/VID_20260910_125225_545.mp4',
  },
  {
    id: 'feature-forever',
    step: '05',
    tag: 'Forever Us',
    title: 'Every moment is a memory we will keep forever',
    subtitle: 'A lifetime of love and laughter ',
    description:
      'The path we walk together is filled with moments that make the journey worthwhile.',
    videoUrl: 'showcase/VID_20260910_125244_804 (1).mp4',
  },
];
