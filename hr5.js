// script.js

// OpenWeatherMap API Key
const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

// Function to fetch weather data based on city name
function getWeather() {
  const city = document.getElementById('city').value;
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        alert("City not found. Please try again.");
      } else {
        displayWeather(data);
      }
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch weather data.");
    });
}

// Function to display the fetched weather data
function displayWeather(data) {
  const cityName = document.getElementById('city-name');
  const description = document.getElementById('description');
  const temperature = document.getElementById('temperature');
  const humidity = document.getElementById('humidity');
  const wind = document.getElementById('wind');

  cityName.textContent = `${data.name}, ${data.sys.country}`;
  description.textContent = `Weather: ${data.weather[0].description}`;
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  wind.textContent = `Wind: ${data.wind.speed} km/h`;
}

// Function to get weather based on the user's location
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          displayWeather(data);
        })
        .catch(error => {
          console.error("Error fetching weather data:", error);
          alert("Failed to fetch weather data.");
        });
    }, error => {
      alert("Geolocation is not supported or permission denied.");
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}
