let weatherStates = ["Clear", "Rain", "Foggy"];
let index = 0;

export function startWeatherSystem() {
  const weatherText = document.getElementById("weather-text");

  setInterval(() => {
    index = (index + 1) % weatherStates.length;
    weatherText.innerText = "Weather: " + weatherStates[index];

    applyWeather(index);
  }, 12000);
}

function applyWeather(i) {
  if (i === 1) {
    document.body.style.filter = "brightness(0.8)";
  } else if (i === 2) {
    document.body.style.filter = "brightness(0.6) blur(1px)";
  } else {
    document.body.style.filter = "brightness(1)";
  }
}