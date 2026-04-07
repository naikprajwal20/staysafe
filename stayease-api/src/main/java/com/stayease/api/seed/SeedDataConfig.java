package com.stayease.api.seed;

import com.stayease.api.hotel.Hotel;
import com.stayease.api.hotel.HotelRepository;
import com.stayease.api.hotel.Review;
import com.stayease.api.hotel.ReviewRepository;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SeedDataConfig {

    @Bean
    CommandLineRunner seedData(HotelRepository hotelRepository, ReviewRepository reviewRepository) {
        return args -> {
            if (hotelRepository.count() > 0) {
                return;
            }

            Hotel lagoon = hotelRepository.save(hotel(
                    "lagoon-house-goa", "Lagoon House Goa", "Goa", "Candolim",
                    "Fort Aguada Road, Candolim, North Goa", "Near Candolim Beach", "Resort",
                    "Quiet coastal stay with verified photos, transparent taxes, and fast support for late arrivals.",
                    new BigDecimal("4200"), new BigDecimal("780"), 4.8, 312, 92, 2.1, 34.0, 0.9,
                    15.5176, 73.7627, true, true, true, true, true, true, 18, 74,
                    "Price dropped 12% in the last 6 hours", "2 min", "24/7 concierge",
                    List.of("safe", "family-friendly", "walkable"),
                    List.of("Pool", "Breakfast", "Airport pickup", "Workspace"),
                    List.of(
                            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
                    )
            ));

            Hotel atlas = hotelRepository.save(hotel(
                    "atlas-bay-suites", "Atlas Bay Suites", "Goa", "Panaji",
                    "Rua de Ourem, Fontainhas, Panaji, Goa", "Near riverfront promenade", "Hotel",
                    "Premium business-meets-leisure suite hotel close to nightlife, riverfront dining, and transit.",
                    new BigDecimal("5100"), new BigDecimal("920"), 4.6, 221, 88, 1.4, 28.0, 0.6,
                    15.4989, 73.8278, true, true, false, true, true, false, 0, 61,
                    "3 rooms left at this rate", "5 min", "Priority desk",
                    List.of("nightlife", "business", "central"),
                    List.of("Sky bar", "Gym", "Late checkout", "Meeting pod"),
                    List.of(
                            "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
                    )
            ));

            Hotel palma = hotelRepository.save(hotel(
                    "palma-court", "Palma Court", "Goa", "Morjim",
                    "Morjim Ashwem Road, Pernem, Goa", "Opposite turtle beach access", "Beach stay",
                    "A design-forward beachfront stay with honest pricing, child-friendly services, and calm evenings.",
                    new BigDecimal("3900"), new BigDecimal("690"), 4.7, 184, 95, 3.6, 42.0, 1.7,
                    15.6309, 73.7391, true, true, true, true, true, true, 22, 82,
                    "Tonight deal unlocked", "1 min", "Rapid response",
                    List.of("family-friendly", "beachfront", "safe"),
                    List.of("Kids club", "Beach transfer", "All-day cafe", "Laundry"),
                    List.of(
                            "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
                    )
            ));

            Hotel drift = hotelRepository.save(hotel(
                    "drift-studio-stays", "Drift Studio Stays", "Goa", "Anjuna",
                    "St. Michael Vaddo, Anjuna, Goa", "5 minutes from Anjuna flea market", "Apartment",
                    "Flexible pay-at-hotel loft stay built for solo travelers, remote work, and quick beach access.",
                    new BigDecimal("2800"), new BigDecimal("460"), 4.5, 147, 84, 2.9, 39.0, 1.1,
                    15.5740, 73.7407, true, true, true, true, true, false, 0, 58,
                    "Popular with solo travelers this week", "4 min", "Always-on chat",
                    List.of("solo", "nightlife", "budget"),
                    List.of("Coworking lounge", "Bike rental", "Self check-in", "Cafe"),
                    List.of(
                            "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80"
                    )
            ));

            Hotel ember = hotelRepository.save(hotel(
                    "ember-square-inn", "Ember Square Inn", "Goa", "Baga",
                    "Tito's Lane extension, Baga, Goa", "Near Baga nightlife strip", "Hotel",
                    "Energetic last-minute base with nightlife access, accurate photos, and verified stay reviews.",
                    new BigDecimal("3300"), new BigDecimal("580"), 4.4, 198, 80, 1.9, 36.0, 1.0,
                    15.5553, 73.7517, true, false, true, true, true, true, 15, 49,
                    "8 people viewed this in the last hour", "3 min", "Emergency line",
                    List.of("nightlife", "last-minute", "walkable"),
                    List.of("Live music", "Airport shuttle", "Quick breakfast", "Late-night desk"),
                    List.of(
                            "https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&w=1200&q=80"
                    )
            ));

            Hotel hush = hotelRepository.save(hotel(
                    "hush-garden-retreat", "Hush Garden Retreat", "Goa", "Assagao",
                    "Mapusa-Assagao Road, Bardez, Goa", "Near Assagao church district", "Villa",
                    "Peaceful villa-style retreat with high safety scores, quiet surroundings, and family-first hospitality.",
                    new BigDecimal("4700"), new BigDecimal("840"), 4.9, 128, 97, 4.3, 44.0, 2.0,
                    15.6089, 73.7856, false, true, false, true, true, false, 0, 90,
                    "Highly rated for child-friendly service", "6 min", "White-glove support",
                    List.of("safe", "family-friendly", "quiet"),
                    List.of("Garden dining", "Private cabana", "Spa", "Crib on request"),
                    List.of(
                            "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1200&q=80"
                    )
            ));

            reviewRepository.saveAll(List.of(
                    review(lagoon, "Aarav", "Family stay", 4.8, true, true, "Every rupee was visible before checkout and the beach cab arrived exactly on time."),
                    review(lagoon, "Maya", "Weekend escape", 4.7, true, true, "Photos matched reality, and support helped us move the booking in under three minutes."),
                    review(atlas, "Ishita", "Business trip", 4.6, true, true, "Fast Wi-Fi, polished rooms, and the policy icons made rebooking really easy."),
                    review(palma, "Rohan", "Family stay", 4.9, true, true, "The child-friendly tag was accurate and the taxes were already included on the first screen."),
                    review(drift, "Kabir", "Solo travel", 4.5, true, true, "Flexible pay-at-hotel option made this the easiest last-minute pick."),
                    review(ember, "Naina", "Friends trip", 4.3, true, true, "Close to nightlife without the usual listing surprises."),
                    review(hush, "Devika", "Relaxation stay", 4.9, true, true, "Felt safe, calm, and exactly like the photos.")
            ));
        };
    }

    private Hotel hotel(String slug, String name, String city, String area, String addressLine,
                        String landmark, String propertyType, String description,
                        BigDecimal nightlyRate, BigDecimal taxesAndFees, double rating, int reviewCount,
                        int safetyScore, double distanceToCenterKm, double distanceToAirportKm,
                        double distanceToMetroKm, double latitude, double longitude,
                        boolean availableNow, boolean freeCancellation, boolean payAtHotel,
                        boolean verifiedPhotos, boolean hiddenFeesFree, boolean lastMinuteDeal,
                        int discountPercent, int loyaltyProgress, String priceDropLabel,
                        String responseTime, String supportLevel, List<String> tags,
                        List<String> amenities, List<String> imageUrls) {
        Hotel hotel = new Hotel();
        hotel.setSlug(slug);
        hotel.setName(name);
        hotel.setCity(city);
        hotel.setArea(area);
        hotel.setAddressLine(addressLine);
        hotel.setLandmark(landmark);
        hotel.setPropertyType(propertyType);
        hotel.setDescription(description);
        hotel.setNightlyRate(nightlyRate);
        hotel.setTaxesAndFees(taxesAndFees);
        hotel.setRating(rating);
        hotel.setReviewCount(reviewCount);
        hotel.setSafetyScore(safetyScore);
        hotel.setDistanceToCenterKm(distanceToCenterKm);
        hotel.setDistanceToAirportKm(distanceToAirportKm);
        hotel.setDistanceToMetroKm(distanceToMetroKm);
        hotel.setLatitude(latitude);
        hotel.setLongitude(longitude);
        hotel.setAvailableNow(availableNow);
        hotel.setFreeCancellation(freeCancellation);
        hotel.setPayAtHotel(payAtHotel);
        hotel.setVerifiedPhotos(verifiedPhotos);
        hotel.setHiddenFeesFree(hiddenFeesFree);
        hotel.setLastMinuteDeal(lastMinuteDeal);
        hotel.setBreakfastIncluded(amenities.stream().anyMatch(item -> item.equalsIgnoreCase("Breakfast") || item.equalsIgnoreCase("All-day cafe") || item.equalsIgnoreCase("Quick breakfast")));
        hotel.setCoupleFriendly(!tags.contains("family-friendly") || tags.contains("nightlife") || tags.contains("walkable"));
        hotel.setDiscountPercent(discountPercent);
        hotel.setLoyaltyProgress(loyaltyProgress);
        hotel.setPriceDropLabel(priceDropLabel);
        hotel.setResponseTime(responseTime);
        hotel.setSupportLevel(supportLevel);
        hotel.setTags(tags);
        hotel.setAmenities(amenities);
        hotel.setImageUrls(imageUrls);
        return hotel;
    }

    private Review review(Hotel hotel, String author, String stayType, double rating,
                          boolean verifiedStay, boolean flaggedAsAuthentic, String comment) {
        Review review = new Review();
        review.setHotel(hotel);
        review.setAuthor(author);
        review.setStayType(stayType);
        review.setRating(rating);
        review.setVerifiedStay(verifiedStay);
        review.setFlaggedAsAuthentic(flaggedAsAuthentic);
        review.setComment(comment);
        return review;
    }
}
