import axios from 'axios';
import { PROXY } from '../config';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async searchQuery() {
    try {
      const res = await axios(
        `${PROXY}http://cities-ids.herokuapp.com?q=${this.query}`
      );
      this.result = res.data;
    } catch (err) {
      console.error('Something went wrong');
      throw err;
    }
  }
}
