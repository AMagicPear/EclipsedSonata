import NPC from "./NPC";
import { gainNoteEvent, playNoteEvent } from "./util/EventManager";
import IDialog from "./util/IDialog";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Mushroom extends NPC {
    @property(cc.Node)
    spoomMushroom: cc.Node = null

    hasSelfDialog: boolean = false;
    dialogContent: IDialog[] = [
        { role: 2, text: "刚出门就被大石头挡住了呜呜" },
        { role: 2, text: "这下我们没救了呜呜" },
        { role: 1, text: "淅淅不哭，你看上面的蘑菇好像有点特别" },
        { role: 1, text: "这个石头上好像也有纹路" },
        { role: 1, text: "要是我能够到蘑菇就好了" }
    ];

    lightMushroom = (_: any) => {
            cc.tween(this.spoomMushroom)
                .to(0.4, { opacity: 255 })
                .to(0.8, { opacity: 0 })
                .start()
        }

    protected override onLoad(): void {
        super.onLoad()
        playNoteEvent.subscribe(this.lightMushroom)
    }

    protected onDestroy(): void {
        playNoteEvent.unsubscribe(this.lightMushroom)
    }

    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider): void {
        if (otherCollider.tag == 2) {
            gainNoteEvent.invoke(['咚咚', 0])
            this.node.destroy()
        }
    }
}
