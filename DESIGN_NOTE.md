# Design Note & Architectural Documentation
**Course:** Web Engineering (5th Semester)  
**Project:** Local Bus Schedule Planner (Faisal Movers)  
**Author:** Armaghan Mahmood Shams  

---

## 1. Problem & User Identification

### 1.1 The User
- **University Students:** Traveling weekly or monthly between study institutions (e.g., Rawalpindi / Islamabad) and hometowns (e.g., Lahore, Peshawar, Multan, Faisalabad).
- **Inter-City Commuters:** Everyday citizens needing quick transit checks across major national motorways and GT road routes.
- **Budget-Sensitive Travelers:** Commuters who have a fixed travel allowance (e.g., maximum fare limit of Rs. 2,000) or who prioritize service tiers (Executive vs. Standard).

### 1.2 The Problem
1. **Inefficient Information Retrieval:** Many transit websites require multi-step booking funnels simply to view departure and arrival times.
2. **Poor Responsiveness on Mobile Devices:** Commuters checking bus times from mobile phones on the go frequently encounter clipped tables, horizontal scroll overflow, and unresponsive interfaces.
3. **Lack of Instant Filtering:** Users are unable to dynamically sort results by shortest duration, earliest departure, or maximum fare without triggering full page reloads.

### 1.3 The Design Solution
A streamlined single-page application built with clean, semantic HTML5, homogenized CSS3 styling, responsive media queries, and Vanilla JavaScript. The interface features a dynamic route map in the results display area that is visible upon load and reset, and automatically vanishes when search results appear.

---

## 2. Brief Wireframe

### Desktop / Laptop Wireframe (>= 951px)
```
+---------------------------------------------------------------------------------------+
|  FAISAL MOVERS BUS PLANNER                            [Plan] [Results] [Timetable]    |
+---------------------------------------------------------------------------------------+
|  [Welcome Banner]                                                                     |
|  "Find the right bus for your trip..."                                                |
|  ---------------------------------[ moving bus >>> ]--------------------------------- |
+-------------------------------------------+-------------------------------------------+
|  SECTION: Plan a Trip (#plan)             |  SECTION: Results (#results)              |
|  ---------------------------------------  |  ---------------------------------------  |
|  Origin:      [ Rawalpindi            v ] |  Sort by: [ Earliest departure        v ] |
|  Destination: [ Lahore                v ] |  Summary: "Choose a trip above to see..." |
|  Date:        [ 2026-11-10              ] |                                           |
|  Leave after: [ 08:00                   ] |  +-------------------------------------+  |
|  Max Fare:    [ 2500                    ] |  | [ ROUTE MAP IMAGE: map.jpeg ]       |  |
|  Bus Type:    [ Any                   v ] |  | (Visible initially / on reset;      |  |
|                                           |  |  vanishes when results appear)      |  |
|  [  SEARCH  ]      [  RESET  ]            |  +-------------------------------------+  |
|                                           |                                           |
|                                           |  [ SEARCH RESULTS: Bus Cards appear here] |
+-------------------------------------------+-------------------------------------------+
|  SECTION: All Timetables (#timetable)                                                 |
|  Filter by city: [ Type city name...    ]                                             |
|  +----------------------------------------------------------------------------------+ |
|  | From       | To        | Date       | Departs | Arrives | Fare (Rs) | Type       | |
|  |------------|-----------|------------|---------|---------|-----------|------------| |
|  | Multan     | Faisalabad| 2026-11-12 | 06:00   | 09:00   | Rs. 1100  | Standard   | |
|  +----------------------------------------------------------------------------------+ |
+---------------------------------------------------------------------------------------+
|  FOOTER: Academic disclaimer & student author attribution                             |
+---------------------------------------------------------------------------------------+
```

### Mobile Phone Wireframe (<= 600px)
```
+-----------------------------------------------+
|  FAISAL MOVERS BUS PLANNER                    |
|  [Plan] [Results] [Timetable] [About]         |
+-----------------------------------------------+
|  [Welcome Banner]                             |
|  - Description text                           |
|  - Contained responsive bus animation         |
+-----------------------------------------------+
|  [Plan a Trip Form]                           |
|  - From: [ Select Origin        v ]           |
|  - To:   [ Select Destination   v ]           |
|  - Date: [ YYYY-MM-DD             ]           |
|  - Leave after: [ HH:MM           ]           |
|  - Max Fare: [ Rs.                ]           |
|  - Bus Type: [ Any              v ]           |
|  [ SEARCH BUTTON (100% width)     ]           |
|  [ RESET BUTTON  (100% width)     ]           |
+-----------------------------------------------+
|  [Results Display Area]                       |
|  - Sort dropdown: [ Earliest... v ]           |
|  - Results summary message                    |
|  - [ Route Map Image ] (Default / Reset)      |
|            -- OR --                           |
|  - [ Bus Result Cards ] (1-Col stack)         |
+-----------------------------------------------+
|  [All Timetables]                             |
|  - Search filter                              |
|  - Horizontally scrollable table container    |
+-----------------------------------------------+
|  [Footer] Student Project Credits             |
+-----------------------------------------------+
```

---

## 3. Web Development Life Cycle (WDLC) Stages

| WDLC Stage | Description & Application to this Project |
| :--- | :--- |
| **1. Planning & Analysis** | Identified commuting student and traveler needs. Defined requirements: dynamic schedule query, date calculation, category filtering, responsive animations, and clear visual feedback. |
| **2. UI/UX & System Design** | Created wireframes for laptop and mobile layouts. Established homogenized color scheme (Navy `#1b1f3b`, Coral `#ff6b4a`, Warm Background `#f6f4f1`) and unified typography (`"Trebuchet MS", Arial, sans-serif`). Designed 3-bus trailing convoy animation and route map toggle. |
| **3. Implementation / Coding** | Authored semantic HTML5, concise student-friendly CSS3 with direct colors (no `:root` overhead) and responsive media queries, and Vanilla JavaScript DOM manipulation routines (search filtering, sorting, map toggling). |
| **4. Testing & QA** | Verified form validation (empty inputs, origin equals destination, negative fares). Tested responsive animations on mobile (<600px) and laptop (1000px+). Verified that the route map vanishes on search and reappears on reset. |
| **5. Deployment & Maintenance** | Deployed as a client-side bundle ready for static hosting. Structured data model in `script.js` for quick maintainability. |

---

## 4. Architectural Analysis: Browser Client vs. Web Server

### 4.1 What Runs in the Browser Client
The browser client acts as the interactive presentation and execution runtime:
1. **DOM Construction & Layout:** Parses `index.html` into the Document Object Model tree and recalculates styles based on `style.css`.
2. **Media Queries & Responsiveness:** Evaluates media query breakpoints (`@media (max-width: 600px)` and `@media (min-width: 951px)`) directly on the device, adapting layouts between laptop grid and mobile stack.
3. **Hardware-Accelerated Animations:** Executes CSS `@keyframes busDrive`, `@keyframes busDriveMobile`, `@keyframes rise`, and `@keyframes shake` without querying any remote server.
4. **Client-Side JavaScript Execution:**
   - Evaluates dynamic dates with JavaScript's `Date` object (`getDynamicDate`).
   - Validates user input before processing.
   - Filters and sorts in-memory data arrays instantaneously.
   - Toggles route map visibility (`mapContainer.style.display = "none"` when results render, `"block"` on reset).
   - Filters timetable rows live as the user types into `#tableFilter`.

### 4.2 What Runs on a Web Server
In contrast, a web server provides hosting, persistence, and secure transaction handling:
1. **Static File Hosting (Current Setup):** Delivers `index.html`, `style.css`, `script.js`, and images (`bus.png`, `location.png`, `location_prem.png`, `map.jpeg`) via standard HTTP/HTTPS GET requests.
2. **Database Management (Production Extension):** Stores persistent records in a relational (e.g. MySQL, PostgreSQL) or NoSQL database for real-time seat reservations, bus tracking GPS telemetry, and driver logs.
3. **Authentication & Security (Production Extension):** Validates user credentials, issues JWT/session tokens, and enforces access control rules.
4. **Payment Processing (Production Extension):** Communicates with banking gateways (EasyPaisa, JazzCash, 1Link) via secure backend webhooks.
5. **Messaging & Ticket Generation (Production Extension):** Generates PDF e-tickets and dispatches transactional SMS and confirmation emails to passengers.
