const { ccclass, property } = cc._decorator;

@ccclass
export default class CircleEmiter extends cc.Component {
    @property({ type: cc.Prefab })
    circleSprite: cc.Prefab = null

    @property(cc.Float)
    rorateSpeed: number = 10

    circles: cc.Node[] = []

    protected start(): void {
    }

    protected update(dt: number): void {
        this.node.angle -= this.rorateSpeed * dt
        // if(this.node.angle)
    }
}
