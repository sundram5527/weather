import React, { useState, useEffect } from 'react';
import './App.css';

const API_KEY = "ec44ee76e6bb7d53ff16b19d6375766d" ; // Replace with your API key

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeather();
    }
  }, [city]);

  return (
    <div>
       <div className="flex items-center justify-center flex-col h-250 w-full bg-blue-200 ">
        <div className="flex items-center justify-center flex-col border-4 h-120 rounded-3xl w-125 bg-blue-300">
      <h1 className='font-bold text-4xl'>Weather App</h1>
      <input className='font-medium  text-3xl mt-10 border-4 rounded-md'
        type="text"
        placeholder="       Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <div className='border-2 border-sky-500 h-50 w-80 mt-5 p-2'>
        <button onClick={fetchWeather} className='text-2xl mt-2 mb-4 '>Get Weather</button>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
           
        </div>
      )}
      </div>
     
        </div>
    
      </div>
      
    </div>
    
  );
}

export default App;