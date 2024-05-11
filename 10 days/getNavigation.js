if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        getWeatherData(latitude, longitude);
    }, error => {
        console.error('Error getting geolocation:', error);
    });
} else {
    console.error('Geolocation is not supported by this browser.');
}
