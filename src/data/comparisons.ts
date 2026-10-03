import type { FAQ } from './site';
export const reviewedOn = '2026-10-03';
export const reviewedLabel = '3 October 2026';
export const sources = {
 nara: { label: 'Nara Baby — US App Store listing', url: 'https://apps.apple.com/us/app/nara-baby-pregnancy-tracker/id1444639029' },
 naraAndroid: { label: 'Nara Baby — Google Play listing', url: 'https://play.google.com/store/apps/details?id=com.naraorganics.nara&hl=en_US' },
 huckleberry: { label: 'Huckleberry — US App Store listing', url: 'https://apps.apple.com/us/app/huckleberry-baby-tracker/id1169136078' },
 huckleberryPricing: { label: 'Huckleberry — official pricing and sharing FAQ', url: 'https://huckleberrycare.com/pricing' },
 huckleberryAndroid: { label: 'Huckleberry — Google Play listing', url: 'https://play.google.com/store/apps/details?id=com.huckleberry_labs.app&hl=en_US' },
 babyTracker: { label: 'Baby Tracker by Nighp — US App Store listing', url: 'https://apps.apple.com/us/app/baby-tracker-newborn-log/id779656557' },
 nighp: { label: 'Nighp — official product overview', url: 'https://nighp.com/' },
};
export type SourceId = keyof typeof sources;
export type AppId = 'milksy' | 'nara' | 'huckleberry' | 'babyTracker';
export const appNames: Record<AppId, string> = { milksy: 'Milksy', nara: 'Nara Baby', huckleberry: 'Huckleberry', babyTracker: 'Baby Tracker (Nighp)' };
export const allApps: AppId[] = ['milksy', 'nara', 'huckleberry', 'babyTracker'];
export type Criterion = { label: string; values: Record<AppId, string>; subjective?: boolean };
export const criteria: Criterion[] = [
 { label: 'Feeding tracking', values: { milksy: 'Bottles, nursing and pumping', nara: 'Bottles, nursing, pumping and solids', huckleberry: 'Feeding and pumping logs', babyTracker: 'Bottles, nursing, pumping and solids' } },
 { label: 'Breastfeeding', values: { milksy: 'Left/right timer; pause and switch sides', nara: 'Left/right timer and last side', huckleberry: 'Timer for both sides', babyTracker: 'Nursing timer and last side' } },
 { label: 'Bottle tracking', values: { milksy: 'Amount in mL and time', nara: 'Amount and time', huckleberry: 'Bottle feeding logs', babyTracker: 'Formula and expressed milk logs' } },
 { label: 'Diaper tracking', values: { milksy: 'Wet, dirty or dry', nara: 'Wet, dirty or dry; rash logging', huckleberry: 'Diaper change logs', babyTracker: 'Wet, dirty or mixed' } },
 { label: 'Sleep tracking', values: { milksy: 'Sleep logs and trends', nara: 'Sleep timer and graphs', huckleberry: 'Sleep logs; paid sleep guidance', babyTracker: 'Sleep timer; optional paid timing cues' } },
 { label: 'Growth tracking', values: { milksy: 'No weight, height or head-size charts', nara: 'Weight, height and head size', huckleberry: 'Growth and weight tracking', babyTracker: 'Measurements and WHO growth charts' } },
 { label: 'Trends / statistics', values: { milksy: 'Feeds, volume, diapers and sleep', nara: 'Activity trends and sleep graphs', huckleberry: 'Basic reports free; enhanced reports paid', babyTracker: 'Charts and daily / weekly / monthly reports' } },
 { label: 'Partner / caregiver support', values: { milksy: 'Private iCloud family invitation', nara: 'Caregiver invitations', huckleberry: 'Caregivers sign into the same account', babyTracker: 'Multiple devices in a sync group' } },
 { label: 'Sync', values: { milksy: 'Apple CloudKit; both parents need iCloud', nara: 'Across caregivers and devices', huckleberry: 'Automatic device sync via shared login', babyTracker: 'Device sync; verify current setup in app' } },
 { label: 'Logging controls', values: { milksy: 'Plus menu, amount controls and timers', nara: 'Timers; hide unused activity types', huckleberry: 'One-touch tracking; paid text / voice / photo logging', babyTracker: 'Timers, Siri Shortcuts and Quick Log on supported devices' } },
 { label: 'Platforms', values: { milksy: 'iPhone / iPad; iOS / iPadOS 26.5+', nara: 'iPhone, Apple Watch and Android', huckleberry: 'iPhone, iPad, Apple Watch and Android', babyTracker: 'iPhone, iPad, Apple Watch and Android' } },
 { label: 'Pricing', values: { milksy: 'Check the current App Store price', nara: 'US listing: $9.99 monthly; $69.99 lifetime. Check in-app eligibility.', huckleberry: 'Free logging. Website: Plus $5.74/mo; Premium $9.99/mo, each billed yearly.', babyTracker: 'Free core logging. US listing: remove ads $4.99; Plus $5.99/mo or $49.99/yr.' } },
 { label: 'Ads', values: { milksy: 'No in-app ads', nara: 'Android description says ad-free; current in-app experience unverified', huckleberry: 'Not confirmed from reviewed sources', babyTracker: 'Advertising listed; paid ad removal available' } },
 { label: 'Account requirements', values: { milksy: 'No separate Milksy login; iCloud for sharing', nara: 'Nara account for caregiver invitations', huckleberry: 'Huckleberry account; shared login for caregivers', babyTracker: 'Current login requirements not confirmed' } },
 { label: 'Ease of logging', subjective: true, values: { milksy: 'Designed for short entries from Today', nara: 'Adjustable activity list may suit a wider routine', huckleberry: 'More logging methods if you choose Plus', babyTracker: 'Many shortcuts alongside detailed records' } },
 { label: 'Overall complexity', subjective: true, values: { milksy: 'Focused daily log', nara: 'Broader baby and parent journal', huckleberry: 'Logger plus optional guidance tools', babyTracker: 'Detailed logger, charts and optional cues' } },
];
export interface Comparison {
 slug: string; competitor: Exclude<AppId, 'milksy'>; title: string; description: string;
 angle: string; summary: string; screen: 'timeline' | 'breast' | 'trends'; alt: string;
 visualHeading: string; visualText: string; sources: SourceId[];
 sections: { heading: string; paragraphs: string[] }[];
 choices: { heading: string; text: string }[]; faqs: FAQ[];
 relatedFeatures: { slug: string; label: string }[];
}
export const comparisons: Comparison[] = [
 {
 slug: 'milksy-vs-nara-baby', competitor: 'nara', title: 'Milksy vs Nara Baby: A Focused Log or a Family Journal?',
 description: 'Compare Milksy and Nara Baby for feeds, caregiver sharing, growth and parent tracking. See where each fits, with sourced pricing and practical trade-offs.',
 angle: 'How much of family life do you want to log?',
 summary: 'Nara Baby makes sense if you want baby logs alongside pregnancy, postpartum and growth records. Milksy may suit parents who mainly want a quick daily timeline for feeds, diapers and handovers. Both support shared tracking; the main choice is how much you want the app to cover.',
 screen: 'timeline', alt: 'Milksy daily timeline showing bottle amounts and left and right nursing durations',
 visualHeading: 'Start with the daily view', visualText: 'This is Milksy’s actual timeline. Nara lets you hide activities you do not use, so a broader feature list does not automatically mean a busier day. Look at both interfaces before choosing.',
 sources: ['nara', 'naraAndroid'],
 sections: [
 { heading: 'The key difference: baby log or parent journal?', paragraphs: ['Nara combines baby activity with pregnancy and postpartum records. That can be useful if you want your own recovery and routines beside the baby’s day. Milksy concentrates on recording everyday care and looking back through Today and Trends.', 'If you are looking for an alternative to Nara Baby, first decide what you would miss. A focused feeding log can replace the job of remembering feeds, but it does not replace a pregnancy journal or growth record.'] },
 { heading: 'Where Nara Baby is better', paragraphs: ['Nara offers weight, height and head-size records, plus parent health and journal tools. Those are clear reasons to choose it when you want a wider family record. Milksy does not have growth measurement charts or pregnancy and postpartum journals.', 'Nara also has an Android app. If a caregiver uses Android, Milksy cannot be the shared app for that household. Nara’s ability to hide unused activities is worth considering if you want both breadth and a simpler daily view.'] },
 { heading: 'Where Milksy may fit better', paragraphs: ['Milksy puts a chronological day and quick logging close together. Its Plus menu holds bottles, breastfeeding, diapers and the other care logs. You may prefer that arrangement if your regular question is simply what happened last, and when.', 'For parents already using iCloud, a private family invitation keeps sharing within their Apple setup. This is a different account model, rather than a claim that sharing is faster or more reliable than Nara.'] },
 { heading: 'Check the offer before switching', paragraphs: ['Nara’s US App Store listing currently includes monthly and lifetime purchases, while its Android description still calls the app free. We would not use that description as a promise of ongoing free access. The exact paywall, trial and eligibility need checking inside the app.', 'If you already have a history in Nara, keep an accessible copy before moving. A Milksy backup restores Milksy records; we have not verified a direct Nara import. Try logging a feed and a diaper with your partner before committing to a new routine.'] },
 ],
 choices: [
 { heading: 'You want your own recovery in the same app', text: 'Choose Nara for its pregnancy and postpartum tools.' },
 { heading: 'You want a simple feeding log for two Apple users', text: 'Consider Milksy if its Today view and iCloud invitation fit your handovers.' },
 { heading: 'You want growth measurements or Android access', text: 'Nara is the better match for those requirements.' },
 ],
 faqs: [
 { question: 'Is Milksy a Nara Baby alternative?', answer: 'For feeding, diapers, sleep, pumping and a shared daily record, it can be. It does not replace Nara’s growth measurements or pregnancy and postpartum tracking, and it has no Android version.' },
 { question: 'Is Nara Baby free?', answer: 'Its US App Store listing includes monthly and lifetime purchases. Its Android description still says free. Check the current in-app offer; we have not confirmed trial terms or which accounts retain free access.' },
 { question: 'Can I move my Nara history to Milksy?', answer: 'A direct Nara-to-Milksy import has not been verified. Keep your existing records accessible and try Milksy before changing your family’s tracking routine.' },
 ], relatedFeatures: [{ slug: 'baby-feeding-tracker', label: 'Milksy’s feeding timeline' }, { slug: 'diaper-tracker', label: 'Diaper logging' }, { slug: 'baby-tracker-for-couples', label: 'iCloud sharing for parents' }],
 },
 {
 slug: 'milksy-vs-huckleberry', competitor: 'huckleberry', title: 'Milksy vs Huckleberry: Daily Tracking or Sleep Guidance?',
 description: 'Milksy or Huckleberry? Compare everyday tracking, shared logs and paid sleep tools. A practical guide for parents choosing a logger or more guidance.',
 angle: 'A record of the day, or help planning the next nap?',
 summary: 'Huckleberry is the stronger fit if you want sleep predictions and guidance, with those tools in paid memberships. Its basic tracker is free. Milksy may suit you if you want to log the day, share it with your partner and review patterns without sleep predictions.',
 screen: 'trends', alt: 'Milksy Trends showing logged feeding totals, bottle volume and breastfeeding duration',
 visualHeading: 'Looking back at what happened', visualText: 'Milksy’s Trends summarize your saved records. Huckleberry combines tracking with optional planning and guidance tools. Decide whether you want a history, suggestions, or both.',
 sources: ['huckleberry', 'huckleberryPricing', 'huckleberryAndroid'],
 sections: [
 { heading: 'The key difference: description or prediction?', paragraphs: ['Milksy’s feeding rhythm cards describe intervals in your recent logs. They do not forecast your baby’s next need. Sleep logging is also a record of activity, rather than a sleep coaching service.', 'Huckleberry offers SweetSpot nap and bedtime predictions in Plus, alongside guidance tools. Premium adds personalized sleep plans. If planning sleep is why you are choosing an app, those are substantive differences.'] },
 { heading: 'Where Huckleberry is better', paragraphs: ['Huckleberry has a free logging tier, and paid tools for parents who want more help with routines. It also supports Android and growth tracking, so it covers needs that Milksy does not.', 'A Huckleberry alternative should not be presented as an equivalent sleep service just because it has a sleep timer. Milksy does not replace SweetSpot or personalized sleep plans.'] },
 { heading: 'Where Milksy may fit better', paragraphs: ['If you already know you want a record rather than guidance, Milksy’s focus may appeal. Bottles and nursing sit in one timeline, with Trends for reviewing the day and simple controls for entering the next event.', 'Milksy uses separate parents’ iCloud accounts joined by an invitation. Huckleberry’s official sharing instructions have caregivers sign into the same account. Choose the setup that you are comfortable maintaining. Neither approach proves an advantage in sync speed.'] },
 { heading: 'Compare free tracking with the right paid tier', paragraphs: ['Huckleberry’s free tier includes logging, basic reports and device sync. Do not buy a sleep membership simply to get a shared baby log if those free tools already do the job.', 'The pricing page displays Plus at $5.74 per month and Premium at $9.99 per month when billed yearly. Those are annual-billing equivalents, not month-to-month offers. Regional prices and checkout terms can differ. Start with the features you need, then check the matching tier.'] },
 ],
 choices: [
 { heading: 'Sleep timing is your main concern', text: 'Look at Huckleberry’s paid sleep tools and their age requirements.' },
 { heading: 'You mainly want to remember feeds and handovers', text: 'Try Milksy’s timeline and logging controls; Huckleberry’s free tier is also a reasonable option.' },
 { heading: 'One parent uses Android, or you need growth logs', text: 'Huckleberry meets those requirements; Milksy does not.' },
 ],
 faqs: [
 { question: 'Does Milksy have a SweetSpot equivalent?', answer: 'No. Milksy logs sleep and describes patterns from saved records. It does not provide nap predictions or personalized sleep plans.' },
 { question: 'Do I need Huckleberry Plus to share tracking?', answer: 'No. Huckleberry’s official pricing page includes multi-device sync in its free tier. Caregivers share the same account login.' },
 { question: 'Is Milksy a simpler Huckleberry alternative?', answer: 'It may feel simpler if you want a focused Today timeline without guidance tools. That is a preference, not a measured speed advantage. Huckleberry’s free tracker may also cover your everyday needs.' },
 ], relatedFeatures: [{ slug: 'baby-feeding-tracker', label: 'Feeding logs and descriptive trends' }, { slug: 'breastfeeding-tracker', label: 'The left/right nursing timer' }, { slug: 'baby-tracker-for-couples', label: 'Sharing a timeline with your partner' }],
 },
 {
 slug: 'milksy-vs-baby-tracker', competitor: 'babyTracker', title: 'Milksy vs Baby Tracker by Nighp: Focus or Detailed Records?',
 description: 'Compare Milksy with Baby Tracker by Nighp for feeding, growth charts, reports, ads and sharing. Choose the level of detail your family actually needs.',
 angle: 'Which details will you want to keep?',
 summary: 'Baby Tracker by Nighp is a better match for detailed growth records and PDF reports, with free core logging and paid options. Milksy may suit parents who want a focused daily timeline and iCloud sharing on iPhone or iPad. Both are practical loggers; choose by the records and devices you need.',
 screen: 'breast', alt: 'Milksy breastfeeding logger with left and right nursing timer controls',
 visualHeading: 'Try the task you do most', visualText: 'Here is Milksy’s nursing timer. Baby Tracker also has a nursing timer and shortcuts. Start with a real feed, an edited entry and a handover rather than deciding from a feature count.',
 sources: ['babyTracker', 'nighp'],
 sections: [
 { heading: 'Which Baby Tracker are we comparing?', paragraphs: ['This page is about Baby Tracker – Newborn Log by Nighp Software, the app linked in our sources. Several apps use similar names; their pricing and features are not interchangeable.', 'The meaningful choice here is a focused care timeline versus a wider record with growth charts, reports and optional timing cues. Both apps cover the everyday logging basics.'] },
 { heading: 'Where Baby Tracker is better', paragraphs: ['Baby Tracker includes measurements with WHO growth charts and PDF reports. If those records are part of your routine, it offers functionality Milksy does not. It also has Android availability.', 'Its current iOS listing describes optional What’s Next timing cues and a Plus subscription. Milksy does not offer predictive timing cues. Check device requirements and the actual purchase screen before choosing those extras.'] },
 { heading: 'Where Milksy may fit better', paragraphs: ['Milksy makes the day’s chronological activity the starting point, with bottle amounts and nursing durations kept distinct. It may be a better fit if you mostly look up the previous feed, record a diaper and hand over to your partner.', 'Milksy has no in-app ads. Baby Tracker’s listing declares advertising and offers paid ad removal. That is a practical difference if you want to avoid ads, rather than a reason to dismiss its free logger.'] },
 { heading: 'Check sharing and purchases separately', paragraphs: ['Baby Tracker supports multiple devices and sync groups. Its older public FAQ describes a previous sync setup, so we are not treating those steps as current instructions or assuming its current account requirements. Test the sharing flow on the actual devices your family uses.', 'The US listing shows a $4.99 Remove Ads purchase and Plus at $5.99 monthly or $49.99 yearly. The current description says core tracking remains free and existing purchases continue to work. Check the in-app offer for what each purchase unlocks; a paid timing tool is a different choice from simply removing ads.'] },
 ],
 choices: [
 { heading: 'You need growth charts or printable records', text: 'Choose Baby Tracker for its measurement charts and PDF reports.' },
 { heading: 'You want a focused log on two Apple devices', text: 'Consider Milksy’s Today view and iCloud family invitation.' },
 { heading: 'You need Android or want a free core logger', text: 'Baby Tracker is worth trying. Check the edition and sharing setup you will use.' },
 ],
 faqs: [
 { question: 'Which Baby Tracker app is this?', answer: 'Baby Tracker – Newborn Log by Nighp Software, US App Store ID 779656557. This comparison does not cover other apps with similar names.' },
 { question: 'Does Milksy have growth charts or PDF reports?', answer: 'Milksy does not have weight, height or head-size growth charts, or Baby Tracker’s PDF reporting workflow. Milksy supports its own backup export and restore.' },
 { question: 'Does Baby Tracker require a subscription?', answer: 'Its current iOS description says core tracking is free and existing purchases remain valid. Plus is a subscription for additional features. The US listing also includes a Remove Ads purchase; check the current in-app terms.' },
 ], relatedFeatures: [{ slug: 'bottle-feeding-tracker', label: 'Milksy’s bottle log' }, { slug: 'breastfeeding-tracker', label: 'Nursing timer and editing' }, { slug: 'baby-tracker-for-couples', label: 'iCloud family sharing' }],
 },
];
