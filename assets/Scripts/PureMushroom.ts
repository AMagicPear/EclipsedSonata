import { playNoteEvent } from "./util/EventManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PureMushroom extends cc.Component {
    @property(cc.Node)
    spoomMushroom: cc.Node = null

    lightMushroom = (_: any) => {
        cc.tween(this.spoomMushroom)
            .to(0.4, { opacity: 255 })
            .to(0.8, { opacity: 0 })
            .start()
    }

    protected onLoad(): void {
        playNoteEvent.subscribe(this.lightMushroom)
    }

    protected onDestroy(): void {
        playNoteEvent.unsubscribe(this.lightMushroom)
    }
}
