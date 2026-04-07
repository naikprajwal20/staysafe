package com.stayease.api.discover;

import java.util.List;

public record DiscoverResponse(
        String destination,
        int nights,
        int guests,
        int matchingHotels,
        List<SpotlightCard> spotlight,
        List<DiscoverHotelResponse> hotels,
        List<DiscoverHotelResponse> tonightDeals
) {
}
