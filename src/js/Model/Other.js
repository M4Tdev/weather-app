import axios from 'axios';

export default class Other {
  constructor() {
    this.weather = [];
  }

  async getWeather(id) {
    try {
      const res = await axios(
        `${process.env.PROXY}https://api.openweathermap.org/data/2.5/weather?APPID=${
          process.env.APIKEY
        }&units=metric&id=${id}`
      );
      this.weather.push(res.data);
    } catch (err) {
      console.log('Something went wrong');
      console.error(err);
    }
  }

  clearWeather() {
    this.weather = [];
  }
}
