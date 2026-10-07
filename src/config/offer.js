export const OFFER = {
  active: true,
  id: "offer-oct-2026",          // naya offer aaye to id badlo, popup sabko dobara dikhega
  expiresOn: "2026-10-19",       // countdown aur auto-expiry isi se chalta hai
  topbarText: "Special admission offer live now — limited seats!",
  imageUrl:
    "https://medicalglobalacademy.com/wp-content/uploads/2026/10/WhatsApp-Image-2026-10-05-at-1.59.25-PM.jpeg",

  badge: "Limited-Time Offer",
  headline: "Exclusive offer on our programs",
  subtext: "Enquire today and our counsellors will help you claim it.",
  ctaLabel: "Claim this offer",
  secondaryLabel: "Maybe later",

  // "everyPage" | "oncePerSession" | "oncePerDay"
showOn: "everyPage",
};

export const isOfferLive = () =>
  OFFER.active && new Date() <= new Date(OFFER.expiresOn + "T23:59:59");