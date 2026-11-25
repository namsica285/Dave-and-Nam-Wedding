// Single source of truth for event details. Taken from the print suite v5/v5.1
// (ceremony program, details card, invitation, welcome sign). ALL TENTATIVE: edit here and every page updates.
// Vietnamese wording is a first draft for family review.
export const event = {
  tentative: true,
  dateISO: '2028-02-18',
  date: { en: 'Friday, February 18, 2028', vi: 'Thứ Sáu, ngày 18 tháng 2, 2028' },
  venue: 'The Buttes at Reflections',
  place: 'Oro Valley, Arizona',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=The+Buttes+at+Reflections+Oro+Valley+AZ',
  sunset: { en: 'Sunset, about 6:11 PM', vi: 'Hoàng hôn, khoảng 6:11 chiều' },
  rsvpBy: { en: 'Please reply by January 15, 2028', vi: 'Xin hồi âm trước ngày 15 tháng 1, 2028' },
  // Order of ceremony (the tea ceremony is held privately at home the day before)
  ceremony: [
    { en: 'Prelude', vi: 'Nhạc Dạo Đầu' },
    { en: 'Processional', vi: 'Tiến Vào Lễ Đường' },
    { en: 'Welcome', vi: 'Lời Chào Mừng' },
    { en: 'Vows & Rings', vi: 'Lời Thề & Trao Nhẫn' },
    { en: 'Pronouncement', vi: 'Tuyên Bố Thành Hôn' },
    { en: 'Recessional', vi: 'Rời Lễ Đường' },
  ],
  // The day at a glance (home page). Times are not set yet.
  day: [
    { en: 'Ceremony', vi: 'Lễ Thành Hôn', note: { en: 'Vows and rings', vi: 'Lời thề và trao nhẫn' }, open: 0.5 },
    { en: 'Sunset', vi: 'Hoàng Hôn', note: { en: 'Sunset, about 6:11 PM', vi: 'Hoàng hôn, khoảng 6:11 chiều' }, open: 1 },
    { en: 'Dinner & Dancing', vi: 'Tiệc Cưới', note: { en: 'And desert skies to follow', vi: 'Và bầu trời sa mạc đêm' }, open: 1.12 },
  ],
} as const;
