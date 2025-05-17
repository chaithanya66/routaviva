import { homepage_url } from "../../../constants/constants.js";

let user_id_export = localStorage.getItem("user_id");
console.log("user Id: ", user_id_export);

document.querySelector(".mapdisra").style.display = "none";

let width = window.screen.availWidth;
if (width <= 550) {
    let elements = document.getElementsByClassName("sct9");
    if (elements.length > 0) {
        if (elements && elements[0]) {
            elements[0].style.transform = "translate(0px,0px)";
        }
    }
}
if (width <= 1100) {
    let elements = document.getElementsByClassName("sct9");
    if (elements.length > 0) {
        elements[0].style.transform = "translate(0px,0px)";
    }
}
let selectedTripId = null;
let selectedPlaceName = null;
let tripData = [];

let piechart;

export async function tripstoinsert(user_id_export) {
    try {
        const response = await fetch(homepage_url, {
            headers: {
                'uid': user_id_export
            }
        });

        if (!response.ok) {
            throw new Error(`Fetching error: ${response.status}`);
        }

        const res = await response.json();
        tripData = res.data.trips;

        // const reversedTrips = [...tripData].reverse(); // Reverse to show bottom-to-top
        const reversedTrips = tripData;
        displayplaces(reversedTrips, user_id_export);

        console.log("insert trips: ", tripData);

    } catch (error) {
        console.error(error);
    }
}

function displayplaces(trips, user_id_export) {
    const placesSelect = document.getElementById("select-places");
    placesSelect.innerHTML = "";

    trips.forEach(trip => {
        const option = document.createElement("option");
        option.value = trip.name;
        option.textContent = trip.name;
        option.dataset.tripid = trip.tripId;
        placesSelect.appendChild(option);
    });

    // Event listener (outside so it can be reused)
    placesSelect.addEventListener("change", function () {
        const selectedOption = placesSelect.options[placesSelect.selectedIndex];
        selectedTripId = selectedOption.dataset.tripid;
        selectedPlaceName = selectedOption.value;

        console.log("Selected tripId:", selectedTripId);
        console.log("Selected place name:", selectedPlaceName);

        // fetching trip details
        async function fetchtripid() {
            try {
                const response = await fetch(`https://rutavivaunsecured-1.onrender.com/trip?tripId=${selectedTripId}`, {
                    headers: {
                        'uid': user_id_export,
                        'Content-Type': 'application/json',
                        'X-API-Key': '',
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("idhe", data);
                console.log("Budget value:", data.data.budget);
                console.log("total arr", data.data.budget[0])


                let totalbudgarr = 0;
                let spentbudgarr = 0;

                data.data.budget.forEach(item => {
                    const tag = item.tag?.trim().toLowerCase();
                    if (tag === 'total') totalbudgarr = Number(item.maxBudget);
                    if (tag === 'spent') spentbudgarr = Number(item.maxBudget);
                });

                if (piechart && typeof piechart.destroy === 'function') {
                    piechart.destroy();
                }
                const ctx = document.getElementById('piechart').getContext('2d');
                piechart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Budget', 'Spent'],
                        datasets: [{
                            label: 'Trip budget',
                            data: [totalbudgarr, spentbudgarr],
                            backgroundColor: ['rgb(8, 95, 87)', 'rgba(255, 206, 86, 1)'],
                            borderColor: ['rgb(8, 95, 87)', 'rgba(255, 206, 86, 1)'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'left',
                                labels: {
                                    usePointStyle: true,
                                    pointStyle: 'circle',
                                    boxWidth: 5,
                                    boxHeight: 5,
                                    padding: 8
                                }
                            },
                            datalabels: {
                                color: '#rgba(8,95,87)',
                                formatter: (value, ctx) => {
                                    const dataArr = ctx.chart.data.datasets[0].data;
                                    const total = dataArr.reduce((acc, val) => acc + val, 0);
                                    return `${((value / total) * 100).toFixed(0)}%`;
                                }
                            }
                        }
                    },
                    plugins: [ChartDataLabels]
                });


                if (data.data.expenses.length >= 4) {
                    // document.querySelector(".main3").style.display = "none";
                    console.log("okkk", data.data.expenses);

                    const container = document.getElementById("disp-exp-val");
                    container.innerHTML = "";

                    data.data.expenses.forEach(exp => {
                        const entry = document.createElement('div');
                        entry.className = "expense-entry";

                        const nameDiv = document.createElement('div');
                        nameDiv.textContent = `${exp.tag}:`;

                        const valueDiv = document.createElement('div');
                        valueDiv.textContent = `₹${exp.value}`;

                        entry.appendChild(nameDiv);
                        entry.appendChild(valueDiv);

                        container.appendChild(entry);
                    });
                }

                else {
                    document.querySelector(".expenses-container").style.display = "none";
                    document.querySelector(".main3").style.display = "block";
                }

                if (data.data.budget.length >= 4) {
                    document.querySelector(".tripbudget").style.display = "none";
                    document.getElementById("piechartdis").style.display = "block";
                }
                else {
                    document.getElementById("piechartdis").style.display = "none";
                    document.querySelector(".tripbudget").style.display = "block";
                    // document.getElementsByClassName("display-budget").style.display = "block";

                }

                // To display remaining days inn the trip

                const startdate = data.data.fromDate.slice(0, 10);
                const enddate = data.data.toDate.slice(0, 10);
                console.log("start Date: ", startdate);
                console.log("End Date: ", enddate);

                const today = new Date();
                const startdate1 = new Date(startdate)
                const either = startdate1 - today;
                const displayeither = Math.ceil(either / (1000 * 60 * 60 * 24));

                function remainingdays(end, start) {
                    const todate = new Date(end);
                    let fromdate;
                    if (displayeither >= 0) {
                        fromdate = new Date(start);
                    }
                    else {
                        fromdate = new Date();
                    }
                    const daysremain = todate - fromdate;
                    const remaining = Math.ceil(daysremain / (1000 * 60 * 60 * 24));
                    if (isNaN(remaining)) {
                        document.getElementById("days-left").textContent = "ended";
                    }
                    else if (remaining < 0) {
                        // document.getElementById("days-left").textContent="ended";
                        document.getElementById("days-left").textContent = 0;
                    }
                    else {
                        document.getElementById("days-left").textContent = remaining;
                    }
                    console.log(remaining);

                }
                remainingdays(enddate, startdate);


                let fromdestination = data.data.fromDestination;
                let todestination = data.data.toDestination;
                console.log(fromdestination);
                console.log(todestination);

                // fetching route
                // Declare map variable globally
                let currentRouteLayer; // Store the route layer (polyline)
                let currentMarkers = []; // Store marker references

                function initializeMap() {
                    const container = L.DomUtil.get('map');

                    // Remove old map instance if it exists
                    if (container != null && container._leaflet_id != null) {
                        container._leaflet_id = null; // This forcibly clears Leaflet's internal reference
                    }

                    console.log("Initializing map...");

                    const map = L.map('map', {
                        center: [28.18369, 76.8197],
                        zoom: 14
                    });

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    return map;
                }


                // Function to fetch route and update the map
                async function fetchroute() {
                    try {
                        // Fetch route data
                        const response1 = await fetch('https://rutavivaunsecured-1.onrender.com/maps/fetchDirections', {
                            method: 'POST',
                            headers: {
                                'uid': user_id_export,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                "fromId": fromdestination,
                                "toId": todestination
                            })
                        });

                        const data1 = await response1.json();
                        console.log("resp: ", data1);

                        const polylineEncoded = data1.data.routes[0].overview_polyline;
                        console.log("fetching route: ", polylineEncoded);

                        // Initialize map if it's not already initialized
                        var mapWidget = initializeMap();

                        const apiKey = "N9AYMS4e2yoMzwjZ7c0CXg52EdpE6zqUVWo0kwfe"; // Replace with your API key
                        const requestId = "XXX"; // Replace with a UUID or unique request ID

                        const from = document.getElementById('from').value;
                        const to = document.getElementById('to').value;

                        const [fromLat, fromLng] = from.split(',').map(Number);
                        const [toLat, toLng] = to.split(',').map(Number);

                        const url = `https://api.olamaps.io/routing/v1/directions?origin=${fromLat},${fromLng}&destination=${toLat},${toLng}&api_key=${apiKey}`;

                        const response = await fetch(url, {
                            method: 'POST',
                            headers: {
                                'X-Request-Id': requestId
                            }
                        });

                        const data = await response.json();

                        if (data.status === "SUCCESS") {
                            const latlngs = polyline.decode(polylineEncoded).map(([lat, lng]) => [lat, lng]);

                            // Remove the previous route polyline and markers
                            if (currentRouteLayer) {
                                mapWidget.removeLayer(currentRouteLayer); // Remove the old route
                            }
                            currentMarkers.forEach(marker => mapWidget.removeLayer(marker)); // Remove previous markers
                            currentMarkers = []; // Clear the markers array

                            // Add the new route polyline
                            currentRouteLayer = L.polyline(latlngs, { color: 'blue' }).addTo(mapWidget);

                            // Fit map to route
                            mapWidget.fitBounds(currentRouteLayer.getBounds());

                            // Add only the destination marker
                            const destinationMarker = L.marker([toLat, toLng]).addTo(mapWidget).bindPopup("Destination");

                            // Store only the destination marker
                            currentMarkers = [destinationMarker];


                            console.log("Map refreshed with new route.");
                        } else {
                            alert("Failed to fetch directions");
                        }
                    } catch (error) {
                        console.error("Error fetching route:", error);
                    }
                }

                fetchroute();

            } catch (error) {
                console.log(error);
            }
        }
        fetchtripid();


        // BUDGET
        const addbudget = document.getElementById("add-budg");
        function clickit() {
            addbudget.addEventListener('click', function () {
                addbudget.style.display = "none";
                document.querySelector(".display-budget").style.display = "block";
            });
        }
        clickit();

        let totalbgt = document.getElementById("total-bdg-val");
        let activitybgt = document.getElementById("activity-bdg-val");
        let staybgt = document.getElementById("stay-bdg-val");
        let foodbgt = document.getElementById("food-bdg-val");

        // let totalstore = 0;
        // let activitystore = 0;
        // let staystore = 0;
        // let foodstore = 0;

        // totalbgt.oninput = function () {
        //     totalstore = this.value;
        //     totaldis.textContent = totalstore;
        //     logval();
        // }
        // activitybgt.oninput = function () {
        //     activitystore = this.value;
        //     activitydis.textContent = activitystore;
        //     logval();
        // }
        // staybgt.oninput = function () {
        //     staystore = this.value;
        //     staydis.textContent = staystore;
        //     logval();
        // }
        // foodbgt.oninput = function () {
        //     foodstore = this.value;
        //     fooddis.textContent = foodstore;
        //     logval();
        // }

        // function logval() {
        //     console.log(totalstore);
        //     console.log(activitystore);
        //     console.log(staystore);
        //     console.log(foodstore);
        // }
        const createbudge = document.getElementById("create-bdg");
        createbudge.addEventListener('click', function () {
            // console.log("clicked");
            // console.log(totalstore);
            // console.log(activitystore);
            // console.log(staystore);
            // console.log(foodstore);

            async function fetchbudget() {
                try {
                    const response = await fetch('https://rutavivaunsecured-1.onrender.com/trip/addBudget', {
                        method: "POST",
                        headers: {
                            'uid': user_id_export,
                            'tripId': selectedTripId,
                            'Content-Type': 'application/json',
                            'X-API-Key': ''
                        },
                        body: JSON.stringify([
                            { "tag": "Total", "maxBudget": totalbgt.value },
                            { "tag": "Activity", "maxBudget": activitybgt.value },
                            { "tag": "Stay", "maxBudget": staybgt.value },
                            { "tag": "food", "maxBudget": foodbgt.value }
                        ])
                    });
                    const data = await response.json();
                    console.log(data);

                    if (data.code === 200) {
                        document.querySelector(".chart").style.display = "block";
                        document.querySelector(".display-budget").style.display = "none";

                    }

                } catch (error) {
                    console.error("Fetch error:", error);
                }

            }
            fetchbudget();
        });

        // EXPENSES
        const exppopup = document.getElementById("expenses-popup");
        const addexp = document.getElementById("addexpnew");
        const expdisp = document.getElementById("addexpenses");
        const onlyselectfield = document.querySelector(".exp-content");
        const selecttag = document.getElementById("exp-select");


        let currentInputTag = null;
        let currentExpenseName = "";

        const expenseValues = {
            Food: null,
            Stay: null,
            Activities: null,
            Petrol: null
        };

        selecttag.addEventListener('change', function () {
            const existingInputs = onlyselectfield.querySelectorAll('input');
            existingInputs.forEach(input => input.remove());

            const expselectedoption = selecttag.options[selecttag.selectedIndex].text;
            currentExpenseName = expselectedoption;

            currentInputTag = document.createElement('input');
            currentInputTag.type = "number";
            currentInputTag.className = "exp-cost";
            currentInputTag.placeholder = "Enter the Expense";
            onlyselectfield.appendChild(currentInputTag);
        });



        addexp.addEventListener('click', function () {
            addexp.style.display = "none";
            exppopup.style.display = "block";
        });



        let expenseCount = 0;
        const expapi = document.getElementById("addexpapi");

        expdisp.addEventListener('click', function () {
            if (currentInputTag && currentInputTag.value.trim() !== "") {
                const enteredValue = currentInputTag.value.trim();

                if (expenseValues[currentExpenseName] !== null) {
                    alert(`${currentExpenseName} expense has already been entered.`);
                    return;
                }

                // store the value
                expenseValues[currentExpenseName] = enteredValue;

                // Main container div styling and creating
                const textdiv = document.createElement('div');
                textdiv.className = "maindivstore";
                textdiv.style.display = "flex";
                textdiv.style.justifyContent = "space-between";
                textdiv.style.marginLeft = "30px";
                textdiv.style.marginRight = "30px";
                textdiv.style.fontSize = "14px";
                textdiv.style.padding = "5px 0";

                // Expense name div
                const expensediv = document.createElement('div');
                expensediv.className = "expensediv";
                expensediv.textContent = currentExpenseName;


                async function expapipostone() {
                    try {
                        const response = await fetch('https://rutavivaunsecured-1.onrender.com/trip/addExpense', {
                            method: 'POST',
                            headers: {
                                'uid': user_id_export,
                                'tripId': selectedTripId,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify([
                                {
                                    "tag": currentExpenseName,
                                    "value": enteredValue

                                }
                            ])
                        });
                        const data = await response.json();
                        console.log(data);
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
                expapipostone();

                // Amount div
                const amountdiv = document.createElement('div');
                amountdiv.className = "amountdiv";
                amountdiv.textContent = `₹${enteredValue}`;

                // Append both to main div
                textdiv.appendChild(expensediv);
                textdiv.appendChild(amountdiv);

                // Append to display area
                const appendingmain = document.querySelector(".main3");
                appendingmain.appendChild(textdiv);

                console.log("Expense:", currentExpenseName, "Amount:", enteredValue);
                console.log("Current stored values:", expenseValues);

                currentInputTag.style.display = "none";
                currentInputTag = null;
                currentExpenseName = "";


                // checking four inputs are selected
                expenseCount++;
                if (expenseCount === 4) {
                    exppopup.style.display = "none";
                    expapi.style.display = "flex";

                    const postData = [
                        { tag: "food", value: expenseValues.Food },
                        { tag: "stay", value: expenseValues.Stay },
                        { tag: "activities", value: expenseValues.Activities },
                        { tag: "petrol", value: expenseValues.Petrol }
                    ];

                    // Api 

                }

            }
        });

        document.getElementById("heading").textContent = `Welcome To Your ${selectedPlaceName} Adventure!`;

        // fetching weather details 
        function weather() {
            const apikey = "28343841533e0bfe6709a4d3df077a6a";
            const cityweather = selectedPlaceName;
            const displaytemp = document.getElementsByClassName("tempvalue");
            document.getElementById("citynamehtml").innerHTML = cityweather;
            const displayweatherval = document.getElementsByClassName("weatherval");
            const currenttime = Math.floor(Date.now() / 1000);

            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityweather}&appid=${apikey}`)
                .then(response => response.json())
                .then(data => {
                    const temperature = data.main.temp;
                    if (displaytemp.length > 0) {
                        const celsius = temperature - 273.15;
                        displaytemp[0].innerHTML = `${Math.round(celsius)}°C`;
                    }

                    const weatherid = data.weather[0].id;
                    const sunrise = data.sys.sunrise;
                    const sunset = data.sys.sunset;

                    if (weatherid >= 200 && weatherid < 300 && displayweatherval.length > 0) {
                        displayweatherval[0].innerHTML = "Thunders";
                    } else if (weatherid >= 300 && weatherid < 400 && displayweatherval.length > 0) {
                        displayweatherval[0].innerHTML = "Rainy";
                    } else if (weatherid >= 500 && weatherid < 600 && displayweatherval.length > 0) {
                        displayweatherval[0].innerHTML = "Rain possible";
                    } else if (weatherid >= 600 && weatherid < 700 && displayweatherval.length > 0) {
                        displayweatherval[0].innerHTML = "Snow";
                    } else if (weatherid >= 700 && weatherid < 800 && displayweatherval.length > 0) {
                        displayweatherval[0].innerHTML = "Winds";
                    } else if (weatherid > 800 && displayweatherval.length > 0) {
                        displayweatherval[0].innerHTML = (currenttime >= sunrise && currenttime < sunset) ? "Sunny" : "Clear Night";
                    }
                    else {
                        displayweatherval[0].innerHTML = "Clear or cloudy";
                    }

                })
                .catch(error => console.error("error while searching", error));
        }
        weather();


    });

    if (placesSelect.options.length > 0) {
        placesSelect.selectedIndex = 0;
        const event = new Event('change');
        placesSelect.dispatchEvent(event);
    }


}
tripstoinsert(user_id_export);






const fuelpopupdis = document.getElementById("fueladd");
fuelpopupdis.addEventListener('click', function () {
    document.querySelector(".dashboardtemp").style.display = "none";
    document.querySelector(".popup-2").style.display = "block";
});
const fuelpopupclose = document.getElementById("toggleit1");
fuelpopupclose.addEventListener('click', function () {
    document.querySelector(".dashboardtemp").style.display = "grid";
    document.querySelector(".popup-2").style.display = "none";
});