export default class Current {
  constructor() {
    this.location = {};
  }

  getLocation() {
    console.log('start');
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.location = position;
          resolve(this.location);
        },
        err => {
          reject(err.message);
        }
      );
    });
  }

  showLocation() {
    return this.location;
  }
}
