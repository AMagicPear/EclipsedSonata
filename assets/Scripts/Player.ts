const { ccclass, property } = cc._decorator;
type PlayerName = '咚咚' | '淅淅'

@ccclass
export default class Player extends cc.Component {
    @property(cc.String)
    playerName: PlayerName = null

    @property(cc.Float)
    speed_c: number = 100

    xSpeed: number = 0

    protected onLoad(): void {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }
    protected start(): void {
        // 上下动
        var tween = cc.tween(this.node)
            .by(1, { y: 20 }, { easing: 'sineInOut' })
            .by(1, { y: -20 }, { easing: 'sineInOut' })
        cc.tween(this.node).repeatForever(tween).start()
    }
    protected update(dt: number): void {
        console.log(this.xSpeed, this.node.x)
        this.node.x += this.xSpeed * dt
    }

    onKeyDown(event: any): void {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.xSpeed = -this.speed_c;
                console.log(this.xSpeed)
                break;
            case cc.macro.KEY.d:
                this.xSpeed = this.speed_c;
                console.log(this.xSpeed)
                break;
        }
    }
}
