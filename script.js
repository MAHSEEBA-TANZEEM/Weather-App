async function getWeather() { 
    const city = document.getElementById('cityInput').value; 
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; 
    try { 
        const response = await fetch(apiUrl); 
        const data = await response.json(); 
        
        if (data.cod === '404') { 
            document.getElementById('weatherResult').innerText = 'City not found.'; 
            return;
        }

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