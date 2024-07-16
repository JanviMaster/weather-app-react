import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState("Mumbai");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const currentDate = new Date();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  const API_KEY = "bcda10ba323e88e96cb486015a104d1d"; 

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error('Weather data not available for this location.');
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className='container_date'>{formattedDate}</h1>
        {error && <p className="error">{error}</p>}
        <div className='weather_data'>
          {weatherData && (
            <>
              <h1 className='container_city'>{weatherData.name}</h1>
              {/* <img className='container_img' src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />  */}
              <h2 className="container_degree">{weatherData.main.temp}°C</h2>
              <h2 className="country_per">{weatherData.weather[0].main}</h2>
            </>
          )}
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <input type='text' className='input' placeholder='Enter city name' value={city} onChange={handleInputChange} />
          <button type='submit'>Get Weather</button>
        </form>
      </div>
    </div>
  );
}

export default App;
