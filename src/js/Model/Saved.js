export default class Saved {
  constructor() {
    this.saved = [];
  }

  addToSaved(id) {
    this.saved.push(parseInt(id));
  }

  isSaved(id) {
    return this.saved.findIndex(loc => loc === id);
  }

  deleteFromSaved(id) {
    const index = this.saved.findIndex(el => el === parseInt(id));
    this.saved.splice(index, 1);
  }

  deleteAllSaved() {
    this.saved = [];
    localStorage.removeItem('savedLocations');
  }

  saveToLocal() {
    // save added locations to localStorage
    localStorage.setItem('savedLocations', JSON.stringify(this.saved));
  }

  readFromLocal() {
    const saved = JSON.parse(localStorage.getItem('savedLocations'));
    this.saved = saved;
  }
}
