window.addEventListener('load', () => {
    let weatherContainer = document.getElementById('weatherContainer');
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            await fetchWeatherData(latitude, longitude);
        }, (error) => {
            console.error(error);
            weatherContainer.innerHTML = '<p>Unable to retrieve your location for weather information.</p>';
        });
    } else {
        weatherContainer.innerHTML = '<p>Geolocation is not supported by your browser.</p>';
    }
});

async function fetchWeatherData(latitude, longitude) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const apiUrl = https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey};

    try {
        let response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        let data = await response.json();
        console.log(data); // View the data in the console for reference

        // Update HTML with weather data
        let weatherInfo = `
            <h2>${data.name} Weather</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        weatherContainer.innerHTML = weatherInfo;

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        weatherContainer.innerHTML = '<p>Unable to fetch weather data at the moment.</p>';
    }
}