package com.stayease.api.hotel;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
    List<Hotel> findByCityIgnoreCase(String city);
}
