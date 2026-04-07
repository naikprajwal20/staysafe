"use client";

import { createBooking, fetchDiscover } from "@/lib/api";
import { AuthModal } from "@/components/auth-modal";
import { BookingResponse, DiscoverHotel, DiscoverResponse } from "@/lib/types";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  AlertCircle,
  BadgeCheck,
  BedDouble,
  CalendarDays,
  CircleDollarSign,
  Clock3,
  MapPinned,
  MoonStar,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  SunMedium,
  UserRound,
  UtensilsCrossed,
} from "lucide-react";
import {
  startTransition,
  type ReactNode,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";

const areaOptions = ["", "safe", "family-friendly", "nightlife", "budget"];
const propertyOptions = ["All", "Hotel", "Resort", "Villa", "Apartment", "Beach stay"];
const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "price", label: "Lowest total" },
  { value: "rating", label: "Top rated" },
  { value: "distance", label: "Closest in" },
];

const today = new Date();
const checkIn = today.toISOString().slice(0, 10);
const checkOut = new Date(today.getTime() + 2 * 86400000)
  .toISOString()
  .slice(0, 10);

export function StayEaseDashboard() {
  const [destination, setDestination] = useState("Goa");
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);
  const [budget, setBudget] = useState(12000);
  const [freeCancellation, setFreeCancellation] = useState(true);
  const [payAtHotel, setPayAtHotel] = useState(false);
  const [areaTag, setAreaTag] = useState("");
  const [sort, setSort] = useState("recommended");
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [discover, setDiscover] = useState<DiscoverResponse | null>(null);
  const [error, setError] = useState("");
  const [selectedHotel, setSelectedHotel] = useState<DiscoverHotel | null>(null);
  const [toast, setToast] = useState<BookingResponse | null>(null);
  const [bookingName, setBookingName] = useState("Prajwal");
  const [bookingEmail, setBookingEmail] = useState("traveler@stayease.app");
  const [bookingBusy, setBookingBusy] = useState(false);
  const [checkInDate, setCheckInDate] = useState(checkIn);
  const [checkOutDate, setCheckOutDate] = useState(checkOut);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authOpen, setAuthOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("Guest");
  const [breakfastOnly, setBreakfastOnly] = useState(false);
  const [coupleFriendlyOnly, setCoupleFriendlyOnly] = useState(false);
  const [propertyType, setPropertyType] = useState("All");
  const [minRating, setMinRating] = useState(4.3);

  const deferredDestination = useDeferredValue(destination);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    fetchDiscover({
      destination: deferredDestination,
      nights,
      guests,
      budget,
      freeCancellation,
      payAtHotel,
      areaTag,
      sort,
    })
      .then((response) => {
        if (cancelled) {
          return;
        }

        setDiscover(response);
        setSelectedHotel((current) =>
          current
            ? response.hotels.find((hotel) => hotel.id === current.id) ??
              response.hotels[0] ??
              null
            : response.hotels[0] ?? null
        );
      })
      .catch((fetchError: Error) => {
        if (!cancelled) {
          setError(fetchError.message);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [areaTag, budget, deferredDestination, freeCancellation, guests, nights, payAtHotel, sort]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeout = window.setTimeout(() => setToast(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const hotels = useMemo(
    () =>
      (discover?.hotels ?? []).filter((hotel) => {
        if (breakfastOnly && !hotel.breakfastIncluded) {
          return false;
        }
        if (coupleFriendlyOnly && !hotel.coupleFriendly) {
          return false;
        }
        if (propertyType !== "All" && hotel.propertyType !== propertyType) {
          return false;
        }
        return hotel.rating >= minRating;
      }),
    [breakfastOnly, coupleFriendlyOnly, discover, minRating, propertyType]
  );
  const activeHotel = selectedHotel ?? hotels[0] ?? null;
  const averageNightly = useMemo(() => {
    if (!hotels.length) {
      return 0;
    }

    return Math.round(
      hotels.reduce((sum, hotel) => sum + hotel.nightlyRate, 0) / hotels.length
    );
  }, [hotels]);

  useEffect(() => {
    setSelectedHotel((current) =>
      current
        ? hotels.find((hotel) => hotel.id === current.id) ?? hotels[0] ?? null
        : hotels[0] ?? null
    );
  }, [hotels]);

  async function handleBooking() {
    if (!activeHotel) {
      return;
    }

    setBookingBusy(true);

    try {
      const response = await createBooking({
        hotelId: activeHotel.id,
        hotelName: activeHotel.name,
        destination: discover?.destination ?? destination,
        guestName: bookingName,
        email: bookingEmail,
        checkInDate,
        checkOutDate,
        guests,
      });

      setToast(response);
    } catch (bookingError) {
      setError(
        bookingError instanceof Error
          ? bookingError.message
          : "Booking could not be completed."
      );
    } finally {
      setBookingBusy(false);
    }
  }

  function handleAuthSubmit(formData: FormData) {
    const identifier = String(
      formData.get("name") || formData.get("email") || "Traveler"
    );
    setLoggedInUser(identifier.split("@")[0]);
    setAuthOpen(false);
  }

  return (
    <main className="min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(14,165,164,0.17),rgba(15,23,42,0.94)_55%,rgba(249,115,22,0.18))] p-6 text-white shadow-[0_40px_120px_rgba(15,23,42,0.45)] sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.22),transparent_25%)]" />
          <div className="relative flex flex-col gap-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-white/12 px-4 py-2 text-sm font-semibold">
                  StayEase
                </div>
                <div className="hidden rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/70 sm:block">
                  Hotels, city stays, last-minute deals
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAuthMode("login");
                  setAuthOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950"
              >
                <UserRound className="h-4 w-4" />
                {loggedInUser === "Guest" ? "Login / Register" : loggedInUser}
              </button>
            </div>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur">
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  Premium transparent booking MVP
                </div>
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                  Hotels you can trust before you ever tap &quot;Book&quot;.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
                  StayEase turns hotel search into a clean, verified flow with
                  upfront pricing, trustworthy imagery, safety context, fuller
                  address details, and instant support when plans shift.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setDarkMode((current) => !current)}
                className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
              >
                {darkMode ? (
                  <SunMedium className="h-4 w-4" />
                ) : (
                  <MoonStar className="h-4 w-4" />
                )}
                {darkMode ? "Light mode" : "Dark mode"}
              </button>
            </div>

            <div className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-4 backdrop-blur-xl lg:grid-cols-[2.2fr_1fr]">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <label className="panel p-4">
                  Destination
                  <div className="mt-2 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <Search className="h-4 w-4 text-white/70" />
                    <input
                      value={destination}
                      onChange={(event) =>
                        startTransition(() => setDestination(event.target.value))
                      }
                      className="w-full bg-transparent text-base text-white outline-none placeholder:text-slate-400"
                      placeholder="Goa"
                    />
                  </div>
                </label>
                <label className="panel p-4">
                  Nights
                  <input
                    type="number"
                    min={1}
                    value={nights}
                    onChange={(event) => setNights(Number(event.target.value))}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white outline-none"
                  />
                </label>
                <label className="panel p-4">
                  Guests
                  <input
                    type="number"
                    min={1}
                    value={guests}
                    onChange={(event) => setGuests(Number(event.target.value))}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white outline-none"
                  />
                </label>
                <label className="panel p-4">
                  Budget total
                  <input
                    type="range"
                    min={5000}
                    max={20000}
                    step={500}
                    value={budget}
                    onChange={(event) => setBudget(Number(event.target.value))}
                    className="mt-4 w-full accent-amber-300"
                  />
                  <div className="mt-3 text-sm text-white/80">Rs {budget}</div>
                </label>
              </div>

              <div className="panel flex flex-col gap-3 p-4">
                <div className="text-sm font-medium text-white/70">Smart filters</div>
                <div className="flex flex-wrap gap-2">
                  {areaOptions.map((option) => (
                    <button
                      key={option || "all"}
                      type="button"
                      onClick={() => setAreaTag(option)}
                      className={clsx(
                        "rounded-full px-4 py-2 text-sm transition",
                        areaTag === option
                          ? "bg-white text-slate-950"
                          : "bg-white/8 text-white/80 hover:bg-white/14"
                      )}
                    >
                      {option || "All areas"}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <ToggleChip
                    active={freeCancellation}
                    onClick={() => setFreeCancellation((current) => !current)}
                    label="Free cancellation"
                  />
                  <ToggleChip
                    active={payAtHotel}
                    onClick={() => setPayAtHotel((current) => !current)}
                    label="Pay at hotel"
                  />
                  <ToggleChip
                    active={breakfastOnly}
                    onClick={() => setBreakfastOnly((current) => !current)}
                    label="Breakfast"
                  />
                  <ToggleChip
                    active={coupleFriendlyOnly}
                    onClick={() => setCoupleFriendlyOnly((current) => !current)}
                    label="Couple friendly"
                  />
                </div>
                <label className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                  Property
                  <select
                    value={propertyType}
                    onChange={(event) => setPropertyType(event.target.value)}
                    className="rounded-xl bg-slate-950 px-3 py-2 text-white outline-none"
                  >
                    {propertyOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm text-white/80">
                  Min rating: {minRating.toFixed(1)}
                  <input
                    type="range"
                    min={4}
                    max={5}
                    step={0.1}
                    value={minRating}
                    onChange={(event) => setMinRating(Number(event.target.value))}
                    className="mt-3 w-full accent-teal-300"
                  />
                </label>
                <label className="mt-auto flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                  Sort by
                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                    className="rounded-xl bg-slate-950 px-3 py-2 text-white outline-none"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.45fr_1fr]">
          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCard
              icon={<CircleDollarSign className="h-5 w-5" />}
              label="Average nightly"
              value={`Rs ${averageNightly || 0}`}
              detail="Transparent taxes included"
            />
            <MetricCard
              icon={<ShieldCheck className="h-5 w-5" />}
              label="Safety-first stays"
              value={`${discover?.matchingHotels ?? 0}`}
              detail="Filtered by score and reviews"
            />
            <MetricCard
              icon={<UtensilsCrossed className="h-5 w-5" />}
              label="Breakfast stays"
              value={`${hotels.filter((hotel) => hotel.breakfastIncluded).length}`}
              detail="Easy family and business picks"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {discover?.spotlight.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                className="surface p-4"
              >
                <div className="text-sm font-medium text-[var(--muted)]">
                  {item.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground)]/80">
                  {item.subtitle}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {error ? (
          <div className="surface flex items-center gap-3 border border-rose-500/20 p-4 text-sm text-rose-200">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        ) : null}

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">
                  Matching stays
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-[var(--foreground)]">
                  {discover?.matchingHotels ?? 0} stays built around trust,
                  speed, and clarity.
                </h2>
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="surface animate-pulse p-5">
                      <div className="h-56 rounded-[1.5rem] bg-white/8" />
                    </div>
                  ))
                : hotels.map((hotel) => (
                    <HotelCard
                      key={hotel.id}
                      hotel={hotel}
                      active={hotel.id === activeHotel?.id}
                      onOpen={() => setSelectedHotel(hotel)}
                    />
                  ))}
            </AnimatePresence>
          </div>

          <aside className="space-y-4">
            <div className="surface overflow-hidden p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">
                    Interactive map
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">
                    Live area view
                  </h3>
                </div>
                <MapPinned className="h-5 w-5 text-teal-300" />
              </div>

              <div className="relative h-[320px] overflow-hidden rounded-[1.75rem] border border-white/8 bg-[linear-gradient(180deg,rgba(8,47,73,0.95),rgba(15,23,42,0.86))]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.2),transparent_25%),radial-gradient(circle_at_75%_40%,rgba(251,191,36,0.18),transparent_22%),linear-gradient(transparent_97%,rgba(255,255,255,0.07)_100%),linear-gradient(90deg,transparent_97%,rgba(255,255,255,0.07)_100%)] bg-[size:auto,auto,36px_36px,36px_36px]" />
                {hotels.map((hotel) => (
                  <button
                    key={hotel.id}
                    type="button"
                    onClick={() => setSelectedHotel(hotel)}
                    className={clsx(
                      "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-2 text-xs font-semibold shadow-lg transition",
                      hotel.id === activeHotel?.id
                        ? "border-amber-300 bg-amber-300 text-slate-950"
                        : "border-white/15 bg-slate-900/85 text-white hover:bg-slate-800"
                    )}
                    style={{
                      left: `${35 + ((hotel.longitude - 73.72) / 0.12) * 40}%`,
                      top: `${30 + ((15.64 - hotel.latitude) / 0.18) * 55}%`,
                    }}
                  >
                    Rs {hotel.totalPrice}
                  </button>
                ))}
              </div>

              {activeHotel ? (
                <div className="mt-4 rounded-[1.5rem] border border-white/8 bg-white/5 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-semibold text-[var(--foreground)]">
                        {activeHotel.name}
                      </div>
                      <div className="mt-1 text-sm text-[var(--muted)]">
                        {activeHotel.addressLine}
                      </div>
                      <div className="mt-1 text-sm text-[var(--muted)]">
                        {activeHotel.landmark}
                      </div>
                    </div>
                    <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm text-emerald-200">
                      Safety {activeHotel.safetyScore}
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-sm text-[var(--foreground)]/80">
                    <InfoPill
                      icon={<MapPinned className="h-4 w-4" />}
                      label={`${activeHotel.distanceToCenterKm} km center`}
                    />
                    <InfoPill
                      icon={<CalendarDays className="h-4 w-4" />}
                      label={
                        activeHotel.freeCancellation
                          ? "Free cancellation"
                          : "Partial policy"
                      }
                    />
                    <InfoPill
                      icon={<BadgeCheck className="h-4 w-4" />}
                      label={activeHotel.propertyType}
                    />
                  </div>
                </div>
              ) : null}
            </div>

            <div className="surface p-4">
              <div className="mb-4 text-sm uppercase tracking-[0.28em] text-[var(--muted)]">
                Tonight deals
              </div>
              <div className="space-y-3">
                {discover?.tonightDeals.map((hotel) => (
                  <button
                    key={hotel.id}
                    type="button"
                    onClick={() => setSelectedHotel(hotel)}
                    className="flex w-full items-center justify-between rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-3 text-left transition hover:bg-white/8"
                  >
                    <div>
                      <div className="font-medium text-[var(--foreground)]">
                        {hotel.name}
                      </div>
                      <div className="mt-1 text-sm text-[var(--muted)]">
                        {hotel.discountPercent}% off tonight
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-amber-300">
                      Rs {hotel.totalPrice}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </section>

        {activeHotel ? (
          <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="surface p-5">
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">
                    Quick view
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold text-[var(--foreground)]">
                    {activeHotel.name}
                  </h3>
                  <p className="mt-2 max-w-2xl text-[var(--foreground)]/76">
                    {activeHotel.description}
                  </p>
                  <p className="mt-3 text-sm text-[var(--muted)]">
                    {activeHotel.addressLine}
                  </p>
                  <p className="text-sm text-[var(--muted)]">
                    {activeHotel.landmark}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedHotel(activeHotel)}
                  className="rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] transition hover:scale-[1.02]"
                >
                  Open focused view
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {activeHotel.imageUrls.map((image) => (
                  <div key={image} className="relative h-52 overflow-hidden rounded-[1.5rem]">
                    <Image
                      src={image}
                      alt={activeHotel.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {[activeHotel.propertyType]
                  .concat(activeHotel.tags)
                  .concat(activeHotel.amenities)
                  .map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/6 px-3 py-2 text-sm text-[var(--foreground)]/78"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="surface p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">
                    Instant booking
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold text-[var(--foreground)]">
                    Rs {activeHotel.totalPrice}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    Includes room rate, taxes, and platform fees for {nights} nights.
                  </p>
                </div>
                <div className="rounded-full bg-emerald-400/15 px-3 py-2 text-sm text-emerald-200">
                  {activeHotel.hiddenFeesFree
                    ? "No hidden fees"
                    : "Transparent pricing"}
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-[var(--muted)]">
                  Check in
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(event) => setCheckInDate(event.target.value)}
                    className="w-full rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-[var(--foreground)] outline-none"
                  />
                </label>
                <label className="space-y-2 text-sm text-[var(--muted)]">
                  Check out
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(event) => setCheckOutDate(event.target.value)}
                    className="w-full rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-[var(--foreground)] outline-none"
                  />
                </label>
                <label className="space-y-2 text-sm text-[var(--muted)] sm:col-span-2">
                  Guest name
                  <input
                    value={bookingName}
                    onChange={(event) => setBookingName(event.target.value)}
                    className="w-full rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-[var(--foreground)] outline-none"
                  />
                </label>
                <label className="space-y-2 text-sm text-[var(--muted)] sm:col-span-2">
                  Email
                  <input
                    type="email"
                    value={bookingEmail}
                    onChange={(event) => setBookingEmail(event.target.value)}
                    className="w-full rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-[var(--foreground)] outline-none"
                  />
                </label>
              </div>

              <div className="mt-5 grid gap-3">
                {activeHotel.reviews.map((review) => (
                  <div
                    key={`${review.author}-${review.comment}`}
                    className="rounded-[1.4rem] border border-white/8 bg-white/5 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-medium text-[var(--foreground)]">
                        {review.author}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-amber-300">
                        <Star className="h-4 w-4 fill-current" />
                        {review.rating}
                      </div>
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                      {review.stayType} •{" "}
                      {review.verifiedStay ? "Verified stay" : "Guest review"}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[var(--foreground)]/78">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleBooking}
                disabled={bookingBusy}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[1.4rem] bg-gradient-to-r from-teal-400 to-amber-300 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:brightness-105 disabled:opacity-60"
              >
                <BedDouble className="h-4 w-4" />
                {bookingBusy ? "Confirming your stay..." : "Book instantly"}
              </button>
            </div>
          </section>
        ) : null}

        <AuthModal
          mode={authMode}
          open={authOpen}
          onClose={() => setAuthOpen(false)}
          onToggleMode={() =>
            setAuthMode((current) => (current === "login" ? "register" : "login"))
          }
          onSubmit={handleAuthSubmit}
        />

        <AnimatePresence>
          {toast ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="fixed bottom-5 right-5 z-50 max-w-sm rounded-[1.5rem] border border-emerald-400/20 bg-slate-950/95 p-4 text-white shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-start gap-3">
                <BadgeCheck className="mt-0.5 h-5 w-5 text-emerald-300" />
                <div>
                  <div className="font-semibold">
                    Booking confirmed at {toast.hotelName}
                  </div>
                  <p className="mt-1 text-sm text-slate-300">
                    Confirmation {toast.confirmationCode} • Rs {toast.totalPrice}
                  </p>
                  <p className="mt-2 text-sm text-slate-400">
                    {toast.supportMessage}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  );
}

function ToggleChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded-full px-4 py-2 text-sm transition",
        active
          ? "bg-teal-300 text-slate-950"
          : "bg-white/8 text-white/80 hover:bg-white/14"
      )}
    >
      {label}
    </button>
  );
}

function MetricCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="surface p-4">
      <div className="flex items-center gap-2 text-teal-300">{icon}</div>
      <div className="mt-4 text-sm text-[var(--muted)]">{label}</div>
      <div className="mt-2 text-3xl font-semibold text-[var(--foreground)]">
        {value}
      </div>
      <div className="mt-2 text-sm text-[var(--foreground)]/70">{detail}</div>
    </div>
  );
}

function InfoPill({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/5 px-3 py-3">
      <div className="flex items-center gap-2">{icon}</div>
      <div className="mt-2 text-sm">{label}</div>
    </div>
  );
}

function HotelCard({
  hotel,
  active,
  onOpen,
}: {
  hotel: DiscoverHotel;
  active: boolean;
  onOpen: () => void;
}) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      type="button"
      onClick={onOpen}
      className={clsx(
        "surface w-full overflow-hidden text-left transition",
        active && "ring-2 ring-amber-300/60"
      )}
    >
      <div className="grid gap-4 p-4 lg:grid-cols-[280px_1fr]">
        <div className="relative h-64 overflow-hidden rounded-[1.6rem]">
          <Image src={hotel.imageUrls[0]} alt={hotel.name} fill className="object-cover" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {hotel.availableNow ? (
              <span className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-semibold text-slate-950">
                Available now
              </span>
            ) : null}
            {hotel.hiddenFeesFree ? (
              <span className="rounded-full bg-slate-950/75 px-3 py-1 text-xs font-semibold text-white">
                No hidden fees
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <MapPinned className="h-4 w-4" />
                {hotel.area}, {hotel.city}
              </div>
              <div className="mt-1 text-sm text-[var(--muted)]">
                {hotel.addressLine}
              </div>
              <h3 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">
                {hotel.name}
              </h3>
            </div>
            <div className="rounded-[1.25rem] bg-white/6 px-4 py-3 text-right">
              <div className="text-sm text-[var(--muted)]">Total stay</div>
              <div className="mt-1 text-2xl font-semibold text-[var(--foreground)]">
                Rs {hotel.totalPrice}
              </div>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--foreground)]/78">
            {hotel.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {[hotel.propertyType].concat(hotel.tags).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-[var(--muted)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 grid gap-3 text-sm text-[var(--foreground)]/75 md:grid-cols-4">
            <InfoPill
              icon={<ShieldCheck className="h-4 w-4" />}
              label={`Safety ${hotel.safetyScore}/100`}
            />
            <InfoPill
              icon={<BadgeCheck className="h-4 w-4" />}
              label={hotel.breakfastIncluded ? "Breakfast included" : "Breakfast optional"}
            />
            <InfoPill
              icon={<Clock3 className="h-4 w-4" />}
              label={hotel.responseTime}
            />
            <InfoPill
              icon={<Star className="h-4 w-4 fill-current" />}
              label={`${hotel.rating} • ${hotel.reviewCount} reviews`}
            />
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="text-sm text-[var(--muted)]">{hotel.priceDropLabel}</div>
            <div className="flex items-center gap-2">
              {hotel.payAtHotel ? (
                <span className="rounded-full bg-teal-300/12 px-3 py-1.5 text-xs font-medium text-teal-200">
                  Pay at hotel
                </span>
              ) : null}
              {hotel.freeCancellation ? (
                <span className="rounded-full bg-emerald-300/12 px-3 py-1.5 text-xs font-medium text-emerald-200">
                  Free cancellation
                </span>
              ) : null}
              {hotel.coupleFriendly ? (
                <span className="rounded-full bg-amber-300/12 px-3 py-1.5 text-xs font-medium text-amber-200">
                  Couple friendly
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
