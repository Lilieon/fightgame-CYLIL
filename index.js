const personCanvas = document.getElementById("personCanvas");
const attackCanvas = document.getElementById("attackCanvas");

const cPerson = personCanvas.getContext("2d");
const cAttack = attackCanvas.getContext("2d");

personCanvas.width = 1024;
personCanvas.height = 576;

attackCanvas.width = 1024;
attackCanvas.height = 576;


const playerInformation = {
  position: {
    x: 200,
    y: 0,
  },
  color: "blue",
  velocity: 10,
  orientation: Direction.right,
  directionKey: {left: "Q", down: "S", right: "D", up: "Z"},
  attackKey: {attack: " ",},
};

const enemyInformation = {
  position: {
    x: 701,
    y: 0,
  },
  color: "red",
  velocity: 10,
  orientation: Direction.left,
  directionKey: { left: "4", down: "5", right: "6", up: "8" },
  attackKey: {attack: "0",},
};

const player = new Personnage(playerInformation);
player.getWeapon({xRange :100,damage: 10,attackDuration: 500,cooldown: 10});

const enemy = new Personnage(enemyInformation);
enemy.getWeapon({xRange: 200,damage: 10,attackDuration: 500,cooldown: 10});

window.addEventListener("keydown", (event) => {
  if (!event.repeat) {
    const pressKey = event.key.toUpperCase();

    if (Object.values(player.directionKey).includes(pressKey) || Object.values(player.attackKey).includes(pressKey)) {
      player.action(pressKey);
    } else if (Object.values(enemy.directionKey).includes(pressKey) || Object.values(enemy.attackKey).includes(pressKey)) {
      enemy.action(pressKey);
    }
  }
});

window.addEventListener("keyup", (event) => {
  const pressKey = event.key.toUpperCase();

  queueAction.forEach((item) => {
    if (item.key == pressKey) {
      clearInterval(item.intervalId);
      return;
    }
  })
});
