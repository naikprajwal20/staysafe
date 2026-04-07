package com.stayease.api.hotel;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "hotels")
@Getter
@Setter
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String slug;
    private String name;
    private String city;
    private String area;
    private String addressLine;
    private String landmark;
    private String propertyType;

    @Column(length = 1200)
    private String description;

    private BigDecimal nightlyRate;
    private BigDecimal taxesAndFees;
    private double rating;
    private int reviewCount;
    private int safetyScore;
    private double distanceToCenterKm;
    private double distanceToAirportKm;
    private double distanceToMetroKm;
    private double latitude;
    private double longitude;
    private boolean availableNow;
    private boolean freeCancellation;
    private boolean payAtHotel;
    private boolean verifiedPhotos;
    private boolean hiddenFeesFree;
    private boolean lastMinuteDeal;
    private boolean breakfastIncluded;
    private boolean coupleFriendly;
    private int discountPercent;
    private int loyaltyProgress;
    private String priceDropLabel;
    private String responseTime;
    private String supportLevel;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "hotel_tags", joinColumns = @JoinColumn(name = "hotel_id"))
    @Column(name = "tag")
    private List<String> tags = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "hotel_amenities", joinColumns = @JoinColumn(name = "hotel_id"))
    @Column(name = "amenity")
    private List<String> amenities = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "hotel_images", joinColumns = @JoinColumn(name = "hotel_id"))
    @Column(name = "image_url", length = 512)
    private List<String> imageUrls = new ArrayList<>();
}
