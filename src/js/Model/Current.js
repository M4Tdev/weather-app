import axios from 'axios';

const geoOptions = {
  enableHighAccuracy: true,
  maximumAge: 30000,
};

export default class Current {
  constructor() {
    this.location = {};
  }

  getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.location = position;
          resolve(this.location);
        },
        err => {
          reject(err);
        },
        geoOptions
      );
    });
  }

  async getWeather() {
    const res = await axios(
      `${process.env.PROXY}https://api.openweathermap.org/data/2.5/weather?&APPID=${
        process.env.APIKEY
      }&units=metric&lat=${this.location.coords.latitude}&lon=${this.location.coords.longitude}`
    );

    this.weather = res.data;
  }
}
