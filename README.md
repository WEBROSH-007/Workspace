# Workspace – Room Booking Dashboard

A clean, production-grade room booking app built with **Next.js 14 (App Router)** + **Tailwind CSS**.

## Setup

```bash
# 1. Copy all files into your existing Next.js project

# 2. Install dependencies (already included with Next.js + Tailwind)
npm install

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Credentials

```
Email:    alex@workspace.io
Password: password123
```

## Project Structure

```
app/
  layout.jsx          # Root layout with AppProvider
  page.jsx            # Redirects to /login
  login/page.jsx      # Login page
  dashboard/page.jsx  # Room listing dashboard
  bookings/page.jsx   # My Bookings page
  globals.css         # Global styles

components/
  ui/index.jsx                  # Button, Input, Badge, Card, Spinner, etc.
  layout/Navbar.jsx             # Sticky navigation bar
  rooms/RoomCard.jsx            # Room listing card
  rooms/BookingModal.jsx        # 3-step booking flow modal
  rooms/RoomFilters.jsx         # Search, filter, sort controls
  bookings/BookingCard.jsx      # Booking history card

context/
  AppContext.jsx      # Auth + bookings state (useReducer + Context)

services/
  api.js              # Mock async service layer

data/
  rooms.js            # Mock room data + MOCK_USER

architecture-notes.txt  # Design decisions explained
```

## Features

- Mock login with form validation
- Protected routes
- Room listing with search, filter by type, sort by price/capacity
- 3-step booking flow: dates → confirm → success
- Availability checking (try booking Boardroom Apex on a weekend to see "unavailable")
- My Bookings page with upcoming/past split
- Full loading, empty, and error states
- Responsive design (mobile-first)
- React.memo + useMemo optimizations
