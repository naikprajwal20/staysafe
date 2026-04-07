package com.stayease.api.booking;

import java.math.BigDecimal;

public record BookingResponse(
        Long id,
        String confirmationCode,
        String hotelName,
        BigDecimal totalPrice,
        String supportMessage
) {
}
