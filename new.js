const API_key = "0dc263d559475c9944e0e7673975ff10";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInputs = document.querySelectorAll("input[type='text']");
const buttons = document.querySelectorAll("button");
const weatherIcon = document.querySelector(".left .weather .weather-icon");

document.querySelectorAll(".searchbox").forEach((form) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        performSearch();
    });
});

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        performSearch();
        document.getElementById("whole").style.display="block";
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        performSearch();
    }
    document.getElementById("whole").style.display="block";
});

function performSearch() {
    let city = "";
    searchInputs.forEach((input) => {
        if (input.value.trim()) {
            city = input.value.trim();
        }
    });

    if (city) {
        check_weather(city);
        document.querySelector(".whole").scrollIntoView({ behavior: "smooth" });
    } else {
        alert("Please enter a city name!");
    }
}

async function check_weather(city) {
    try {
        const response = await fetch(API_URL + city + `&appid=${API_key}`);
        const data = await response.json();

        if (data.cod !== 200) {
            alert("City not found! Please enter a valid city.");
            return;
        }

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "cloudy.png";
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "clear.png";
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "rain.png";
        }
        else if(data.weather[0].main == "Drizzle"){ 
            weatherIcon.src = "drizzle.png";
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "mist.png";
        }
        else if(data.weather[0].main == "Haze"){
            weatherIcon.src = "haze.png";
        }
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "snow.png";
        }

        document.querySelector(".left .weather .temp").textContent = data.main.temp + "°C";
        document.querySelector(".left .weather .weather-type").textContent = data.weather[0].main;
        document.querySelector(".left .date-time .date").textContent = new Date().toDateString();
        document.querySelector(".left .place p").textContent = data.name;

        document.querySelector(".right .container .wind-speed").textContent = data.wind.speed + " Km/h";
        document.querySelector(".right .container .humidity").textContent = data.main.humidity + "%";
        document.querySelector(".right .container .feel-like").textContent = data.main.feels_like + "°C";
        document.querySelector(".right .container .pressure").textContent = data.main.pressure + " mb";
        
        document.querySelector(".right .container .max").textContent = "🔺 " + data.main.temp_max + "°C";
        document.querySelector(".right .container .min").textContent = "🔻" + data.main.temp_min + "°C";
        document.querySelector(".right .container .lat").textContent = "Lat: "+data.coord.lat + "°";
        document.querySelector(".right .container .long").textContent = "Lon:"+data.coord.lon + "°";
        
        document.querySelector(".right .container .sunrise").textContent ="rise " + new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        document.querySelector(".right .container .sunset").textContent ="Set: " + new Date(data.sys.sunset * 1000).toLocaleTimeString();
        
        document.querySelector(".right .container .visibility").textContent = data.visibility + " m";
        document.querySelector(".right .container .description").textContent = data.weather[0].description;


        console.log(data);

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

