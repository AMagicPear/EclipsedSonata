const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends cc.Component {
    body: cc.RigidBody;
    get speed_c() { return 2 };

    @property(cc.Float)
    speed: number = 0;

    protected onLoad(): void {
        this.body = this.getComponent(cc.RigidBody)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        console.log(this.body);
    }

    onKeyDown(event: cc.Event.EventKeyboard): void {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.speed = -this.speed_c;
                break;
            case cc.macro.KEY.d:
                this.speed = this.speed_c;
                break;
            case cc.macro.KEY.space:
                this.body.applyLinearImpulse(cc.v2(0, 1000), this.body.getWorldCenter(), true);
                break;
        }
    }

    onKeyUp(event) {
        this.speed = 0;
    }


    protected update(dt: number): void {
        let v = this.body.linearVelocity;
        v.x += this.speed;
        this.body.linearVelocity = v;
    }
}