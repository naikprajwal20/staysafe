package com.stayease.api.discover;

public record ReviewSnippet(
        String author,
        String stayType,
        double rating,
        boolean verifiedStay,
        boolean flaggedAsAuthentic,
        String comment
) {
}
