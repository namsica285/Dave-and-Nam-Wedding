// Zelle QR codes supplied by Nam (2026-11-25). The images in public/gifts/ are the
// original codes, recolored to the brand green; both were decoded after recoloring to confirm they still scan.
// The URL is what the QR code contains, so phone users can tap instead of scan.
export const zelle = [
  { who: 'Dave', img: '/gifts/zelle-dave.png', url: "https://enroll.zellepay.com/qr-codes?data=ewogICJhY3Rpb24iIDogInBheW1lbnQiLAogICJ0b2tlbiIgOiAiNjA1Mzc2OTUzNSIsCiAgIm5hbWUiIDogIkRBVklEIgp9" },
  { who: 'Nam', img: '/gifts/zelle-nam.png', url: "https://enroll.zellepay.com/qr-codes?data=ewogICJuYW1lIiA6ICJOQU0iLAogICJ0b2tlbiIgOiAiNTE1NzcxNDE5MiIsCiAgImFjdGlvbiIgOiAicGF5bWVudCIKfQ==" },
] as const;
