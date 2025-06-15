import Player from "./Player";
import { playNoteEvent } from "./util/EventManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Rock extends cc.Component {
    @property(Player)
    playerXi: Player = null

    lowY: number
    get highY() {
        return this.lowY + 30
    }

    protected onLoad(): void {
        this.lowY = this.node.position.y
        playNoteEvent.subscribe(([playerName, index]) => {
            cc.tween(this.node)
                .to(0.4, { position: cc.v2(this.node.position.x, this.highY) })
                .to(0.8, { position: cc.v2(this.node.position.x, this.lowY) })
                .start()
        })
    }
}
