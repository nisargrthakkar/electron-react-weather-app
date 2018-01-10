// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Weather.css';

const Api = require('../api/WeatherAPI'); // Weather API

let query = ''; // Expects something like this ?city=London,Paris,Berlin,Madrid
let cities = []; // Transform query string cities into an array
let citiesWeather = []; // API cache
let currentCity = 0; // Index of current city displa

class Weather extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weather: '',
      temp: 0,
      humidity: 0,
      wind: 0,
      error: ''
    };
  }


  componentWillMount() {
    // Get the query string data
    query = location.href.split('=')[1];

    if (query !== undefined) {
      cities = query.split(',');

      // Set the interval to load new cities
      if (cities.length > 1) {
        setInterval(() => {
          currentCity++;
          if (currentCity === cities.length) {
            currentCity = 0;
          }
          this.fetchData();
        }, 5000);
      }
    } else {
      cities[0] = 'London';
    }
    setInterval(() => {
      citiesWeather = []; // Empty the cache
    }, (1000 * 60 * 5));

    this.fetchData();
  }

  fetchData() {
    Api.get(cities[currentCity])
      .then((data) => {
        if (data.cod != '404') {
          if (data.cod != '429') {
            citiesWeather[currentCity] = data;
            this.updateData();
            if (this.state.error != '') {
              setTimeout(() => {
                this.setState({ error: '' });
              }, 2000);
            }
          } else {
            this.setState({
              error: 'There is something isuue with API, Please try after some time'
            });
          }
        } else {
          this.setState({
            error: `We Found Something Isuue with ${cities[currentCity]} city So We are display London as defult`
          });
          cities[currentCity] = 'London';
          citiesWeather = [];
          this.fetchData();
        }
      });
  }

  updateData() {
      this.setState({
        weather: citiesWeather[currentCity].weather[0].id,
        temp: Math.round(citiesWeather[currentCity].main.temp - 273.15),
        humidity: Math.round(citiesWeather[currentCity].main.humidity),
        wind: Math.round(citiesWeather[currentCity].wind.speed)
      });
  }


  render() {
    const weatherClass = `wi wi-owm-${this.state.weather}`;
    let bgColorClass = 'weatherWidget '; // very-warm, warm, normal, cold, very-cold

    // Set the background colour based on the temperature
    if (this.state.temp >= 30) {
      bgColorClass += 'very-warm';
    } else if (this.state.temp > 20 && this.state.temp < 30) {
      bgColorClass += 'warm';
    } else if (this.state.temp > 10 && this.state.temp < 20) {
      bgColorClass += 'normal';
    } else if (this.state.temp > 0 && this.state.temp < 10) {
      bgColorClass += 'cold';
    } else if (this.state.temp <= 0) {
      bgColorClass += 'very-cold';
    }

    return (
      <div className={bgColorClass}>
        <div className={styles.backButton} data-tid="backButton">
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <p className="error"> {this.state.error}</p>
        <h1 className="city">{cities[currentCity].replace(/%20/g, " ")}</h1>
        <div className="weather">
          <i className={weatherClass} />
        </div>
        <section className="weatherDetails">
          <div className="temp">
            <span className="temp-number">{this.state.temp}</span>
            <span className="wi wi-degrees" /></div>
          <div className="humidity">
            <i className="wi wi-raindrop" />
            {this.state.humidity} %
          </div>
          <div className="wind">
            <i className="wi wi-small-craft-advisory" />
            {this.state.wind}
            <span className="vel">Km/h</span></div>
        </section>
      </div>
    );
  }
}

export default Weather;
