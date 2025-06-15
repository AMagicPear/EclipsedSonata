const {ccclass, property} = cc._decorator;

@ccclass
export default class NextLevel extends cc.Component {
    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider): void {
        if(otherCollider.tag == 2){
            cc.director.loadScene("Main")
        }
    }
}
