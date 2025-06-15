const { ccclass, property } = cc._decorator;

@ccclass
export default class MenuArrow extends cc.Component {
  @property(cc.Node)
  circle: cc.Node = null

  // private isActiveByMouse = false
  start() {
    cc.director.preloadScene("Upground")
    this.node.on('mousedown', (event: cc.Event.EventMouse) => {
      // this.isActiveByMouse = true
      cc.tween(this.node)
        .to(0.4, { angle: -10 }, { easing: 'sineInOut' })
        .start()
      cc.tween(this.circle)
        .to(0.6, { angle: 180 })
        .start()
      // this.node.angle -= 10
      this.scheduleOnce(() => cc.director.loadScene("Upground"), 0.6)
    }, this)
    // this.node.on('mouseup', (event: cc.Event.EventMouse) => {
    //   this.isActiveByMouse = false
    // }, this)
  }

  // update (dt) {}
}
