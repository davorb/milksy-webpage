export const APP_STORE = 'https://apps.apple.com/us/app/milksy/id6810681675';
export const PRIVACY_POLICY = 'https://appland.info/app/33309/privacy-policy';
export const features = [
  { slug: 'baby-feeding-tracker', title: 'Feeding', text: 'Bottles and breastfeeding, together in one feeding log.', icon: 'feed' },
  { slug: 'breastfeeding-tracker', title: 'Breastfeeding', text: 'A left and right timer. A little less to keep in your head.', icon: 'nursing' },
  { slug: 'bottle-feeding-tracker', title: 'Bottles', text: 'Record the amount and time. Get back to your baby.', icon: 'bottle' },
  { slug: 'diaper-tracker', title: 'Diapers', text: 'Wet, dirty, or dry. Log a change with a few taps.', icon: 'diaper' },
  { slug: 'baby-tracker-for-couples', title: 'Shared tracking', text: 'Invite your partner with iCloud. Keep one shared timeline.', icon: 'people' },
] as const;
export type FAQ = { question: string; answer: string };
export const homeFAQ: FAQ[] = [
 { question: 'What is Milksy?', answer: 'Milksy is an iPhone baby tracker for recording breastfeeding, bottle feeds and diaper changes. It brings daily activity into a chronological Today feed and shows trends from your logs.' },
 { question: 'What can Milksy track?', answer: 'Milksy records breastfeeding, bottle feeds, wet, dirty and dry diapers, sleep, pumping, and medication or vitamins. The website focuses on feeding, diapers and sharing.' },
 { question: 'Can two parents use Milksy?', answer: 'Yes. Milksy can synchronize a baby’s activity between parents using Apple CloudKit. The family owner invites their partner from the app’s Family settings. Both parents need iCloud for sharing.' },
 { question: 'Is Milksy available on Android?', answer: 'Milksy is an Apple app, with an interface designed for iPhone and iPad. There is no Android version. The App Store listing requires iOS 26.5 or iPadOS 26.5 or later.' },
 { question: 'Does Milksy tell me when to feed my baby?', answer: 'Milksy helps you look back at logged feeds and familiar intervals. Its rhythm cards describe recent records; they are not predictions or medical guidance.' },
];
