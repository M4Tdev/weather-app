import axios from 'axios';

export default class Forecast {
  constructor() {
    this.id = Number;
    this.type = '';
  }

  async getWeather(id) {
    try {
      const res = await axios(
        `${process.env.PROXY}https://api.openweathermap.org/data/2.5/forecast?appid=${
          process.env.APIKEY
        }&units=metric&id=${id}`
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
