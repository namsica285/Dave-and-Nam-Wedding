export const locales = ['en', 'vi'] as const;
export type Locale = (typeof locales)[number];

export const ui = {
  en: {
    nav: { home: 'Home', details: 'Details', destination: 'Destination', story: 'Our Story', gifts: 'Gifts', faq: 'FAQ', rsvp: 'RSVP' },
    langSwitch: 'Tiếng Việt',
    langSwitchLabel: 'Đổi sang tiếng Việt',
    menu: 'Menu',
    close: 'Close',
    skip: 'Skip to content',
    soon: 'This page is coming soon.',
    date: 'February 18, 2028',
    place: 'Oro Valley, Arizona',
    footer: 'With love, Dave & Nam',
    scroll: 'Scroll',
    tba: 'Time and place to be announced',
    sunsetNote: 'Sunset, about 6:11 PM',
    readStory: 'Read our story',
    replyBy: 'By January 15, 2028',
    tentative: 'All details are tentative and may change. We will keep this page up to date.',
    timesTba: 'Times to be announced',
    allDetails: 'See all details',
    openMap: 'Open in Maps',
  },
  vi: {
    nav: { home: 'Trang Chủ', details: 'Chi Tiết', destination: 'Điểm Đến', story: 'Chuyện Tình Yêu', gifts: 'Mừng Cưới', faq: 'Hỏi Đáp', rsvp: 'Hồi Âm' },
    langSwitch: 'English',
    langSwitchLabel: 'Switch to English',
    menu: 'Menu',
    close: 'Đóng',
    skip: 'Chuyển đến nội dung',
    soon: 'Trang này sẽ sớm ra mắt.',
    date: '18 tháng 2, 2028',
    place: 'Oro Valley, Arizona',
    footer: 'Với tình yêu, Dave & Nam',
    scroll: 'Cuộn xuống',
    tba: 'Giờ và địa điểm sẽ được thông báo',
    sunsetNote: 'Hoàng hôn, khoảng 6:11 chiều',
    readStory: 'Đọc chuyện của chúng tôi',
    replyBy: 'Trước ngày 15 tháng 1, 2028',
    tentative: 'Mọi chi tiết đều là dự kiến và có thể thay đổi. Chúng tôi sẽ luôn cập nhật trang này.',
    timesTba: 'Giờ sẽ được thông báo',
    allDetails: 'Xem tất cả chi tiết',
    openMap: 'Mở bản đồ',
  },
} as const;

/** Page slugs shared by both languages. Vietnamese slugs stay English for simple links. */
export const pages = ['details', 'destination', 'story', 'gifts', 'faq', 'rsvp'] as const;
export type PageSlug = (typeof pages)[number];

/** Bilingual page titles: [English, Vietnamese]. Both always shown. */
export const pageTitles: Record<PageSlug, [string, string]> = {
  details: ['Details', 'Chi Tiết'],
  destination: ['Destination', 'Điểm Đến'],
  story: ['Our Blooming Story', 'Hành Trình Nở Rộ'],
  gifts: ['Gifts', 'Mừng Cưới'],
  faq: ['FAQ', 'Hỏi Đáp'],
  rsvp: ['Kindly Reply', 'Hồi Âm'],
};

export function otherLocale(l: Locale): Locale { return l === 'en' ? 'vi' : 'en'; }
