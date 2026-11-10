# Local Bus Schedule Planner (Faisal Movers)
**Web Engineering Coursework Project (5th Semester)**  
*Author:* Armaghan Mahmood Shams  
*Technologies:* HTML5, CSS3, Vanilla JavaScript (ES6+)

---

## 1. Project Overview & User / Problem Statement

### 1.1 Target Users
1. **Daily & Weekend Commuters / University Students:** Students traveling between university campuses (e.g. Islamabad/Rawalpindi) and hometowns (Lahore, Peshawar, Faisalabad, Multan) on weekends and semester breaks.
2. **Budget-Conscious Inter-City Travelers:** Passengers seeking the most affordable or fastest bus option without browsing complex booking systems.
3. **Specific-Tier Passengers:** Commuters looking specifically for *Standard*, *Executive*, or *Executive Plus* bus services.

### 1.2 The Problem
- **Fragmented & Cluttered Information:** Existing bus portals are often heavy, bloated with promotional ads, and require full page reloads for simple schedule queries.
- **Poor Mobile Experience:** Most bus portals perform poorly on mobile viewports with elements overflowing the screen width.
- **Lack of Rapid Comparison:** Travelers cannot quickly filter by departure time, maximum fare limit, and bus category in a single lightweight interface.

### 1.3 The Solution
The **Local Bus Schedule Planner** is an accessible, client-side single-page application (SPA). It provides:
- **Homogenized Aesthetic:** Unified color palette and consistent typography across all buttons, inputs, tables, and cards.
- **Dynamic & Responsive Experience:** Keyframe animations adapted for both mobile phones and laptops without layout breakage.
- **Interactive Results Display Area:** Displays an overview route map by default, automatically vanishes the map when search results appear, and restores the map when reset.
- **Instant Client-Side Filtering & Sorting:** Real-time schedule lookup and table filtering with zero network latency.

---

## 2. Brief Wireframe & Layout Architecture

### 2.1 Desktop / Laptop View (2-Column Grid Layout)
```
+-----------------------------------------------------------------------------------+
|  [Header]  Faisal Movers Bus Planner                    [Plan | Results | Table]   |
+-----------------------------------------------------------------------------------+
|  [Welcome Banner (#intro)]                                                        |
|  "See which Faisal Movers buses run between your cities..."                       |
|  [ = = = = = = = = = = = = = = [ BUS ANIMATION >>> ] = = = = = = = = = = = = = = ] |
+------------------------------------------+----------------------------------------+
|  LEFT COLUMN: Plan a Trip (#plan)        |  RIGHT COLUMN: Results Area (#results) |
|  +------------------------------------+  |  Sort by: [ Earliest Departure v ]     |
|  | From:        [ Select Origin     v ]|  |  Summary: "Choose a trip above..."    |
|  | To:          [ Select Dest       v ]|  |                                        |
|  | Date:        [ YYYY-MM-DD         ] |  |  +----------------------------------+  |
|  | Leave after: [ HH:MM              ] |  |  | [INITIAL STATE: ROUTE MAP IMAGE] |  |
|  | Max Fare:    [ e.g. 3000          ] |  |  | (Vanishes when results appear)   |  |
|  | Bus Type:    [ Any               v ]|  |  +----------------------------------+  |
|  |                                    |  |                                        |
|  | [ Search Bus ]   [ Reset Form ]    |  |  [SEARCH STATE: DYNAMIC BUS CARDS]     |
|  +------------------------------------+  |  [Card 1: RWP -> LHR | Rs. 1750]       |
|                                          |  [Card 2: RWP -> LHR | Rs. 2100]       |
+------------------------------------------+----------------------------------------+
|  FULL WIDTH: All Timetables (#timetable)                                          |
|  Filter by city: [ Search...        ]                                             |
|  +------------------------------------------------------------------------------+ |
|  | From       | To        | Date       | Departs | Arrives | Fare    | Type     | |
|  |------------|-----------|------------|---------|---------|---------|----------| |
|  | Rawalpindi | Peshawar  | 2026-11-16 | 05:00   | 07:00   | Rs. 900 | Standard | |
|  +------------------------------------------------------------------------------+ |
+-----------------------------------------------------------------------------------+
|  [Footer] Disclaimer & Student Project Credits                                    |
+-----------------------------------------------------------------------------------+
```

### 2.2 Mobile View (Single-Column Stacked Layout)
```
+------------------------------------------+
|  [Header] Faisal Movers Bus Planner      |
|  [Plan] [Results] [Timetable] [About]    |
+------------------------------------------+
|  [Welcome Banner]                        |
|  - Short intro paragraph                 |
|  - Responsive bus animation (scaled down,|
|    contained in track, no page overflow) |
+------------------------------------------+
|  [Plan a Trip Form]                      |
|  - From: [ Select Origin          v ]    |
|  - To:   [ Select Destination     v ]    |
|  - Date / Time inputs                    |
|  - Fare & Bus Type inputs                |
|  [  SEARCH (Full Width Button)     ]     |
|  [  RESET  (Full Width Button)     ]     |
+------------------------------------------+
|  [Results Area]                          |
|  - Sort dropdown                         |
|  - Summary message                       |
|  - [ Route Map Image ] (Initial State)   |
|         -- OR --                         |
|  - [ Bus Result Cards ] (Stacked 1-Col)  |
+------------------------------------------+
|  [All Timetables]                        |
|  - Search filter input                   |
|  - Horizontally scrollable table         |
|    (overflow-x: auto)                    |
+------------------------------------------+
|  [Footer] Academic project info          |
+------------------------------------------+
```

---

## 3. Web Development Life Cycle (WDLC) Stages

The development of this project adheres to the five core stages of the Web Development Life Cycle:

### Stage 1: Planning & Requirements Analysis
- **Goal Definition:** Create a responsive, client-side web application for students and commuters to search and filter local inter-city bus schedules.
- **Requirement Elicitation:**
  - Functional requirements: Origin/Destination selection, date/time filtering, max fare ceiling, bus class categorization, sorting (by time, fare, duration), dynamic timetable search, and visual route map.
  - Non-functional requirements: Responsive layout (mobile, tablet, laptop), fast client-side performance, accessible form controls, clean student-style code.

### Stage 2: Architectural & UI/UX Design
- **Homogenized Style Guide:**
  - *Color Palette:* Primary Navy (`#1b1f3b`), Vibrant Coral Accent (`#ff6b4a`), Coral Hover (`#e85535`), Soft Tint (`#fff1ee`), Warm Background (`#f6f4f1`), Card White (`#ffffff`), and Dark Text (`#1f2333`).
  - *Typography:* Unified `font-family: "Trebuchet MS", "Segoe UI", Arial, sans-serif` applied to body, buttons, inputs, selects, and tables.
- **Wireframing:** Designing the two-column laptop grid vs. stacked single-column mobile view.
- **Motion & Interaction Design:** Designing the road-track bus driving animation, card rise animations, and validation error shake.

### Stage 3: Implementation & Development
- **Semantic HTML5:** Using landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<fieldset>`, `<table>`, `<footer>`) for structure and accessibility.
- **Student-Style CSS3:** 
  - Direct, clean color definitions without complex `:root` structures for simple student-level maintainability.
  - Media queries (`@media (max-width: 600px)` and `@media (min-width: 951px)`) ensuring multi-bus trailing animations and layouts adapt to laptops and mobile phones.
  - Short, clear styling without bloated external frameworks or complex AI boilerplate.
- **Vanilla JavaScript (ES6+):**
  - Dynamic local date generator (`getDynamicDate`) preventing stale test dates.
  - Client-side data model containing sample routes.
  - DOM event listeners for search submission, real-time input filtering, and form reset.
  - State management for toggling the route map (`mapContainer.style.display`).

### Stage 4: Testing & Verification
- **Functional Validation Testing:**
  - Empty field submission prevented by required attributes and custom validation logic.
  - Identical origin and destination detected with polite user-facing error message.
  - Negative fare inputs rejected.
- **Cross-Device Responsive Testing:**
  - Tested on laptop resolutions (1000px+): 2-column sidebar layout, smooth 1100px bus animation.
  - Tested on mobile viewports (<600px): stacked layout, full-width buttons, scaled bus animation traveling `100vw` with zero horizontal page blowout.
- **Map Behavior Testing:**
  - Verified map is visible upon page load.
  - Verified map vanishes when valid search results appear or when empty results are rendered.
  - Verified map immediately returns upon clicking the Reset button.

### Stage 5: Deployment & Maintenance
- **Deployment Strategy:** The application is completely self-contained (HTML, CSS, JS, and image assets), ready for deployment on GitHub Pages, university web servers, or Apache/Nginx.
- **Maintenance:** The dataset is cleanly isolated at the top of `script.js`, allowing routes, fares, and departure times to be updated or expanded easily.

---

## 4. Browser Client vs. Web Server Architecture

In modern web engineering, understanding where execution occurs is critical:

| Responsibility / Feature | Browser Client (Frontend) | Web Server (Backend / Host) |
| :--- | :--- | :--- |
| **HTML/CSS Parsing & Rendering** | **Runs in Browser:** Parses HTML markup, builds DOM tree, applies CSS rules, and paints pixels. | **Runs on Server:** Does not render; simply delivers static `.html` and `.css` files via HTTP GET requests. |
| **Responsive Media Queries** | **Runs in Browser:** Detects viewport width changes (`max-width: 600px`, `min-width: 951px`) and adjusts styles instantly. | **Runs on Server:** None. The server is unaware of the client's screen size or orientation. |
| **Dynamic Animations** | **Runs in Browser:** GPU/Browser execution of keyframe animations (`busDrive`, `rise`, `shake`) and hover transitions. | **Runs on Server:** None. |
| **Form Validation & Search Filtering** | **Runs in Browser:** JavaScript executes instant validation (origin != destination) and filters the sample array without network latency. | **Production Extension:** Server would perform secondary server-side validation to prevent forged requests. |
| **Route Map Visibility Toggle** | **Runs in Browser:** JavaScript manipulates `mapContainer.style.display` based on user search and reset actions. | **Runs on Server:** None. Server merely sends the `map.jpeg` file once. |
| **Data Storage & Persistence** | **Client:** Currently keeps sample dataset in browser JavaScript memory (ephemeral per page load). | **Production Backend:** Runs persistent databases (e.g. PostgreSQL, MySQL, MongoDB) to store millions of live seat records, bookings, and user accounts. |
| **Authentication & Payments** | **Client:** Collects user credentials or card inputs via secure forms. | **Production Backend:** Runs server-side encryption (bcrypt), session/JWT issuance, and connects to payment APIs (EasyPaisa, JazzCash, Stripe). |
| **Asset Delivery & Networking** | **Client:** Initiates HTTP requests and caches assets locally. | **Server:** Listens on port 80/443, handles TLS/SSL handshakes, handles HTTP headers and caching policies. |

---

## 5. How to Run the Project
1. Clone or download this project directory.
2. Open `index.html` in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
3. No build tools, Node.js, or external package installations are required.
