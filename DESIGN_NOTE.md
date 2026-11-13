# Design Note: Faisal Movers Bus Planner

**Course:** Web Engineering (5th Semester)
**Project:** Local Bus Schedule Planner (Faisal Movers)
**Author:** Armaghan Mahmood Shams

This note covers who the project is for, how it is laid out, how it followed the Web Development Life Cycle, the design of the bookings feature, and what runs in the browser versus on a server. Setup instructions and screenshots are in [README.md](README.md).

---

## 1. Problem and User

### 1.1 Users
- **University students** travelling between campuses (Rawalpindi and Islamabad) and hometowns (Lahore, Peshawar, Multan, Faisalabad) on weekends and semester breaks.
- **Inter-city commuters** who need a quick check of times across the motorway and GT Road routes.
- **Budget-conscious travellers** with a fixed allowance (for example a maximum fare of Rs. 2,000) or a preferred service tier (Standard, Executive, Executive Plus).

### 1.2 Problems
1. **Slow information retrieval.** Many transit sites force a multi-step booking flow just to see departure and arrival times.
2. **Poor mobile experience.** Clipped tables, horizontal overflow and cramped controls make checking times on a phone frustrating.
3. **No quick comparison.** Users cannot filter by time, fare and bus class together, or sort by duration, without reloading pages.
4. **No way to keep a shortlist.** After finding a good bus, users have to remember it or search again.

### 1.3 Solution
A single-page, client-side application built with semantic HTML5 with consistent, responsive style. Users search, filter and sort instantly, then tick a bus to save it to a personal list of up to five bookings that survives page reloads.

---

## 2. Wireframes

### 2.1 Desktop (951px and wider)

```
+---------------------------------------------------------------------------------------+
|  FAISAL MOVERS BUS PLANNER                [Plan] [Results] [My Bookings (2)] [Table]  |
+---------------------------------------------------------------------------------------+
|  [Welcome banner]                                                                     |
|  "See which Faisal Movers buses run between your cities..."                           |
|  ---------------------------------[ moving buses >>> ]------------------------------- |
+-------------------------------------------+-------------------------------------------+
|  PLAN A TRIP (#plan)                      |  RESULTS (#results)                       |
|  Origin:      [ Rawalpindi            v ] |  Sort by: [ Earliest departure        v ] |
|  Destination: [ Lahore                v ] |  Summary: "3 buses found from..."         |
|  Date:        [ 2026-11-16              ] |  Notice:  [booking message / warning]     |
|  Leave after: [ 08:00                   ] |                                           |
|  Max fare:    [ 2500                    ] |  +-------------------------------------+  |
|  Bus type:    [ Any                   v ] |  | RWP -> LHR   11:00 -> 15:20         |  |
|                                           |  | Date | Duration | Fare | [Executive]|  |
|  [ SEARCH ]  [ RESET ]                    |  | [x] Booked (untick to cancel)       |  |
|                                           |  +-------------------------------------+  |
|                                           |  (route map shows here until a search)    |
+-------------------------------------------+-------------------------------------------+
|  MY BOOKINGS (#bookings), full width                                                  |
|  "You have 2 of 5 bookings."   Stored in this browser only.                           |
|  +-----------------------------+  +-----------------------------+                     |
|  | RWP -> LHR  11:00 -> 15:20  |  | LHR -> KHI  16:30 -> 07:00  |                     |
|  | Date | Duration | Fare      |  | Date | Duration | Fare      |                     |
|  | [ Delete booking ]          |  | [ Delete booking ]          |                     |
|  +-----------------------------+  +-----------------------------+                     |
|  (with 0 bookings: "You don't have any bookings.")                                    |
+---------------------------------------------------------------------------------------+
|  ALL TIMETABLES (#timetable), full width                                              |
|  Filter by city: [ Type a city...       ]                                             |
|  | From | To | Date | Departs | Arrives | Fare (Rs) | Type |                          |
+---------------------------------------------------------------------------------------+
|  ABOUT (#about), full width                                                           |
+---------------------------------------------------------------------------------------+
|  FOOTER: academic disclaimer and author credit                                        |
+---------------------------------------------------------------------------------------+
```

### 2.2 Mobile (600px and narrower)

```
+-----------------------------------------------+
|  FAISAL MOVERS BUS PLANNER                    |
|  [Plan] [Results] [My Bookings 2] [Table]     |
|  [About]                                      |
+-----------------------------------------------+
|  [Welcome banner]                             |
|  - Intro text                                 |
|  - Contained bus animation                    |
+-----------------------------------------------+
|  [Plan a Trip form]                           |
|  - From / To                                  |
|  - Date, Leave after                          |
|  - Max fare, Bus type                         |
|  [ SEARCH (full width) ]                      |
|  [ RESET  (full width) ]                      |
+-----------------------------------------------+
|  [Results]                                    |
|  - Sort dropdown, summary, booking notice     |
|  - Route map (default) OR bus cards (1 column)|
|    each card ends with a "Book this bus" box  |
+-----------------------------------------------+
|  [My Bookings]                                |
|  - Summary and note                           |
|  - Booking cards (1 column) with Delete button|
|  - Empty message when there are none          |
+-----------------------------------------------+
|  [All Timetables]                             |
|  - City filter                                |
|  - Horizontally scrollable table              |
+-----------------------------------------------+
|  [Footer]                                     |
+-----------------------------------------------+
```

Between 601px and 950px the form fields and result cards use two columns, and the bookings list fills as many columns as fit (minimum card width 280px).

---

## 3. Bookings Feature Design

### 3.1 Rules

| Rule | Behaviour |
| :--- | :--- |
| Creating a booking | Tick **Book this bus** on a result card. |
| Cancelling from results | Untick the same checkbox. |
| Deleting | **Delete booking** button in My Bookings. The matching result checkbox is unticked automatically. |
| Limit | Maximum 5 saved bookings. A sixth attempt is refused with an amber warning and the checkbox is reset. |
| Empty state | "You don't have any bookings" message with a hint on how to add one. |
| Duplicates | The same bus on the same date cannot be saved twice. |
| Expiry | A booking whose departure time has passed is removed automatically. Departed buses cannot be booked. |
| Feedback | Peach message for success and removal, amber message for limits and storage problems. |

### 3.2 Data Model

Stored under the `localStorage` key `fmBookings` as a JSON array. Each booking is a snapshot of the trip:

| Field | Type | Example |
| :--- | :--- | :--- |
| `id` | string | `"FM-10"` |
| `date` | string (YYYY-MM-DD) | `"2026-11-20"` |
| `origin`, `destination` | string | `"Rawalpindi"`, `"Lahore"` |
| `departure`, `arrival` | string (HH:MM) | `"11:00"`, `"15:20"` |
| `nextDay` | boolean | `false` |
| `durationMin` | number | `260` |
| `fare` | number | `2100` |
| `type` | string | `"Executive"` |

A booking is identified by `id + "|" + date`.

### 3.3 Handling Dynamic Dates

The sample timetable builds its dates from today's date, so a bus ID such as FM-02 is dated differently each day. Saving only the ID would make an old booking silently change date. Instead:

1. A full copy of the trip is saved, so the booking always shows the date it was made for.
2. The identity key includes the date, so the same bus on different days stays separate.
3. Expiry is checked against the saved date and departure time, using the user's local time.

### 3.4 Robustness

- Stored data is checked on every read. Entries with missing or wrong-typed fields, duplicates or past departures are discarded, and the cleaned list is written back.
- Values are escaped before being placed into the page, so edited storage cannot inject markup.
- Every `localStorage` call is wrapped in `try/catch`. If storage is full or blocked, the user sees a warning and the checkbox returns to its previous state.
- Result cards and booking cards are rebuilt often, so click and change events are handled by **event delegation** on the two list containers.

### 3.5 Styling Approach

All booking styles were added in a separate block at the end of `style.css` using new class names and IDs (`.book-option`, `.book-check`, `.notice`, `.btn-delete`, `#bookings`, `#bookingsList`). The existing rules were not changed, and the new elements reuse the existing palette: navy `#1b1f3b`, coral `#ff6b4a`, tint `#fff1ee`, background `#f6f4f1`, with the amber `#ffb703` already used by the empty-results message for warnings.

---

## 4. Web Development Life Cycle

| Stage | Application to this project |
| :--- | :--- |
| **1. Planning and analysis** | Identified student and commuter needs. Requirements: schedule search, dynamic dates, filtering by fare and class, sorting, responsive layout, and a saved shortlist of bookings. |
| **2. UI/UX and system design** | Drew desktop and mobile wireframes. Set the style guide: Navy `#1b1f3b`, Coral `#ff6b4a`, Coral hover `#e85535`, Tint `#fff1ee`, Background `#f6f4f1`, Card white, Text `#1f2333`, and the `"Trebuchet MS", Arial, sans-serif` font. Designed the bus animation, card entrance, error shake and the map toggle. Designed the booking rules and data model. |
| **3. Implementation** | Semantic HTML5 landmarks (`header`, `nav`, `main`, `section`, `article`, `fieldset`, `table`, `footer`). Plain CSS with direct colour values and media queries at 600px, 601 to 950px and 951px. Vanilla JavaScript for date generation, validation, filtering, sorting, rendering, map toggling and `localStorage` bookings. |
| **4. Testing and QA** | Validation and responsive checks, plus the booking test cases in section 4.1. |
| **5. Deployment and maintenance** | Static bundle ready for GitHub Pages or any web server. The dataset sits at the top of `script.js`, so routes and fares can be updated in one place. |

### 4.1 Test Cases

**Search and layout**

| Test | Expected result |
| :--- | :--- |
| Submit with no origin or destination | Error message and focus moves to the empty field |
| Same origin and destination | Error asking for a different city |
| Negative maximum fare | Error that the fare must be 0 or more |
| Valid search | Matching cards appear and the map hides |
| Reset | Cards clear and the map returns |
| Phone width (under 600px) | Single column, full-width buttons, no horizontal page scroll |

**Bookings**

| Test | Expected result |
| :--- | :--- |
| Tick Book this bus | Success message, nav badge increases, booking appears in My Bookings |
| Reload the page | Bookings are still listed and result checkboxes are ticked |
| Book 5 buses, then a sixth | Amber limit warning, sixth checkbox stays unticked |
| Delete a booking | It disappears, the count drops, and its result checkbox is unticked |
| Untick in results | Booking is removed from My Bookings |
| Delete all bookings | "You don't have any bookings" message and badge hidden |
| Search a bus that already left today | Checkbox is disabled and reads "Already departed" |
| Leave a booking until after departure | It is removed on the next load or when the tab is revisited |
| Block storage in browser settings | Warning that the booking could not be saved |

---

## 5. Architecture: Browser Client vs Web Server

### 5.1 What Runs in the Browser

1. **DOM construction and layout.** Parses `index.html` into the DOM and applies `style.css`.
2. **Media queries.** Evaluates the breakpoints on the device and switches between the laptop grid and the mobile stack.
3. **Animations.** Runs the CSS keyframes `drive` (buses), `rise` (cards) and `shake` (messages), and the hover transitions.
4. **JavaScript.**
   - Generates dates with the `Date` object (`getDynamicDate`).
   - Validates input, then filters and sorts the in-memory data array.
   - Toggles the route map and filters the timetable as the user types.
   - Reads and writes bookings in `localStorage`, and checks departure times against the device clock.

### 5.2 What a Web Server Does

1. **Static hosting (current setup).** Delivers `index.html`, `style.css`, `script.js` and the images over HTTP or HTTPS.
2. **Database (production).** Stores schedules, live seat availability and reservations for all users.
3. **Authentication (production).** Verifies users and issues session or JWT tokens.
4. **Payments (production).** Talks to gateways such as EasyPaisa, JazzCash or 1Link.
5. **Tickets and messaging (production).** Generates e-tickets and sends SMS or email confirmations.

### 5.3 Responsibility Comparison

| Feature | Browser client | Web server |
| :--- | :--- | :--- |
| HTML and CSS rendering | Parses, lays out and paints the page | Only sends the files |
| Media queries | Reads the viewport and adjusts styles | Unaware of screen size |
| Animations | Run in the browser | None |
| Validation and filtering | Instant checks and in-memory filtering | Production: repeats validation so forged requests are rejected |
| Map toggle | JavaScript changes `display` | Sends `map.jpeg` once |
| **Booking storage** | **Current: `localStorage`, saved per browser, per site, editable by the user, no sync between devices** | **Production: database records tied to an account, shared across devices, with real seat counts** |
| **Booking limit and expiry** | **Current: enforced in JavaScript, so a user could bypass it** | **Production: enforced on the server, where it cannot be bypassed** |
| Authentication and payments | Collects credentials and card input | Encrypts, verifies and processes them |
| Asset delivery | Requests and caches files | Serves over port 80 or 443, handles TLS and caching headers |

### 5.4 Why `localStorage` Is Enough Here, and Why It Would Not Be in Production

`localStorage` suits this project because it needs no backend and keeps a small personal shortlist across reloads. It cannot protect against a user editing the stored data, it is not shared between devices, and it has no concept of seat availability or two people booking the same seat. A real booking system would move this logic to a server and database, and the browser would only display what the server confirms.