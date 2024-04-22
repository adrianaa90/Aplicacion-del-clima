import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherCard = ({ city, weather, onDelete }) => {
  return (
    <div className="weather-card">
      <h2>{city}</h2>
      
      {weather && (
        <div>
          <p>Description: {weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          {weather.rain && <p>Precipitation: {weather.rain['1h']} mm</p>}
          {weather.snow && <p>Snow: {weather.snow['1h']} mm</p>}
        </div>
      )}
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

const WeatherApp = () => {
  const [city, setCity] = useState(''); 
  const [weather, setWeather] = useState(null); 
  const [searchedCities, setSearchedCities] = useState([]); 
  const API_KEY = 'df7876aa005bc1e19dea22e6d777c45a'; 

  useEffect(() => {
    if (city) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => {
          setWeather(response.data);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, [city]);

  const handleSearch = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="weather-app-container">
      <h1>Weather App by Adriana Alexe</h1>
      
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleSearch} 
      />
      
      {weather && (
        <WeatherCard 
          city={weather.name} 
          weather={weather} 
          onDelete={() => setWeather(null)} 
        />
      )}
    </div>
  );
};

export default WeatherApp;
