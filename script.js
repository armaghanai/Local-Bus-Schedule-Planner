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
  { "id": "FM-01", "date": getDynamicDate(0), "origin": "Rawalpindi", "destination": "Peshawar",   "departure": "05:00", "durationMin": 120, "arrival": "07:00", "nextDay": false, "fare": 900,  "type": "Standard" },
  { "id": "FM-02", "date": getDynamicDate(0), "origin": "Rawalpindi", "destination": "Bahawalpur", "departure": "10:00", "durationMin": 450, "arrival": "17:30", "nextDay": false, "fare": 3200, "type": "Executive" },
  { "id": "FM-03", "date": getDynamicDate(1), "origin": "Lahore",     "destination": "Faisalabad", "departure": "07:00", "durationMin": 135, "arrival": "09:15", "nextDay": false, "fare": 1030, "type": "Standard" },
  { "id": "FM-04", "date": getDynamicDate(1), "origin": "Peshawar",   "destination": "Lahore",     "departure": "20:30", "durationMin": 480, "arrival": "04:30", "nextDay": true,  "fare": 3000, "type": "Executive" },
  { "id": "FM-05", "date": getDynamicDate(2), "origin": "Murree",     "destination": "Lahore",     "departure": "23:45", "durationMin": 360, "arrival": "05:45", "nextDay": true,  "fare": 2500, "type": "Executive Plus" },
  { "id": "FM-06", "date": getDynamicDate(2), "origin": "Sahiwal",    "destination": "Lahore",     "departure": "07:00", "durationMin": 150, "arrival": "09:30", "nextDay": false, "fare": 900,  "type": "Standard" },
  { "id": "FM-07", "date": getDynamicDate(3), "origin": "Lahore",     "destination": "Karachi",    "departure": "00:00", "durationMin": 960, "arrival": "16:00", "nextDay": false, "fare": 6450, "type": "Executive Plus" },
  { "id": "FM-08", "date": getDynamicDate(3), "origin": "Karachi",    "destination": "Rawalpindi", "departure": "09:00", "durationMin": 1260, "arrival": "06:00", "nextDay": true, "fare": 6600, "type": "Executive" },
  { "id": "FM-09", "date": getDynamicDate(5), "origin": "Rawalpindi", "destination": "Lahore",     "departure": "08:00", "durationMin": 270, "arrival": "12:30", "nextDay": false, "fare": 1800, "type": "Executive" },
  { "id": "FM-10", "date": getDynamicDate(4), "origin": "Rawalpindi", "destination": "Multan",     "departure": "22:00", "durationMin": 480, "arrival": "06:00", "nextDay": true,  "fare": 2620, "type": "Executive" }
];

document.addEventListener("DOMContentLoaded", function()
{
    const selectOrigin = document.getElementById("origin");
    const selectDestination = document.getElementById("destination");

    const uniqueOrigins = [... new Set(data.map(item => item.origin))];
    const uniqueDestinations = [... new Set(data.map(item => item.origin))];

    uniqueOrigins.forEach(function(originName){
        const option = document.createElement("option")

        option.value = originName;
        option.textContent = originName;

        selectOrigin.appendChild(option);
    });

    uniqueDestinations.forEach(function(destinationName){
        const option = document.createElement("option")

        option.value = destinationName;
        option.textContent = destinationName;

        selectDestination.appendChild(option);
    });

});

document.addEventListener("DOMContentLoaded",function(){
    const date = document.getElementById("date");

    const today = new Date();
    date.min = today.toISOString().split("T")[0];

    today.setDate(today.getDate()+7);
    date.max = today.toISOString().split("T")[0];
});