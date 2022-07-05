const personnageWidth = 50,
  personnageHeight = 150;

const attackWidth = 100,
  attackHeight = 50;

const Direction = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
};

const queueAction = [];

class Personnage {
  constructor({
    position,
    color,
    velocity,
    orientation,
    directionKey,
    attackKey,
  }) {
    this.position = position;
    this.color = color;
    this.velocity = velocity;
    this.width = personnageWidth;
    this.height = personnageHeight;
    this.orientation = orientation;
    this.directionKey = directionKey;
    this.attackKey = attackKey;
  }

  getWeapon({ xRange, damage, attackDuration, cooldown }) {
    this.weapon = new Weapon({ xRange, damage, attackDuration, cooldown });
  }

  update(axe, facteur) {
    this.clearPerson();

    this.position[axe] += this.velocity * facteur;
    draw(
      cPerson,
      this.color,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  action(pressKey) {
    if (Object.values(this.directionKey).includes(pressKey)) {
      const direction = Object.keys(this.directionKey)[
        Object.values(this.directionKey).indexOf(pressKey)
      ];
      this.move(direction);
      const intervalId = setInterval(() => {
        this.move(direction);
      }, "1000" / this.velocity);
      queueAction.push({ key: pressKey, intervalId: intervalId });
    } else if (Object.values(this.attackKey).includes(pressKey)) {
      const attack = Object.keys(this.attackKey)[
        Object.values(this.attackKey).indexOf(pressKey)
      ];
      this.attack(attack);
      const intervalId = setInterval(() => {
        this.attack(attack);
      }, "200");
      queueAction.push({ key: pressKey, intervalId: intervalId });
    }
  }

  move(direction) {
    switch (direction) {
      case Direction.down:
        if (this.position.y + this.height + this.velocity < personCanvas.height) {
          this.update("y", 1);
        }
        break;

      case Direction.right:
        if (this.position.x + this.width + this.velocity < personCanvas.width) {
          this.update("x", 1);
        }
        this.orientation = Direction.right;
        break;

      case Direction.up:
        if (this.position.y + this.velocity > this.velocity) {
          this.update("y", -1);
        }
        break;

      case Direction.left:
        if (this.position.x + this.velocity > this.velocity) {
          this.update("x", -1);
        }
        this.orientation = Direction.left;
        break;

      default:
        break;
    }
  }

  attack(attack) {
    console.log(attack);
    switch (attack) {
      case "attack":
        this.weapon.attack(this.position.x, this.position.y, personnageWidth, this.orientation)
    }
  }

  clearPerson() {
    cPerson.clearRect(this.position.x, this.position.y, this.width, this.height);
  }
}
