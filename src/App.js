import React from 'react';
import './App.css';

function App() {
  // Weather Data
  const [weatherData, setWeatherData] = React.useState([]);

  console.log(weatherData);
  // Get Weather Data
  async function fetchWeatherData() {
    let res = await fetch(
      'http://api.weatherapi.com/v1/forecast.json?key=4131175564eb4b81a95182921211612&q=Toronto&days=3&aqi=no&alerts=no'
    );
    let data = await res.json();
    setWeatherData(data.forecast.forecastday);
  }

  React.useEffect(() => {
    fetchWeatherData();
  }, []);

  const getLocalTime = () => {
    console.log(weatherData);
  };

  getLocalTime();

  // Get Day from Date
  const getDay = (thisDateEpoch) => {
    return new Date(thisDateEpoch).toLocaleString('en-us', {
      weekday: 'short',
    });
  };

  return (
    <div className='App'>
      <div className='container'>
        {weatherData.map((day) => {
          // Create day card
          return (
            <div className='dayCard' key={day.date_epoch}>
              <h2 className='weekDay'>{getDay(day.date)}</h2>
              <img src={`http:${day.day.condition.icon}`} />
              <div className='temp'>
                <h3 className='highTemp'>{day.day.maxtemp_c.toFixed()}°</h3>
                <h3 className='lowTemp'>{day.day.mintemp_c.toFixed()}°</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
