let currentMission = 0;

const missions = [
  "Drive to Redwater Gas & Oil",
  "Talk to the mechanic at Bell Creek Garage",
  "Steal a vehicle from the motel lot"
];

export function startMissionSystem() {
  updateMission();
}

function updateMission() {
  const text = document.getElementById("mission-text");

  text.innerText = missions[currentMission];

  setInterval(() => {
    if (currentMission < missions.length - 1) {
      currentMission++;
      text.innerText = missions[currentMission];
    }
  }, 15000);
}