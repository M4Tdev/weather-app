import axios from 'axios';
import { APIKEY, PROXY } from '../config';

export default class Forecast {
  constructor() {
    this.id = Number;
    this.type = '';
  }

  async getWeather(id) {
    try {
      const res = await axios(
        `${PROXY}https://api.openweathermap.org/data/2.5/forecast?appid=${APIKEY}&units=metric&id=${id}`
      );

      this.weather = res.data.list;
      this.city = res.data.city;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  setID(id) {
    this.id = id;
  }

  setType(type) {
    this.type = type;
  }

  clearWeather() {
    this.weather = [];
    this.city = {};
  }
}
