export function spawnVehicle(name = "Sedan") {
  console.log("Vehicle spawned:", name);

  const hud = document.getElementById("hud");

  const msg = document.createElement("p");
  msg.innerText = "Vehicle Ready: " + name;

  hud.appendChild(msg);

  setTimeout(() => msg.remove(), 4000);
}