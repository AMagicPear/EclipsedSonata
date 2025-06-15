import NPC from "./NPC";
import IDialog from "./util/IDialog";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Mushroom extends NPC {
    hasSelfDialog: boolean = false;
    dialogContent: IDialog[] = [
        { role: 2, text: "刚出门就被大石头挡住了呜呜" },
        { role: 2, text: "这下我们没救了呜呜" },
        { role: 1, text: "淅淅不哭，你看上面的蘑菇好像有点特别" },
        { role: 1, text: "这个石头上好像也有纹路" },
        { role: 1, text: "要是我能够到蘑菇就好了" }
    ];

    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider): void {
        console.log("mushroom hit")
    }
}
