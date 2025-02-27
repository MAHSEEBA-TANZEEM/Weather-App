async function getWeather() { 
    const city = document.getElementById('cityInput').value.trim(); // Trim any extra whitespace
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; 
    
    if (!city) {
        document.getElementById('weatherResult').innerText = 'Please enter a city name.'; 
        return;
    }

    try { 
        const response = await fetch(apiUrl); 
        
        if (!response.ok) { // Check if the response is not OK (e.g., 404 or 401)
            if (response.status === 401) {
                document.getElementById('weatherResult').innerText = 'Unauthorized request. Please check your API key.'; 
            } else if (response.status === 404) {
                document.getElementById('weatherResult').innerText = 'City not found.'; 
            } else {
                document.getElementById('weatherResult').innerText = 'Error fetching weather data.'; 
            }
            return;
        }
        
        const data = await response.json(); 

        const weatherDescription = data.weather[0].description; 
        const temperature = data.main.temp;
        const humidity = data.main.humidity;

        document.getElementById('weatherResult').innerHTML = ` 
        <p>Weather: ${weatherDescription}</p> 
        <p>Temperature: ${temperature}°C</p> 
        <p>Humidity: ${humidity}%</p> `; 
    } catch (error) { 
        document.getElementById('weatherResult').innerText = 'Error fetching weather data.'; 
    }
}
