const api = '04f562fba0dc54cb85a3583b1a929353';
const tableBody = document.querySelector('tbody');
// const nav = document.querySelector('nav');
const body = document.querySelector('body');
let isMouseInsideWindow = true;
const updateInterval = 60 * 60 * 1000; // milliseconds
let isFetching = false; // Flag to avoid multiple fetches


// Функция для получения данных о погоде по геолокации
function getWeatherData(latitude, longitude) {
    const base = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${api}&units=metric`;
    document.getElementById('loading-indicator').classList.remove('hidden');
    animateLoadingIndicator();

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', base);
        xhr.responseType = 'json';

        xhr.onload = () => {
            if (xhr.status === 200) {
                const data = xhr.response;
                const forecasts = data.list.slice(0, 10); // Get weather data for the next 10 days

                forecasts.forEach(forecast => {
                    const date = new Date(forecast.dt * 1000).toLocaleDateString();
                    const description = forecast.weather[0].description;
                    const temperature = forecast.main.temp.toFixed(1);

                    const row = `<tr>
                        <td>${date}</td>
                        <td>${description}</td>
                        <td>${temperature}</td>
                    </tr>`;

                    tableBody.innerHTML += row; // Append row to the table body
                });

                tableBody.classList.add('fadeIn'); // Add fadeIn class for smooth animation
                resolve(forecasts); // Resolve the promise with the weather data
            } else {
                reject(new Error('Error fetching weather data'));
            }
            document.getElementById('loading-indicator').classList.add('hidden');

        };

        xhr.onerror = () => {
            reject(new Error('Network error'));
            document.getElementById('loading-indicator').classList.add('hidden'); 
        };

        xhr.send();
    });
    }

// Получаем геолокацию пользователя и вызываем функцию для получения данных о погоде
// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(position => {
//         const { latitude, longitude } = position.coords;
//         getWeatherData(latitude, longitude);
//     }, error => {
//         console.error('Error getting geolocation:', error);
//     });
// } else {
//     console.error('Geolocation is not supported by this browser.');
// }
