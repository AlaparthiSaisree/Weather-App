import React, { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showInfo, setShowInfo] = useState(false); // New state for toggling info visibility
  const API_KEY = '65ca267626ef1eba507ff5ff1604fed1'; // Replace with your OpenWeatherMap API key
  // Fetch weather data
  const fetchWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
        setError(null);
        setForecast(null); // Reset forecast when fetching new weather
      } else {
        setError(data.message || 'Failed to fetch weather data.');
        setWeather(null);
        setForecast(null);
      }
    } catch (err) {
      setError('Failed to fetch weather data.');
      console.error(err);
    }
  };

  // Fetch 5-day forecast
  const fetch5DayForecast = async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setForecast(data);
        setError(null);
      } else {
        setError(data.message || 'Failed to fetch forecast data.');
        setForecast(null);
      }
    } catch (err) {
      setError('Failed to fetch forecast data.');
      console.error(err);
    }
  };

  return (
    <div>
      {/* Profile and Info Buttons */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setShowProfile((prev) => !prev)} style={{ padding: '10px', marginLeft: '10px' }} className="btn">
          <i className="fa fa-user-circle"></i>
        </button>
        <button onClick={() => setShowInfo((prev) => !prev)} style={{ padding: '10px', marginLeft: '10px' }} className="btn">
          Info
        </button>
      </div>

      {/* Profile Section */}
      {showProfile && (
        <div style={{
            backgroundColor: '#f2f2f2',
            padding: '15px',
            margin: '10px auto',
            width: '20%',
            border: '1px solid #ccc',
          }}
        >
          <h3>User Profile</h3>
          <p>Name: Saisree Alaparthi</p>
        </div>
      )}

      {/* Info Section */}
      {showInfo && (
        <div
          style={{
            backgroundColor: '#f9f9f9',
            padding: '10px',
            margin: '10px auto',
            width: '80%',
            border: '1px solid #ddd',
          }}
        >
          <p><strong>PM Accelerator</strong></p>
          <p>
            The Product Manager Accelerator Program is designed to support PM
            professionals through every stage of their careers.
            <br></br>
            From students looking for entry-level jobs to Directors looking to
            take on a leadership role, our program has helped over hundreds of
            students fulfill their career aspirations.
            <br></br>
            Our Product Manager Accelerator community are ambitious and committed. Through our program they have learnt, honed
             and developed new PM and leadership skills, giving them a strong foundation for their future endeavors.
            Here are the examples of services we offer. Check out our website (link under my profile) to learn more about our services.
            <br></br>
            🚀 PMA Pro
            End-to-end product manager job hunting program that helps you master FAANG-level Product Management skills, 
            conduct unlimited mock interviews, and gain job referrals through our largest alumni network. 25% of our offers 
            came from tier 1 companies and get paid as high as $800K/year. 
            <br></br>🚀 AI PM Bootcamp
            Gain hands-on AI Product Management skills by building a real-life AI product with a team of AI Engineers, 
            data scientists, and designers. We will also help you launch your product with real user engagement using 
            our 100,000+ PM community and social media channels. 
           <br></br> 🚀 PMA Power Skills
            Designed for existing product managers to sharpen their product management skills, leadership skills, and 
            executive presentation skill
            <br></br>🚀 PMA Leader
          We help you accelerate your product management career, get promoted to Director and product executive levels, 
          and win in the board room. 
          <br></br>🚀 1:1 Resume Review
          We help you rewrite your killer product manager resume to stand out from the crowd, with an interview guarantee.
          Get started by using our FREE killer PM resume template used by over 14,000 product managers. 
          https://www.drnancyli.com/pmresume
          <br></br>🚀 We also published over 500+ free training and courses. <br></br>Please go to my YouTube channel https://www.youtube.com/c/drnancyli and Instagram @drnancyli to start learning for free today.
          <br></br>Website: https://www.pmaccelerator.io/
          <br></br>Phone:+19548891063
          <br></br>Industry: E-Learning Providers
          <br></br>Company size : 2-10 employees 91 associated members LinkedIn members who’ve listed Product Manager Accelerator as their current workplace on their profile.
          <br></br>Headquarters: Boston, MA<br></br>Founded: 2020<br></br>Specialties:Product Management, Product Manager, 
          Product Management Training, Product Management Certification, Product Lead, Product Executive, Associate Product Manager, 
          product management coaching, product manager resume, Product Management Interview, VP of Product, Director of Product, 
          Chief Product Officer, and AI Product Management
          </p>
        </div>
      )}

     <div style={{textAlign: 'center', padding:'100px', margin:'40px'}}>
      <h1>Weather App</h1>

      {/* Weather input and buttons */}
      <div>
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: '10px', width: '200px' }}
        />
        <br />
        <br />
        <button onClick={fetchWeather} style={{ padding: '10px', marginLeft: '10px' }}>
          Get Weather
        </button>
        <button onClick={fetch5DayForecast} style={{ padding: '10px', marginLeft: '10px' }}>
          Get 5-Day Forecast
        </button>
      </div>

      {/* Error Message */}
      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

      {/* Current Weather */}
      {weather && (
        <div style={{ marginTop: '20px' }}>
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}

      {/* 5-Day Forecast */}
      {forecast && (
        <div style={{ marginTop: '20px' }}>
          <h2>5-Day Forecast</h2>
          {forecast.list.slice(0, 5).map((item, index) => (
            <div
              key={index}
              style={{
                borderBottom: '1px solid #ddd',
                padding: '10px',
              }}
            >
              <p>
                <strong>{new Date(item.dt * 1000).toLocaleString()}</strong>
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
              <p>{item.weather[0].description}</p>
              <p>Temp: {item.main.temp}°C</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  
  );
}


export default App;