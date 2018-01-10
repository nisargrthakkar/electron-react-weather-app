const rootUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiUrl = '&appid=9deb1490da7395429f58c27e7cf9746c';

// 9deb1490da7395429f58c27e7cf9746c
// bd5e378503939ddaee76f12ad7a97608

module.exports = {
  get(place) {
    return fetch(rootUrl + place + apiUrl, {
      headers: {}
    })
      .then((response) => response.json());
  }
};
