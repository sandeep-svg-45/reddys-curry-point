# Reddy's Meals & Curry Point Website

Official website for **Reddy's Meals & Curry Point**, located in Santhi Nagar, Uppal, Hyderabad.

---

## About the Website

A fast, responsive web application for customers to explore the daily menu, check prices, find the exact shop location, and contact the restaurant for advance bulk orders.

### Key Sections & Features
- **Daily Menu**: Browse vegetarian meals, non-veg meals, daily curries, and biryani with prices and today's availability.
- **Advance Group Pre-Bookings**: Information for bulk meal orders (20 to 100 members) for events, functions, and gatherings.
- **Direct Store Calling**: One-tap phone call buttons for primary and secondary contact numbers.
- **Store Location & Directions**: Live interactive Google Map and direct navigation buttons for Google Maps and Apple Maps.
- **Store Policy**: Clear takeaway/walk-in notice (Store collection only, no home delivery).

---

## How to Edit Text & Business Details

All text and restaurant details can be updated easily in the following files:

### 1. Restaurant Contact Details & Location (`script.js`)
Open `script.js` to change phone numbers, shop address, and map links:
- `primaryPhone`: Primary contact number (default: `7032920843`)
- `secondaryPhone`: Secondary contact number (default: `9908365217`)
- `address`: Shop address displayed on the site
- `googleMapsUrl`: Google Maps listing link
- `appleMapsUrl`: Apple Maps listing link

### 2. Menu Items & Prices (`script.js`)
Edit the `DEFAULT_MENU` array in `script.js` to update dishes:
- `name`: Dish name (e.g., "Veg Meals", "Chicken Biryani")
- `price`: Price in Rupees (e.g., `100`, `120`)
- `description`: Short description of the dish
- `type`: `"veg"` or `"non-veg"`
- `category`: `"meals"`, `"veg"`, or `"biryani"`

### 3. Page Content & Notices (`index.html`)
Open `index.html` to customize general text:
- **Top Marquee Banner**: Announcement text running across the top bar.
- **Hero Headline & Subtext**: Main welcome message and opening timings.
- **Group Pre-Booking Info**: Minimum/maximum member limits (currently 20–100 members).
- **Store Policies**: Notices like "No Home Delivery" and "Walk-in Welcome".

---

## Local Preview
Open `index.html` directly in any web browser, or run a local server:
```bash
npx serve . --listen 3000
```
