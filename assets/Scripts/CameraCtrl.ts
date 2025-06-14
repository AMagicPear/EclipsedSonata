import Player from "./Player";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CameraCtrl extends cc.Component {
    @property(Player)
    nodeDong: Player = null

    @property(Player)
    nodeXi: Player = null

    @property(cc.Float)
    leftBound: number = 1.86

    @property(cc.Float)
    rightBound: number = 100

    protected update(dt: number): void {
        if (this.nodeDong && this.nodeXi) {
            let mid = (this.nodeDong.node.x + this.nodeXi.node.x) / 2
            if (mid < this.leftBound) this.node.x = this.leftBound
            else if (mid > this.rightBound) this.node.x = this.rightBound
            else this.node.x = mid
        }
    }
}