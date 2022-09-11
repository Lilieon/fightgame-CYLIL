const personnageWidth = 50,
  personnageHeight = 150;

const attackWidth = 100,
  attackHeight = 50;

const groundY = 450;

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
    this.update('x', 0);
  }

  getWeapon({ xRange, damage, attackDuration, cooldown }) {
    this.weapon = new Weapon({ xRange, damage, attackDuration, cooldown });
  }

  update(axe, facteur) {
    this.clearPerson();

    this.position[axe] += this.velocity * facteur;

    if (this.position.y < 0) { this.position.y = 0; }

    draw(
      cPerson,
      this.color,
      this.position.x,
      this.getY(),
      this.width,
      this.height
    );
  }

  getY() {
    return groundY - personnageHeight - this.position.y;
  }

  isGrounded() {
    return this.position.y <= 0;
  }

  jump() {
    const gravity = 0.1;
    let speedY = 1.8;

    const intervalId = setInterval(() => {
      this.update('y', speedY);
      speedY -= gravity;

      if (this.isGrounded()) {
        clearInterval(intervalId);
      }
    }, 20);
  }

  action(pressKey) {
    const direction = Object.entries(this.directionKey).find(([, key]) => key === pressKey)?.[0];

    if (direction) {
      this.move(direction);

      const intervalId = setInterval(() => {
        this.move(direction);
      }, 1000 / this.velocity);

      queueAction.push({ key: pressKey, intervalId: intervalId });
      return;
    }

    const attack = Object.entries(this.attackKey).find(([, key]) => key === pressKey)?.[0];

    if (attack) {
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
        if (this.position.y + this.height + this.velocity < personCanvas.height && !this.isGrounded()) {
          this.update("y", -1);
        }
        break;

      case Direction.right:
        if (this.position.x + this.width + this.velocity < personCanvas.width) {
          this.update("x", 1);
        }
        this.orientation = Direction.right;
        break;

      case Direction.up:
        if (this.isGrounded()) {
          this.jump();
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
        this.weapon.attack(this.position.x, this.getY(), personnageWidth, this.orientation)
    }
  }

  clearPerson() {
    cPerson.clearRect(this.position.x, this.getY(), this.width, this.height);
  }
}
