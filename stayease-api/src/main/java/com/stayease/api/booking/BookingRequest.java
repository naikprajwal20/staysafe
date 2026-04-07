package com.stayease.api.booking;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record BookingRequest(
        @NotNull Long hotelId,
        @NotBlank String hotelName,
        @NotBlank String destination,
        @NotBlank String guestName,
        @Email @NotBlank String email,
        @NotNull @FutureOrPresent LocalDate checkInDate,
        @NotNull @FutureOrPresent LocalDate checkOutDate,
        @Min(1) int guests
) {
}
