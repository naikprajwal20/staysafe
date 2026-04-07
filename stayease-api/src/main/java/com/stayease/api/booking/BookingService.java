package com.stayease.api.booking;

import com.stayease.api.hotel.Hotel;
import com.stayease.api.hotel.HotelRepository;
import jakarta.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Locale;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final HotelRepository hotelRepository;

    public BookingResponse createBooking(BookingRequest request) {
        Hotel hotel = hotelRepository.findById(request.hotelId())
                .orElseThrow(() -> new EntityNotFoundException("Hotel not found"));

        long nights = Math.max(1, ChronoUnit.DAYS.between(request.checkInDate(), request.checkOutDate()));
        BigDecimal nightly = hotel.getNightlyRate().multiply(BigDecimal.valueOf(nights));
        BigDecimal taxes = hotel.getTaxesAndFees().multiply(BigDecimal.valueOf(nights));
        BigDecimal total = nightly.add(taxes).setScale(2, RoundingMode.HALF_UP);

        Booking booking = new Booking();
        booking.setHotelId(hotel.getId());
        booking.setHotelName(hotel.getName());
        booking.setGuestName(request.guestName());
        booking.setEmail(request.email());
        booking.setDestination(request.destination());
        booking.setCheckInDate(request.checkInDate());
        booking.setCheckOutDate(request.checkOutDate());
        booking.setGuests(request.guests());
        booking.setTotalPrice(total);
        booking.setCreatedAt(OffsetDateTime.now());
        booking.setConfirmationCode("SE-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase(Locale.ROOT));

        Booking saved = bookingRepository.save(booking);
        return new BookingResponse(
                saved.getId(),
                saved.getConfirmationCode(),
                saved.getHotelName(),
                saved.getTotalPrice(),
                "Support is live 24/7. Tap the emergency desk in the app if your plans change."
        );
    }
}
