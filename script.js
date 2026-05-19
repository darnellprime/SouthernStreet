import { playIntroScene } from './story.js';
import { startWeatherSystem } from './systems/weather.js';
import { startMissionSystem } from './systems/missions.js';

window.addEventListener('DOMContentLoaded', () => {

  // fake loading delay
  setTimeout(() => {
    document.getElementById("loading-screen").style.display = "none";
  }, 3000);

  // intro
  setTimeout(() => {
    playIntroScene();
  }, 4000);

  // start systems
  startWeatherSystem();
  startMissionSystem();

});