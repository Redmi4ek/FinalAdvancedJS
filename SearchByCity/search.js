const apiKey = '04f562fba0dc54cb85a3583b1a929353';

const cityInput = document.getElementById('cityInput');
const searchButton = document.querySelector('button'); 

// Add an event listener to the input field for the "keypress" event
cityInput.addEventListener('keypress', function(event) {
  // Check if the pressed key is the Enter key (key code 13)
  if (event.key === 'Enter') {
    // Prevent the default behavior of the Enter key (form submission)
    event.preventDefault();
    // Trigger the search if the input is not empty
    if (cityInput.value.trim() !== '') { // Trim to remove leading/trailing spaces
      getWeather();
    }
  }
});
searchButton.addEventListener('click', getWeather);

async function getWeather() {
  const cityInput = document.getElementById('cityInput').value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === 200) {
      displayWeather(data);
    } else {
      document.getElementById('weatherInfo').innerHTML = "City not found.";
    }
  } catch (error) {
    console.error("Error fetching weather:", error); 
    document.getElementById('weatherInfo').innerHTML = "An error occurred.";
  }
}

function displayWeather(data) {
  const weatherInfo = document.getElementById('weatherInfo');
  weatherInfo.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>Temperature: ${data.main.temp} °C</p>
    <p>Description: ${data.weather[0].description}</p>
  `; 
}

