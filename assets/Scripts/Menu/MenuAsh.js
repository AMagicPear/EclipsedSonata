cc.Class({
  extends: cc.Component,

  properties: {
    changeInterval: cc.Float,
    currentDirection: cc.Vec2,
    moveSpeed: cc.Float,
    rotateSpeed: cc.Float
  },

  start() {
    this.schedule(this.changeDirection, this.changeInterval);
  },

  update(dt) {
    let moveStep = this.currentDirection.mul(this.moveSpeed * dt)
    this.node.position = this.node.position.add(moveStep)
    this.node.angle += this.rotateSpeed * dt
  },
  changeDirection() {
    const angle = Math.random() * Math.PI * 2;
    this.currentDirection = cc.v2(Math.cos(angle), Math.sin(angle));
  },
});
