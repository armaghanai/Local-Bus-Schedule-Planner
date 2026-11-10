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
  { "id": "FM-01", "date": getDynamicDate(0), "origin": "Rawalpindi", "destination": "Peshawar", "departure": "05:00", "durationMin": 120, "arrival": "07:00", "nextDay": false, "fare": 900,  "type": "Standard" },
  { "id": "FM-02", "date": getDynamicDate(0), "origin": "Rawalpindi", "destination": "Peshawar", "departure": "09:30", "durationMin": 120, "arrival": "11:30", "nextDay": false, "fare": 1200, "type": "Executive" },
  { "id": "FM-03", "date": getDynamicDate(0), "origin": "Rawalpindi", "destination": "Peshawar", "departure": "14:00", "durationMin": 115, "arrival": "15:55", "nextDay": false, "fare": 1500, "type": "Executive Plus" },
  { "id": "FM-04", "date": getDynamicDate(0), "origin": "Rawalpindi", "destination": "Peshawar", "departure": "18:30", "durationMin": 120, "arrival": "20:30", "nextDay": false, "fare": 950,  "type": "Standard" },
  { "id": "FM-05", "date": getDynamicDate(1), "origin": "Lahore", "destination": "Karachi", "departure": "08:00", "durationMin": 960, "arrival": "00:00", "nextDay": true,  "fare": 5800, "type": "Standard" },
  { "id": "FM-06", "date": getDynamicDate(1), "origin": "Lahore", "destination": "Karachi", "departure": "12:00", "durationMin": 900, "arrival": "03:00", "nextDay": true,  "fare": 6450, "type": "Executive" },
  { "id": "FM-07", "date": getDynamicDate(1), "origin": "Lahore", "destination": "Karachi", "departure": "16:30", "durationMin": 870, "arrival": "07:00", "nextDay": true,  "fare": 7200, "type": "Executive Plus" },
  { "id": "FM-08", "date": getDynamicDate(1), "origin": "Lahore", "destination": "Karachi", "departure": "21:00", "durationMin": 900, "arrival": "12:00", "nextDay": true,  "fare": 6200, "type": "Executive" },
  { "id": "FM-09", "date": getDynamicDate(0), "origin": "Rawalpindi", "destination": "Lahore", "departure": "07:00", "durationMin": 270, "arrival": "11:30", "nextDay": false, "fare": 1750, "type": "Standard" },
  { "id": "FM-10", "date": getDynamicDate(0), "origin": "Rawalpindi", "destination": "Lahore", "departure": "11:00", "durationMin": 260, "arrival": "15:20", "nextDay": false, "fare": 2100, "type": "Executive" },
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
  const summary = document.getElementById("resultsSummary");
  const list = document.getElementById("resultsList");
  list.innerHTML = "";

  if (currentResults.length === 0) {
    summary.textContent = "No buses found.";
    list.innerHTML = "<p class='empty-message'>No buses match your search. Try a different date, a later time, a higher fare limit or another bus type.</p>";
    return;
  }

  const count = currentResults.length;
  summary.textContent = `${count} ${count === 1 ? "bus" : "buses"} found from ${origin} to ${destination}.`;

  sortResults(currentResults).forEach(function (route) {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
    <h3 class="card-route">
    <img src="img/location.png" alt="Pin" class="card-icon" />
    ${route.origin} &rarr; ${route.destination}
    </h3>
    <p class="card-time">${route.departure} &rarr; ${route.arrival}${route.nextDay ? " (next day)" : ""}</p>
    <ul class="card-details">
      <li>Date: ${route.date}</li>
      <li>Duration: ${formatDuration(route.durationMin)}</li>
      <li>Fare: Rs. ${route.fare}</li>
      <li><span class="badge">${route.type}</span></li>
    </ul>`;

  list.appendChild(card);
  });
}

function resetPage() {
  hasSearched = false;
  currentResults = [];

  document.getElementById("formMessage").textContent = "";
  document.getElementById("resultsSummary").textContent = "Choose a trip above to see buses.";
  document.getElementById("resultsList").innerHTML = "";
  document.getElementById("tableFilter").value = "";
  document.getElementById("sortBy").value = "departure";

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
}

document.addEventListener("DOMContentLoaded", init);
