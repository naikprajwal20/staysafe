# StayEase MVP

StayEase is a hotel-booking MVP built from the provided product plan. This repo is organized as a monorepo with:

- `stayease-web` — Next.js frontend with premium UI, transparent pricing, map-style discovery, quick view, and instant booking flow.
- `stayease-api` — Spring Boot backend with seeded hotel data, filtering, reviews, tonight deals, and booking endpoints.

## What is implemented

- Transparent pricing with taxes included in every total.
- Verified-photo and authentic-review messaging.
- Smart filters for cancellation, pay-at-hotel, area tags, and sort modes.
- Map-style interactive hotel exploration.
- Last-minute deals and recommendation spotlights.
- Booking flow with confirmation toast and backend persistence.
- Dark mode toggle and responsive premium layout.

## Local run

### Backend

From `stayease-api`:

```powershell
& 'C:\Users\prajw\OneDrive\Desktop\temp1\gradle-9.4.1\bin\gradle.bat' bootRun
```

API base URL:

```text
http://localhost:8080
```

Useful endpoints:

```text
GET  /api/discover
POST /api/bookings
GET  /actuator/health
```

### Frontend

From `stayease-web`:

```powershell
$env:NEXT_PUBLIC_API_BASE_URL='http://localhost:8080'
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:3000
```

## Environment variables

### Frontend

- `NEXT_PUBLIC_API_BASE_URL`

### Backend

- `DATABASE_URL`
- `DATABASE_USERNAME`
- `DATABASE_PASSWORD`
- `DATABASE_DRIVER`
- `CORS_ALLOWED_ORIGINS`

The backend defaults to in-memory H2 for local development.

## Deployment notes

- Deploy `stayease-web` to Vercel with the project root set to `stayease-web`.
- Set `NEXT_PUBLIC_API_BASE_URL` in Vercel to your deployed backend URL.
- Deploy `stayease-api` to a Java-friendly host such as Render, Railway, or AWS Elastic Beanstalk.
- For production, point the backend to PostgreSQL by setting `DATABASE_*` env vars and `CORS_ALLOWED_ORIGINS` to the Vercel domain.
