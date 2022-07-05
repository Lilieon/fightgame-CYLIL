class Weapon {
  constructor({
    xRange,
    damage,
    attackDuration,
    cooldown,
  }) {
    this.xRange = xRange;
    this.damage = damage;
    this.attackDuration = attackDuration;
    this.cooldown = cooldown;
  }

  attack(x, y, personnageWidth, orientation) {
    let xAttackStartPosition = x;
        let orientationFactor = 1;
        if (orientation == Direction.left) {
          xAttackStartPosition += personnageWidth;
          orientationFactor = -1;
        }
        draw(
          cAttack,
          "green",
          xAttackStartPosition,
          y,
          this.xRange * orientationFactor,
          50
        );
        setTimeout(() => {
          cAttack.clearRect(xAttackStartPosition, y, this.xRange * orientationFactor, 50);
          // draw(
          //   cAttack,
          //   this.color,
          //   xAttackStartPosition,
          //   this.position.y,
          //   (attackWidth / 2) * orientationFactor,
          //   attackHeight
          // );
          // draw(
          //   cAttack,
          //   "black",
          //   xAttackStartPosition + (attackWidth / 2) * orientationFactor,
          //   this.position.y,
          //   (attackWidth / 2) * orientationFactor,
          //   attackHeight
          // );
        }, 500);
  }
}