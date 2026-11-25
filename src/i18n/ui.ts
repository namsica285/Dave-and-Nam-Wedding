export const locales = ['en', 'vi'] as const;
export type Locale = (typeof locales)[number];

export const ui = {
  en: {
    nav: { home: 'Home', details: 'Details', story: 'Our Story', gifts: 'Gifts', faq: 'FAQ', rsvp: 'RSVP' },
    langSwitch: 'Tiếng Việt',
    langSwitchLabel: 'Đổi sang tiếng Việt',
    menu: 'Menu',
    close: 'Close',
    skip: 'Skip to content',
    soon: 'This page is coming soon.',
    date: 'February 18, 2028',
    place: 'Oro Valley, Arizona',
    footer: 'With love, Dave & Nam',
  },
  vi: {
    nav: { home: 'Trang Chủ', details: 'Chi Tiết', story: 'Chuyện Tình Yêu', gifts: 'Mừng Cưới', faq: 'Hỏi Đáp', rsvp: 'Hồi Âm' },
    langSwitch: 'English',
    langSwitchLabel: 'Switch to English',
    menu: 'Menu',
    close: 'Đóng',
    skip: 'Chuyển đến nội dung',
    soon: 'Trang này sẽ sớm ra mắt.',
    date: '18 tháng 2, 2028',
    place: 'Oro Valley, Arizona',
    footer: 'Với tình yêu, Dave & Nam',
  },
} as const;

/** Page slugs shared by both languages. Vietnamese slugs stay English for simple links. */
export const pages = ['details', 'story', 'gifts', 'faq', 'rsvp'] as const;
export type PageSlug = (typeof pages)[number];

/** Bilingual page titles: [English, Vietnamese]. Both always shown. */
export const pageTitles: Record<PageSlug, [string, string]> = {
  details: ['Details', 'Chi Tiết'],
  story: ['Our Story', 'Chuyện Tình Yêu'],
  gifts: ['Gifts', 'Mừng Cưới'],
  faq: ['FAQ', 'Hỏi Đáp'],
  rsvp: ['Kindly Reply', 'Hồi Âm'],
};

export function otherLocale(l: Locale): Locale { return l === 'en' ? 'vi' : 'en'; }
