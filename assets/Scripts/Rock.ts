import Player from "./Player";
import { gainNoteEvent, playNoteEvent } from "./util/EventManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Rock extends cc.Component {
    @property(Player)
    playerXi: Player = null

    lowY: number
    get highY() {
        return this.lowY + 30
    }
    crashed = false

    goUp = ([playerName, index]) => {
        if (playerName == '淅淅' && index == 0) {
            cc.tween(this.node)
                .to(0.4, { position: cc.v2(this.node.position.x, this.highY) })
                .to(0.8, { position: cc.v2(this.node.position.x, this.lowY) })
                .start()
        }
    }

    crash = ([playerName, index]: [string, number]) => {
        if (playerName == '咚咚' && index == 0) {
            // console.log("tween")
            cc.tween(this.node)
                .to(1, { angle: 106 })
                .start()
            this.crashed = true
        }
    }

    protected onLoad(): void {
        this.lowY = this.node.position.y
        playNoteEvent.subscribe(this.goUp)
        gainNoteEvent.subscribe(([playerName, index]) => {
            playNoteEvent.unsubscribe(this.goUp)
            playNoteEvent.subscribe(this.crash)
        })
        this.crashed = false
    }
}
