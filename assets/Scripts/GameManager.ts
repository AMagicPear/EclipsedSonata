const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
    public static Instance: GameManager;
    protected onLoad(): void {
        GameManager.Instance = this;
        cc.director.getPhysicsManager().enabled = true;
    }
}