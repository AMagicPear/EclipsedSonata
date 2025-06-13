const { ccclass, property } = cc._decorator;
type PlayerName = '咚咚' | '淅淅'

@ccclass
export default class Player extends cc.Component {
    @property(cc.String)
    playerName: PlayerName = null

    @property(cc.Float)
    speed_c: number = 100

    isLeftPressed = false
    isRightPressed = false

    protected onLoad(): void {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
    protected start(): void {
        // 上下动
        var tween = cc.tween(this.node)
            .by(1, { y: 20 }, { easing: 'sineInOut' })
            .by(1, { y: -20 }, { easing: 'sineInOut' })
        cc.tween(this.node).repeatForever(tween).start()
    }
    protected update(dt: number): void {
        if(this.isLeftPressed && this.isRightPressed) return
        if(!this.isLeftPressed && !this.isRightPressed) return
        if(this.isLeftPressed) this.node.x -= this.speed_c * dt
        if(this.isRightPressed) this.node.x += this.speed_c * dt
    }

    onKeyDown(event: any): void {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.isLeftPressed = true
                break;
            case cc.macro.KEY.d:
                this.isRightPressed = true
                break;
        }
    }

    onKeyUp(event: any): void {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.isLeftPressed = false
            case cc.macro.KEY.d:
                this.isRightPressed = false
                break;
        }
    }
}
