<div align="center">

# 🍛 Reddy's Meals & Curry Point

**Authentic South Indian Meals, Curries & Biryani • Santhi Nagar, Uppal, Hyderabad**

[![Website Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=flat-square)](#)
[![Stack](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20JavaScript-orange?style=flat-square)](#)
[![Responsive](https://img.shields.io/badge/Design-Fully%20Responsive-blue?style=flat-square)](#)
[![Dependencies](https://img.shields.io/badge/Dependencies-Zero%20(Pure%20Vanilla)-brightgreen?style=flat-square)](#)

<p align="center">
  <a href="#-about-the-project">About</a> •
  <a href="#-key-features">Key Features</a> •
  <a href="#-website-sections">Sections</a> •
  <a href="#-customization-guide">Customization</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-business-information">Contact</a>
</p>

---

</div>

## 📖 About the Project

**Reddy's Meals & Curry Point** is a lightweight, high-performance web application designed for a beloved local eatery in Santhi Nagar, Uppal, Hyderabad. 

The website serves as an interactive digital storefront where customers can:
- Explore the daily vegetarian and non-vegetarian menu with clear pricing.
- Check today's fresh dish availability.
- Arrange advance group pre-bookings for 20 to 100 members.
- Call the store directly with 1-tap dial buttons.
- Open precise GPS turn-by-turn directions via Google Maps or Apple Maps.

Built with **Zero external libraries or frameworks** — 100% pure HTML5, modern Vanilla CSS, and native JavaScript for instantaneous loading and seamless performance on all smartphones and computers.

---

## ✨ Key Features

- **📱 Mobile-First Responsive Design**: Optimized for handheld phone browsing with sticky bottom call/pre-book actions, a smooth navigation drawer, and thumb-friendly controls.
- **🍛 Live Menu & Category Filtering**: Instant client-side filtering across *All Items*, *Available Today*, *Meals*, *Daily Veg Curries*, and *Chicken Biryani*.
- **👥 Bulk Group Pre-Bookings**: Dedicated booking section with clear ordering guidance for functions, gatherings, and family events (20–100 members).
- **📞 One-Tap Direct Calling**: Integrated calling links for both primary and secondary contact numbers across the header, body cards, and footer.
- **📍 Verified Google Maps Integration**: Interactive map embed centered exactly on the shop location beside Maruthi Kirana, plus direct 1-tap links for Google Maps and Apple Maps.
- **🚫 Clear Store Policy**: Visible notices emphasizing in-store pickup and walk-in service (store collection only; no home delivery).
- **⚡ SEO & Rich Snippets**: Pre-configured with Schema.org `Restaurant` JSON-LD, OpenGraph preview metadata, and semantic HTML tags.

---

## 🧭 Website Sections

| Section Anchor | Purpose |
| :--- | :--- |
| **`#home`** | Top headline marquee, warm welcome banner, key highlights, and primary call-to-actions. |
| **`#menu`** | Interactive menu grid with food photos, vegetarian/non-vegetarian indicators, prices, and availability tags. |
| **`#prebook`** | Bulk ordering requirements, group size limits (20–100 members), and direct pre-order phone lines. |
| **`#about`** | Store backstory, commitment to hygiene, fresh daily cooking, and traditional recipes. |
| **`#contact`** | Interactive Google Map, complete street address, opening timings, and primary/secondary phone dialers. |

---

## 🛠️ Customization Guide

All restaurant details, dishes, and prices are centralized in easy-to-edit configuration blocks:

### 1. Business Info & Phone Numbers (`script.js`)
Edit the `BUSINESS` object at the top of `script.js`:
```javascript
const BUSINESS = {
  name: "Reddy’s Meals & Curry Point",
  primaryPhone: "7032920843",       // Primary calling line
  secondaryPhone: "9908365217",     // Secondary calling line
  whatsappPhone: "917032920843",    // WhatsApp inquiry number
  address: "3/152, Santhi Nagar, Uppal, Hyderabad, Telangana 500039",
  googleMapsUrl: "https://maps.google.com/?cid=10273575392348699832",
  appleMapsUrl: "https://maps.apple.com/place?address=3/152..."
};
```

### 2. Menu Items & Pricing (`script.js`)
Update dishes, prices, and descriptions in the `DEFAULT_MENU` array in `script.js`:
```javascript
{
  id: "veg-meals",
  name: "Veg Meals",
  category: "meals",              // 'meals' | 'veg' | 'biryani'
  type: "veg",                    // 'veg' | 'non-veg'
  description: "Fresh and wholesome vegetarian meals prepared daily.",
  price: 100,                     // Price in ₹
  image: "assets/veg-meals.jpg",
  emoji: "🍛",
  availability: true              // true = Available | false = Sold Out
}
```

### 3. General Text & Notices (`index.html`)
- **Top Marquee**: Edit line ~41 in `index.html` to adjust the moving announcement text.
- **Pre-Booking Rules**: Edit lines ~235–270 in `index.html` to update group sizes or pickup instructions.
- **Store Notices**: Edit lines ~340–343 in `index.html` for walk-in and takeaway policies.

---

## 📂 Project Structure

```plaintext
reddys-curry-point/
├── assets/                       # High-resolution food images & icons
│   ├── favicon.svg               # Custom brand tab icon (Golden 'R' badge)
│   ├── hero-thali.jpg            # Hero section showcase photo
│   ├── veg-meals.jpg             # Vegetarian thali image
│   ├── chicken-biryani.jpg       # Authentic biryani image
│   ├── curry-spread.jpg          # Assorted curry spread photo
│   └── ... (daily curries)       # Dal, sambar, rasam, vegetable curries
├── index.html                    # Semantic HTML5 page layout & Schema JSON-LD
├── style.css                     # Responsive styles, grid layouts & animations
├── script.js                     # Menu state, category filter, phone linking
├── README.md                     # Comprehensive project documentation
└── .gitignore                    # Git file exclusions
```

---

## 🚀 Deployment

Because this project is built with zero build steps or heavy dependencies, it can be hosted on any static hosting service in seconds:

### Option A: GitHub Pages (Recommended - 100% Free)
1. In your GitHub repository, navigate to **Settings** > **Pages**.
2. Under **Build and deployment > Source**, select **Deploy from a branch**.
3. Under **Branch**, choose `main` and `/ (root)`, then click **Save**.
4. Your site will be published at:
   ```
   https://<your-username>.github.io/<your-repo-name>/
   ```

### Option B: Vercel or Netlify
1. Connect your GitHub repository to [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
2. Leave Build Command and Output Directory blank.
3. Click **Deploy** to receive a custom production URL with free SSL.

### Option C: Local Preview
Run any local static server inside the directory:
```bash
npx serve . --listen 3000
```
Or simply double-click `index.html` to open it in your web browser.

---

## 📍 Business Information

<div align="center">

| Detail | Information |
| :--- | :--- |
| **Business Name** | Reddy's Meals & Curry Point (రెడ్డీస్ కర్రీ పాయింట్) |
| **Address** | 3/152, Santhi Nagar, Uppal, Hyderabad, Telangana 500039 |
| **Landmark** | Beside Maruthi Kirana & General Store |
| **Primary Contact** | [+91 7032920843](tel:+917032920843) |
| **Secondary Contact** | [+91 9908365217](tel:+919908365217) |
| **Service Model** | Walk-in Store Takeaway • Bulk Group Orders (20–100 pax) |
| **Home Delivery** | ❌ Not Available |

</div>

---

<div align="center">
  <sub>© 2026 Reddy's Meals & Curry Point. All rights reserved.</sub>
</div>
