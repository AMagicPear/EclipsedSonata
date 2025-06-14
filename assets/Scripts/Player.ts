const { ccclass, property } = cc._decorator;
type PlayerName = '咚咚' | '淅淅'

@ccclass
export default class Player extends cc.Component {
    rigidbody: cc.RigidBody

    @property(cc.String)
    playerName: PlayerName = '咚咚'

    @property(cc.Float)
    speed_c: number = 100

    kbPressed: Record<'left' | 'right' | 'up' | 'down', boolean> = {
        left: false,
        right: false,
        up: false,
        down: false
    }
    
    onGround: boolean = true

    protected onLoad(): void {
        this.rigidbody = this.getComponent(cc.RigidBody)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    protected update(dt: number): void {
        if (this.kbPressed.left && this.kbPressed.right) return
        if (!this.kbPressed.left && !this.kbPressed.right) return
        // if (this.kbPressed.left) this.node.x -= this.speed_c * dt
        // if (this.kbPressed.right) this.node.x += this.speed_c * dt
        if (this.kbPressed.left)
            this.rigidbody.applyForce(new cc.Vec2(-100 * this.rigidbody.getMass(), 0), this.rigidbody.getLocalCenter(), true);
        if (this.kbPressed.right)
            this.rigidbody.applyForce(new cc.Vec2(100 * this.rigidbody.getMass(), 0), this.rigidbody.getLocalCenter(), true);
    }

    onKeyDown(event: any): void {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.kbPressed.left = true
                break;
            case cc.macro.KEY.d:
                this.kbPressed.right = true
                break;
            case cc.macro.KEY.w:
                this.kbPressed.up = true
                this.rigidbody.applyLinearImpulse(new cc.Vec2(0, 200 * this.rigidbody.getMass()), this.rigidbody.getLocalCenter(), true);
                break
            case cc.macro.KEY.s:
                this.kbPressed.down = true
                break
        }
    }

    onKeyUp(event: any): void {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.kbPressed.left = false
            case cc.macro.KEY.d:
                this.kbPressed.right = false
                break;
            case cc.macro.KEY.w:
                this.kbPressed.up = false
                break
            case cc.macro.KEY.s:
                this.kbPressed.down = false
                break
        }
    }
}
