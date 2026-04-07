export type ReviewSnippet = {
  author: string;
  stayType: string;
  rating: number;
  verifiedStay: boolean;
  flaggedAsAuthentic: boolean;
  comment: string;
};

export type DiscoverHotel = {
  id: number;
  slug: string;
  name: string;
  city: string;
  area: string;
  addressLine: string;
  landmark: string;
  propertyType: string;
  description: string;
  nightlyRate: number;
  taxesAndFees: number;
  totalPrice: number;
  rating: number;
  reviewCount: number;
  safetyScore: number;
  distanceToCenterKm: number;
  distanceToAirportKm: number;
  distanceToMetroKm: number;
  latitude: number;
  longitude: number;
  availableNow: boolean;
  freeCancellation: boolean;
  payAtHotel: boolean;
  verifiedPhotos: boolean;
  hiddenFeesFree: boolean;
  lastMinuteDeal: boolean;
  breakfastIncluded: boolean;
  coupleFriendly: boolean;
  discountPercent: number;
  loyaltyProgress: number;
  priceDropLabel: string;
  responseTime: string;
  supportLevel: string;
  tags: string[];
  amenities: string[];
  imageUrls: string[];
  reviews: ReviewSnippet[];
};

export type SpotlightCard = {
  title: string;
  subtitle: string;
  tone: string;
};

export type DiscoverResponse = {
  destination: string;
  nights: number;
  guests: number;
  matchingHotels: number;
  spotlight: SpotlightCard[];
  hotels: DiscoverHotel[];
  tonightDeals: DiscoverHotel[];
};

export type BookingResponse = {
  id: number;
  confirmationCode: string;
  hotelName: string;
  totalPrice: number;
  supportMessage: string;
};
