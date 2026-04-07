package com.stayease.api.discover;

import com.stayease.api.hotel.Hotel;
import com.stayease.api.hotel.HotelRepository;
import com.stayease.api.hotel.Review;
import com.stayease.api.hotel.ReviewRepository;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DiscoverService {

    private final HotelRepository hotelRepository;
    private final ReviewRepository reviewRepository;

    public DiscoverResponse discover(String destination, int nights, int guests, Integer budget,
                                     boolean freeCancellation, boolean payAtHotel, String areaTag, String sort) {
        List<Hotel> hotels = hotelRepository.findAll();
        Map<Long, List<ReviewSnippet>> reviewsByHotel = reviewRepository.findAll().stream()
                .collect(Collectors.groupingBy(review -> review.getHotel().getId(),
                        Collectors.mapping(this::toReviewSnippet, Collectors.toList())));

        String normalizedDestination = destination == null || destination.isBlank() ? "Goa" : destination.trim();
        int normalizedNights = Math.max(1, nights);
        int normalizedGuests = Math.max(1, guests);

        Predicate<Hotel> filter = hotel -> hotel.getCity().equalsIgnoreCase(normalizedDestination)
                && (!freeCancellation || hotel.isFreeCancellation())
                && (!payAtHotel || hotel.isPayAtHotel())
                && (budget == null || totalPrice(hotel, normalizedNights).compareTo(BigDecimal.valueOf(budget)) <= 0)
                && (areaTag == null || areaTag.isBlank() || hotel.getTags().stream()
                .map(tag -> tag.toLowerCase(Locale.ROOT))
                .toList()
                .contains(areaTag.toLowerCase(Locale.ROOT)));

        Comparator<Hotel> comparator = switch (sort == null ? "recommended" : sort.toLowerCase(Locale.ROOT)) {
            case "price" -> Comparator.comparing(hotel -> totalPrice(hotel, normalizedNights));
            case "distance" -> Comparator.comparingDouble(Hotel::getDistanceToCenterKm);
            case "rating" -> Comparator.comparingDouble(Hotel::getRating).reversed();
            default -> Comparator
                    .comparing(Hotel::isAvailableNow).reversed()
                    .thenComparing(Hotel::isVerifiedPhotos).reversed()
                    .thenComparing(Hotel::getRating, Comparator.reverseOrder());
        };

        List<DiscoverHotelResponse> matching = hotels.stream()
                .filter(filter)
                .sorted(comparator)
                .map(hotel -> toResponse(hotel, normalizedNights, reviewsByHotel.getOrDefault(hotel.getId(), List.of())))
                .toList();

        List<DiscoverHotelResponse> tonightDeals = hotels.stream()
                .filter(Hotel::isLastMinuteDeal)
                .filter(hotel -> hotel.getCity().equalsIgnoreCase(normalizedDestination))
                .map(hotel -> toResponse(hotel, normalizedNights, reviewsByHotel.getOrDefault(hotel.getId(), List.of())))
                .limit(3)
                .toList();

        List<SpotlightCard> spotlight = List.of(
                new SpotlightCard("No hidden fees", "Every card shows taxes included before checkout.", "mint"),
                new SpotlightCard("Verified imagery", "Community photos and authenticity checks stay visible.", "sky"),
                new SpotlightCard("Emergency desk", "24/7 help line and one-tap trip support are live.", "amber")
        );

        return new DiscoverResponse(normalizedDestination, normalizedNights, normalizedGuests, matching.size(), spotlight, matching, tonightDeals);
    }

    private ReviewSnippet toReviewSnippet(Review review) {
        return new ReviewSnippet(
                review.getAuthor(),
                review.getStayType(),
                review.getRating(),
                review.isVerifiedStay(),
                review.isFlaggedAsAuthentic(),
                review.getComment()
        );
    }

    private DiscoverHotelResponse toResponse(Hotel hotel, int nights, List<ReviewSnippet> reviews) {
        return new DiscoverHotelResponse(
                hotel.getId(),
                hotel.getSlug(),
                hotel.getName(),
                hotel.getCity(),
                hotel.getArea(),
                hotel.getAddressLine(),
                hotel.getLandmark(),
                hotel.getPropertyType(),
                hotel.getDescription(),
                hotel.getNightlyRate(),
                hotel.getTaxesAndFees(),
                totalPrice(hotel, nights),
                hotel.getRating(),
                hotel.getReviewCount(),
                hotel.getSafetyScore(),
                hotel.getDistanceToCenterKm(),
                hotel.getDistanceToAirportKm(),
                hotel.getDistanceToMetroKm(),
                hotel.getLatitude(),
                hotel.getLongitude(),
                hotel.isAvailableNow(),
                hotel.isFreeCancellation(),
                hotel.isPayAtHotel(),
                hotel.isVerifiedPhotos(),
                hotel.isHiddenFeesFree(),
                hotel.isLastMinuteDeal(),
                hotel.isBreakfastIncluded(),
                hotel.isCoupleFriendly(),
                hotel.getDiscountPercent(),
                hotel.getLoyaltyProgress(),
                hotel.getPriceDropLabel(),
                hotel.getResponseTime(),
                hotel.getSupportLevel(),
                hotel.getTags(),
                hotel.getAmenities(),
                hotel.getImageUrls(),
                reviews
        );
    }

    private BigDecimal totalPrice(Hotel hotel, int nights) {
        return hotel.getNightlyRate()
                .add(hotel.getTaxesAndFees())
                .multiply(BigDecimal.valueOf(Math.max(1, nights)))
                .setScale(2, RoundingMode.HALF_UP);
    }
}
