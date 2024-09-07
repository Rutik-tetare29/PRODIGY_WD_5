const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '3fc733f5965d3b0157a6c46a248deff3';

// Default city on page load
$(document).ready(function () {
    getWeather('Yavatmal');
});

async function getWeather(cityName = $('#city-input').val()) {
    const endpoint = `${url}?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('City not found');
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
    $('#weather-icon').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    $('#weather-info').fadeIn();
}
