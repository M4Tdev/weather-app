import axios from 'axios';
import { APIKEY, PROXY, units } from '../config';

export default class Other {
  constructor() {
    this.weather = [];
  }

  async getWeather(id) {
    try {
      const res = await axios(
        `${PROXY}https://api.openweathermap.org/data/2.5/weather?APPID=${APIKEY}&units=${units}&id=${id}`
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
