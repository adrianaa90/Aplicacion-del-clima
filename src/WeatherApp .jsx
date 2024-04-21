import { useState, useEffect } from 'react';
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
      <button onClick={onDelete}>Delete</button> {/* Botón para eliminar la tarjeta de la ciudad */}
    </div>
  );
};

const WeatherApp = () => {
  const [city, setCity] = useState(''); // Estado para almacenar el nombre de la ciudad ingresada por el usuario
  const [weather, setWeather] = useState(null); // Estado para almacenar los datos meteorológicos de la ciudad
  const [searchedCities, setSearchedCities] = useState([]); // Estado para almacenar las ciudades buscadas
  const API_KEY = 'df7876aa005bc1e19dea22e6d777c45a'; // Clave de API para OpenWeatherMap

  useEffect(() => {
    if (city) {
      // Realizar una solicitud a la API de OpenWeatherMap cuando cambie la ciudad
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => {
          // Almacenar los datos meteorológicos de la ciudad y agregar la ciudad a las ciudades buscadas
          setWeather(response.data);
          addSearchedCity(city);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, [city]); // Ejecutar el efecto cuando cambie la ciudad

  const handleSearch = () => {
    if (city.trim() !== '') {
      // No es necesario limpiar el estado del clima aquí
      // setWeather(null); // Limpiar los datos meteorológicos previos
    }
  };

  const addSearchedCity = (city) => {
    // Agregar la ciudad a las ciudades buscadas
    setSearchedCities(prevCities => [...prevCities, city]);
  };

  return (
    <div className="weather-app-container">
      <h1>Weather App by Adriana Alexe</h1>
      
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)} // Actualizar el estado de la ciudad al escribir en el input
      />
      <button onClick={handleSearch}>Search</button> {/* Botón para buscar la ciudad */}
      
      {/* Mostrar la tarjeta de la ciudad buscada si hay datos meteorológicos disponibles */}
      {weather && (
        <WeatherCard 
          city={weather.name} 
          weather={weather} 
          onDelete={() => setWeather(null)} // Función para eliminar la tarjeta de la ciudad
        />
      )}
    </div>
  );
};

export default WeatherApp;
