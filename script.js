
/*
function getWeather() {
    let city = document.getElementById("cityInput").value;
    const API_KEY = "350e4384adf78c2ad64e4d24ea80ebdc";
    // ---- Current Weather API ----
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.cod != 200) {
                alert("City not found!");
                return;
            }

            document.getElementById("cityName").innerText = data.name;
            document.getElementById("temp").innerText = "Temperature: " + data.main.temp + "°C";
            document.getElementById("humidity").innerText = "Humidity: " + data.main.humidity + "%";
            document.getElementById("condition").innerText = "Condition: " + data.weather[0].description;
        });

    // ---- 5 Day Forecast API ----
    let url_forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url_forecast)
        .then(res => res.json())
        .then(data => {
            let box = document.getElementById("forecastBox");
            box.innerHTML = "";

            for (let i = 0; i < data.list.length; i += 8) {
                let day = data.list[i];

                let card = `
                    <div class="card">
                        <h4>${day.dt_txt.split(" ")[0]}</h4>
                        <p>Temp: ${day.main.temp}°C</p>
                        <p>Humidity: ${day.main.humidity}%</p>
                        <p>${day.weather[0].main}</p>
                    </div>
                `;
                box.innerHTML += card;
            }
        });
}
*/

let chart; // global variable

function getWeather() {
    let city = document.getElementById("cityInput").value.trim();
    const API_KEY = "350e4384adf78c2ad64e4d24ea80ebdc";

    // ---- Current Weather ----
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(data => {
            if (data.cod != 200) {
                alert("City not found");
                return;
            }

            document.getElementById("cityName").innerText = data.name;
            document.getElementById("temp").innerText = "Temperature: " + data.main.temp + "°C";
            document.getElementById("humidity").innerText = "Humidity: " + data.main.humidity + "%";
            document.getElementById("condition").innerText = "Condition: " + data.weather[0].description;
        });

    // ---- Forecast for Graph ----
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(data => {

            let labels = [];
            let temps = [];

            for (let i = 0; i < data.list.length; i += 8) {
                labels.push(data.list[i].dt_txt.split(" ")[0]);
                temps.push(data.list[i].main.temp);
            }

            drawChart(labels, temps);
        });
}

function drawChart(labels, temps) {

    const ctx = document.getElementById("tempChart").getContext("2d");

    if (chart) {
        chart.destroy(); // remove old graph
    }

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Temperature (°C)",
                data: temps,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}
