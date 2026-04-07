package com.stayease.api.discover;

import java.math.BigDecimal;
import java.util.List;

public record DiscoverHotelResponse(
        Long id,
        String slug,
        String name,
        String city,
        String area,
        String addressLine,
        String landmark,
        String propertyType,
        String description,
        BigDecimal nightlyRate,
        BigDecimal taxesAndFees,
        BigDecimal totalPrice,
        double rating,
        int reviewCount,
        int safetyScore,
        double distanceToCenterKm,
        double distanceToAirportKm,
        double distanceToMetroKm,
        double latitude,
        double longitude,
        boolean availableNow,
        boolean freeCancellation,
        boolean payAtHotel,
        boolean verifiedPhotos,
        boolean hiddenFeesFree,
        boolean lastMinuteDeal,
        boolean breakfastIncluded,
        boolean coupleFriendly,
        int discountPercent,
        int loyaltyProgress,
        String priceDropLabel,
        String responseTime,
        String supportLevel,
        List<String> tags,
        List<String> amenities,
        List<String> imageUrls,
        List<ReviewSnippet> reviews
) {
}
