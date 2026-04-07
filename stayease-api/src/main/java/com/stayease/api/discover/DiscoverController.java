package com.stayease.api.discover;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/discover")
@RequiredArgsConstructor
public class DiscoverController {

    private final DiscoverService discoverService;

    @GetMapping
    public DiscoverResponse discover(
            @RequestParam(defaultValue = "Goa") String destination,
            @RequestParam(defaultValue = "2") int nights,
            @RequestParam(defaultValue = "2") int guests,
            @RequestParam(required = false) Integer budget,
            @RequestParam(defaultValue = "false") boolean freeCancellation,
            @RequestParam(defaultValue = "false") boolean payAtHotel,
            @RequestParam(required = false) String areaTag,
            @RequestParam(defaultValue = "recommended") String sort
    ) {
        return discoverService.discover(destination, nights, guests, budget, freeCancellation, payAtHotel, areaTag, sort);
    }
}
