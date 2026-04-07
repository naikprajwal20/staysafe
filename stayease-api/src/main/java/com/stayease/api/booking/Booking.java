package com.stayease.api.booking;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "bookings")
@Getter
@Setter
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long hotelId;
    private String hotelName;
    private String guestName;
    private String email;
    private String destination;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private int guests;
    private BigDecimal totalPrice;
    private String confirmationCode;
    private OffsetDateTime createdAt;
}
