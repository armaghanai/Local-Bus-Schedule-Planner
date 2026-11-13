function getDynamicDate(dayOffset) {
  let d = new Date();
  d.setDate(d.getDate() + dayOffset); // Add offset days to today
  let year = d.getFullYear();
  let month = String(d.getMonth() + 1).padStart(2, '0');
  let day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Dynamic Dataset generated programmatically
let data = [
  { "id": "FM-01", "date": getDynamicDate(6), "origin": "Rawalpindi", "destination": "Peshawar", "departure": "05:00", "durationMin": 120, "arrival": "07:00", "nextDay": false, "fare": 900,  "type": "Standard" },
  { "id": "FM-02", "date": getDynamicDate(0), "origin": "Rawalpindi", "destination": "Peshawar", "departure": "09:30", "durationMin": 120, "arrival": "11:30", "nextDay": false, "fare": 1200, "type": "Executive" },
  { "id": "FM-03", "date": getDynamicDate(0), "origin": "Rawalpindi", "destination": "Peshawar", "departure": "14:00", "durationMin": 115, "arrival": "15:55", "nextDay": false, "fare": 1500, "type": "Executive Plus" },
  { "id": "FM-04", "date": getDynamicDate(5), "origin": "Rawalpindi", "destination": "Peshawar", "departure": "18:30", "durationMin": 120, "arrival": "20:30", "nextDay": false, "fare": 950,  "type": "Standard" },
  { "id": "FM-05", "date": getDynamicDate(1), "origin": "Lahore", "destination": "Karachi", "departure": "08:00", "durationMin": 960, "arrival": "00:00", "nextDay": true,  "fare": 5800, "type": "Standard" },
  { "id": "FM-06", "date": getDynamicDate(1), "origin": "Lahore", "destination": "Karachi", "departure": "12:00", "durationMin": 900, "arrival": "03:00", "nextDay": true,  "fare": 6450, "type": "Executive" },
  { "id": "FM-07", "date": getDynamicDate(1), "origin": "Lahore", "destination": "Karachi", "departure": "16:30", "durationMin": 870, "arrival": "07:00", "nextDay": true,  "fare": 7200, "type": "Executive Plus" },
  { "id": "FM-08", "date": getDynamicDate(1), "origin": "Lahore", "destination": "Karachi", "departure": "21:00", "durationMin": 900, "arrival": "12:00", "nextDay": true,  "fare": 6200, "type": "Executive" },
  { "id": "FM-09", "date": getDynamicDate(0), "origin": "Rawalpindi", "destination": "Lahore", "departure": "07:00", "durationMin": 270, "arrival": "11:30", "nextDay": false, "fare": 1750, "type": "Standard" },
  { "id": "FM-10", "date": getDynamicDate(7), "origin": "Rawalpindi", "destination": "Lahore", "departure": "11:00", "durationMin": 260, "arrival": "15:20", "nextDay": false, "fare": 2100, "type": "Executive" },
  { "id": "FM-11", "date": getDynamicDate(0), "origin": "Rawalpindi", "destination": "Lahore", "departure": "15:30", "durationMin": 250, "arrival": "19:40", "nextDay": false, "fare": 2600, "type": "Executive Plus" },
  { "id": "FM-12", "date": getDynamicDate(0), "origin": "Rawalpindi", "destination": "Lahore", "departure": "19:00", "durationMin": 270, "arrival": "23:30", "nextDay": false, "fare": 1800, "type": "Standard" },
  { "id": "FM-13", "date": getDynamicDate(0), "origin": "Rawalpindi", "destination": "Lahore", "departure": "23:00", "durationMin": 270, "arrival": "03:30", "nextDay": true,  "fare": 2000, "type": "Executive" },
  { "id": "FM-14", "date": getDynamicDate(2), "origin": "Multan", "destination": "Faisalabad", "departure": "06:00", "durationMin": 180, "arrival": "09:00", "nextDay": false, "fare": 1100, "type": "Standard" },
  { "id": "FM-15", "date": getDynamicDate(2), "origin": "Multan", "destination": "Faisalabad", "departure": "13:30", "durationMin": 170, "arrival": "16:20", "nextDay": false, "fare": 1400, "type": "Executive" },
  { "id": "FM-16", "date": getDynamicDate(1), "origin": "Lahore",     "destination": "Faisalabad", "departure": "07:00", "durationMin": 135, "arrival": "09:15", "nextDay": false, "fare": 1030, "type": "Standard" },
  { "id": "FM-17", "date": getDynamicDate(1), "origin": "Peshawar",   "destination": "Lahore",     "departure": "20:30", "durationMin": 480, "arrival": "04:30", "nextDay": true,  "fare": 3000, "type": "Executive" },
  { "id": "FM-18", "date": getDynamicDate(2), "origin": "Murree",     "destination": "Lahore",     "departure": "23:45", "durationMin": 360, "arrival": "05:45", "nextDay": true,  "fare": 2500, "type": "Executive Plus" },
  { "id": "FM-19", "date": getDynamicDate(3), "origin": "Karachi",    "destination": "Rawalpindi", "departure": "09:00", "durationMin": 1260, "arrival": "06:00", "nextDay": true, "fare": 6600, "type": "Executive" },
  { "id": "FM-20", "date": getDynamicDate(4), "origin": "Rawalpindi", "destination": "Multan",     "departure": "22:00", "durationMin": 480, "arrival": "06:00", "nextDay": true,  "fare": 2620, "type": "Executive" }
];

let hasSearched = false;   // true after the first successful search
let currentResults = [];   // the latest matches, so sorting doesn't need a new search

const BOOKING_KEY = "fmBookings";
const MAX_BOOKINGS = 5;

function bookingKey(id, date) {
  return id + "|" + date;
}

// Turns a trip's date ("YYYY-MM-DD") and departure ("HH:MM") into a local Date
function departureDate(item) {
  const [y, m, d] = item.date.split("-").map(Number);
  const [hh, mm] = item.departure.split(":").map(Number);
  return new Date(y, m - 1, d, hh, mm);
}

function hasDeparted(item) {
  return departureDate(item) < new Date();
}

// Guards against missing or edited data in localStorage
function isValidBooking(b) {
  return b && typeof b === "object" &&
    typeof b.id === "string" &&
    typeof b.origin === "string" &&
    typeof b.destination === "string" &&
    typeof b.type === "string" &&
    typeof b.fare === "number" &&
    typeof b.durationMin === "number" &&
    typeof b.nextDay === "boolean" &&
    typeof b.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(b.date) &&
    typeof b.departure === "string" && /^\d{2}:\d{2}$/.test(b.departure) &&
    typeof b.arrival === "string" && /^\d{2}:\d{2}$/.test(b.arrival);
}

function writeBookings(list) {
  try {
    localStorage.setItem(BOOKING_KEY, JSON.stringify(list));
    return true;
  } catch (e) {
    return false; // storage full, blocked or unavailable
  }
}

// Reads bookings, drops invalid, duplicate and already-departed ones
function readBookings() {
  let raw;
  try {
    raw = JSON.parse(localStorage.getItem(BOOKING_KEY));
  } catch (e) {
    return [];
  }
  if (!Array.isArray(raw)) return [];

  const seen = new Set();
  const valid = raw.filter(function (b) {
    if (!isValidBooking(b) || hasDeparted(b)) return false;
    const key = bookingKey(b.id, b.date);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, MAX_BOOKINGS);

  if (valid.length !== raw.length) writeBookings(valid); // clean up storage
  return valid;
}

function escapeHTML(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// kind: "warn" or "ok". Pass empty text to clear the message.
function setNotice(elementId, text, kind) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = text;
  el.className = text ? "notice notice-" + kind : "notice";
}

function setBookLabel(checkbox, booked) {
  const label = checkbox.parentElement.querySelector(".book-label");
  if (label) label.textContent = booked ? "Booked (untick to cancel)" : "Book this bus";
}

function handleBookingChange(checkbox) {
  const id = checkbox.dataset.id;
  const date = checkbox.dataset.date;
  const route = data.find(function (r) { return r.id === id && r.date === date; });
  if (!route) return;

  const bookings = readBookings();
  const key = bookingKey(id, date);
  const index = bookings.findIndex(function (b) { return bookingKey(b.id, b.date) === key; });

  if (checkbox.checked) {
    if (index !== -1) return; // already booked

    if (hasDeparted(route)) {
      checkbox.checked = false;
      setNotice("bookingMessage", "This bus has already departed and can't be booked.", "warn");
      return;
    }

    if (bookings.length >= MAX_BOOKINGS) {
      checkbox.checked = false;
      setNotice("bookingMessage",
        "Booking limit reached: you can only save " + MAX_BOOKINGS + " bookings. Delete one in My Bookings to book another bus.",
        "warn");
      return;
    }

    bookings.push({
      id: route.id,
      date: route.date,
      origin: route.origin,
      destination: route.destination,
      departure: route.departure,
      arrival: route.arrival,
      nextDay: route.nextDay,
      durationMin: route.durationMin,
      fare: route.fare,
      type: route.type
    });

    if (!writeBookings(bookings)) {
      checkbox.checked = false;
      setNotice("bookingMessage", "Your booking couldn't be saved. Browser storage may be full or blocked.", "warn");
      return;
    }

    let msg = "Booked " + route.origin + " to " + route.destination + " on " + route.date + " at " + route.departure + ". See it in My Bookings.";
    if (bookings.length === MAX_BOOKINGS) {
      msg += " You have now reached the limit of " + MAX_BOOKINGS + " bookings.";
    }
    setNotice("bookingMessage", msg, "ok");
  } else {
    if (index === -1) return;
    bookings.splice(index, 1);
    if (!writeBookings(bookings)) {
      checkbox.checked = true;
      setNotice("bookingMessage", "Your booking couldn't be removed. Browser storage may be blocked.", "warn");
      return;
    }
    setNotice("bookingMessage", "Booking removed.", "ok");
  }

  refreshBookingsUI();
}

function deleteBooking(id, date) {
  const bookings = readBookings();
  const key = bookingKey(id, date);
  const index = bookings.findIndex(function (b) { return bookingKey(b.id, b.date) === key; });
  if (index === -1) {
    refreshBookingsUI();
    return;
  }

  const removed = bookings.splice(index, 1)[0];
  if (!writeBookings(bookings)) {
    setNotice("bookingsMessage", "The booking couldn't be deleted. Browser storage may be blocked.", "warn");
    return;
  }

  setNotice("bookingsMessage", "Deleted booking: " + removed.origin + " to " + removed.destination + " on " + removed.date + ".", "ok");
  setNotice("bookingMessage", "", "ok");
  refreshBookingsUI();
}

function renderBookings() {
  const bookings = readBookings().sort(function (a, b) {
    return departureDate(a) - departureDate(b);
  });

  const summary = document.getElementById("bookingsSummary");
  const list = document.getElementById("bookingsList");
  const navCount = document.getElementById("navBookingCount");
  list.innerHTML = "";

  navCount.textContent = bookings.length;
  navCount.hidden = bookings.length === 0;

  if (bookings.length === 0) {
    summary.textContent = "No bookings yet.";
    return;
  }

  summary.textContent = `You have ${bookings.length} of ${MAX_BOOKINGS} bookings.`;

  bookings.forEach(function (b) {
    const card = document.createElement("article");
    card.className = "card";
    const icon = b.type === "Executive Plus" ? "location_prem.png" : "location.png";
    const route = escapeHTML(b.origin) + " to " + escapeHTML(b.destination);

    card.innerHTML = `
    <h3 class="card-route">
    <img src="img/${icon}" alt="Pin" class="card-icon" />
    ${escapeHTML(b.origin)} &rarr; ${escapeHTML(b.destination)}
    </h3>
    <p class="card-time">${escapeHTML(b.departure)} &rarr; ${escapeHTML(b.arrival)}${b.nextDay ? " (next day)" : ""}</p>
    <ul class="card-details">
      <li>Date: ${escapeHTML(b.date)}</li>
      <li>Duration: ${formatDuration(b.durationMin)}</li>
      <li>Fare: Rs. ${escapeHTML(b.fare)}</li>
      <li><span class="badge">${escapeHTML(b.type)}</span></li>
    </ul>
    <button type="button" class="btn-delete"
      data-id="${escapeHTML(b.id)}" data-date="${escapeHTML(b.date)}"
      aria-label="Delete booking: ${route} on ${escapeHTML(b.date)}">Delete booking</button>`;

    list.appendChild(card);
  });
}

// Keeps the result checkboxes in step with what is saved
function syncResultCheckboxes() {
  const booked = new Set(readBookings().map(function (b) { return bookingKey(b.id, b.date); }));
  document.querySelectorAll("#resultsList .book-check").forEach(function (checkbox) {
    if (checkbox.disabled) return;
    const isBooked = booked.has(bookingKey(checkbox.dataset.id, checkbox.dataset.date));
    checkbox.checked = isBooked;
    setBookLabel(checkbox, isBooked);
  });
}

function refreshBookingsUI() {
  renderBookings();
  syncResultCheckboxes();
}

function formatDuration(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

function fillDropdown(select, items, placeholderText) {
  select.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = placeholderText;
  select.appendChild(placeholder);

  items.forEach(function (name) {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
  });
}

function validate(origin, destination, fare) {
  if (!origin) {
    return { message: "Please choose where you are leaving from.", fieldId: "origin" };
  }
  if (!destination) {
    return { message: "Please choose your destination.", fieldId: "destination" };
  }
  if (origin === destination) {
    return { message: "Origin and destination can't be the same. Please pick a different city.", fieldId: "destination" };
  }
  if (fare !== "" && (isNaN(fare) || Number(fare) < 0)) {
    return { message: "Maximum fare must be 0 or more.", fieldId: "fare" };
  }
  return null; // null means no error
}

function runSearch() {
  const origin = document.getElementById("origin").value;
  const destination = document.getElementById("destination").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("departureTime").value;
  const fareInput = document.getElementById("fare").value.trim();
  const busType = document.getElementById("busType").value;
  const message = document.getElementById("formMessage");

  const error = validate(origin, destination, fareInput);
  if (error) {
    message.textContent = error.message;
    document.getElementById(error.fieldId).focus();
    return;
  }
  message.textContent = "";
  setNotice("bookingMessage", "", "ok");

  const maxFare = fareInput === "" ? null : Number(fareInput);

  currentResults = data.filter(function (route) {
    const matchOrigin = route.origin === origin;
    const matchDestination = route.destination === destination;
    const matchDate = date ? route.date === date : true;
    const matchTime = time ? route.departure >= time : true;
    const matchFare = maxFare !== null ? route.fare <= maxFare : true;
    const matchType = busType ? route.type === busType : true;
    return matchOrigin && matchDestination && matchDate && matchTime && matchFare && matchType;
  });

  hasSearched = true;
  renderResults(origin, destination);
}

function sortResults(list) {
  const sortBy = document.getElementById("sortBy").value;
  const sorted = [...list]; // copy, so the original order is untouched

  if (sortBy === "fare") {
    sorted.sort((a, b) => a.fare - b.fare);
  } else if (sortBy === "duration") {
    sorted.sort((a, b) => a.durationMin - b.durationMin);
  } else {
    sorted.sort((a, b) => a.departure.localeCompare(b.departure));
  }
  return sorted;
}

function renderResults(origin, destination) {
  // Hide the route map image when results appear
  const mapContainer = document.getElementById("mapContainer");
  if (mapContainer) {
    mapContainer.style.display = "none";
  }

  const summary = document.getElementById("resultsSummary");
  const list = document.getElementById("resultsList");
  list.innerHTML = "";

  if (currentResults.length === 0) {
    summary.textContent = "No buses found.";
    return;
  }

  const count = currentResults.length;
  summary.textContent = `${count} ${count === 1 ? "bus" : "buses"} found from ${origin} to ${destination}.`;

  // Which of these trips are already booked (checked once, not per card)
  const bookedKeys = new Set(readBookings().map(function (b) { return bookingKey(b.id, b.date); }));

  sortResults(currentResults).forEach(function (route) {
    const card = document.createElement("article");
    card.className = "card";
    let src_image = "location.png";

    if(route.type === "Executive Plus")
      src_image = "location_prem.png";

    const isBooked = bookedKeys.has(bookingKey(route.id, route.date));
    const departed = hasDeparted(route);
    const bookLabel = isBooked ? "Booked (untick to cancel)" : (departed ? "Already departed" : "Book this bus");
    
    card.innerHTML = `
    <h3 class="card-route">
    <img src="img/${src_image}" alt="Pin" class="card-icon" />
    ${route.origin} &rarr; ${route.destination}
    </h3>
    <p class="card-time">${route.departure} &rarr; ${route.arrival}${route.nextDay ? " (next day)" : ""}</p>
    <ul class="card-details">
      <li>Date: ${route.date}</li>
      <li>Duration: ${formatDuration(route.durationMin)}</li>
      <li>Fare: Rs. ${route.fare}</li>
      <li><span class="badge">${route.type}</span></li>
    </ul>
    <label class="book-option">
      <input type="checkbox" class="book-check" data-id="${route.id}" data-date="${route.date}"
        ${isBooked ? "checked" : ""} ${departed && !isBooked ? "disabled" : ""}>
      <span class="book-label">${bookLabel}</span>
    </label>`;

  list.appendChild(card);
  });
}

function resetPage() {
  hasSearched = false;
  currentResults = [];

  document.getElementById("formMessage").textContent = "";
  setNotice("bookingMessage", "", "ok");
  document.getElementById("resultsSummary").textContent = "Choose a trip above to see buses.";
  document.getElementById("resultsList").innerHTML = "";
  document.getElementById("tableFilter").value = "";
  document.getElementById("sortBy").value = "departure";

  // Re-display the route map image when page is reset
  const mapContainer = document.getElementById("mapContainer");
  if (mapContainer) {
    mapContainer.style.display = "block";
  }

  renderTimetableTable(data);
}

function renderTimetableTable(routes) {
  const tbody = document.getElementById("timetableBody");
  tbody.innerHTML = "";

  if (routes.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = "<td colspan='7'>No records match your filter.</td>";
    tbody.appendChild(tr);
    return;
  }

  routes.forEach(function (route) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${route.origin}</td>
      <td>${route.destination}</td>
      <td>${route.date}</td>
      <td>${route.departure}</td>
      <td>${route.arrival}${route.nextDay ? " (next day)" : ""}</td>
      <td>Rs. ${route.fare}</td>
      <td>${route.type}</td>`;
    tbody.appendChild(tr);
  });
}

function init() {
  // Dropdowns: destination now uses item.destination (fix #1)
  const origins = [...new Set(data.map(item => item.origin))].sort();
  const destinations = [...new Set(data.map(item => item.destination))].sort();
  fillDropdown(document.getElementById("origin"), origins, "Select origin");
  fillDropdown(document.getElementById("destination"), destinations, "Select destination");

  // Date range uses the same local-date helper as the data (fix #5)
  const dateInput = document.getElementById("date");
  dateInput.min = getDynamicDate(0);
  dateInput.max = getDynamicDate(7);

  // Timetable table loads immediately (fix #2)
  renderTimetableTable(data);

  // Form events (fix #8)
  const form = document.getElementById("planForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    runSearch();
  });
  form.addEventListener("reset", resetPage);

  // Additional listener on reset button to guarantee resetPage executes smoothly
  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      setTimeout(resetPage, 10);
    });
  }

  // Live interactions: only react after a first successful search
  document.getElementById("sortBy").addEventListener("change", function () {
    if (hasSearched) runSearch();
  });
  document.getElementById("fare").addEventListener("change", function () {
    if (hasSearched) runSearch();
  });
  document.getElementById("busType").addEventListener("change", function () {
    if (hasSearched) runSearch();
  });

  // Table filter, attached once (fix #2)
  document.getElementById("tableFilter").addEventListener("input", function (event) {
    const query = event.target.value.toLowerCase().trim();
    const filtered = data.filter(function (route) {
      return route.origin.toLowerCase().includes(query) ||
             route.destination.toLowerCase().includes(query);
    });
    renderTimetableTable(filtered);
  });

  // Bookings: one listener each, using event delegation because the cards are rebuilt often
  document.getElementById("resultsList").addEventListener("change", function (event) {
    if (event.target.classList.contains("book-check")) {
      handleBookingChange(event.target);
    }
  });
  document.getElementById("bookingsList").addEventListener("click", function (event) {
    const button = event.target.closest(".btn-delete");
    if (button) deleteBooking(button.dataset.id, button.dataset.date);
  });

  // Show saved bookings on load (this also removes any that have already departed)
  refreshBookingsUI();

  // If the tab was left open for hours, clear out departed bookings when the person returns
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) refreshBookingsUI();
  });
}

document.addEventListener("DOMContentLoaded", init);