const { ccclass, property } = cc._decorator;

@ccclass
export default class MenuArrow extends cc.Component {
  private isActiveByMouse = false

  start() {
    this.node.on('mousedown', (event: unknown) => {
      this.isActiveByMouse = true
    }, this)
    // this.node.on
  }

  // update (dt) {}
}
