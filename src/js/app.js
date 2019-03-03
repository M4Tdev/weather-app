import Current from './Model/Current';
import '../css/main.scss';

const currentLocation = new Current();

// currentLocation.getLocation();
// currentLocation.getLocation();

const controlCurrent = async () => {
  const userLocation = await currentLocation.getLocation();

  console.log(userLocation);
};

window.addEventListener('load', controlCurrent);
