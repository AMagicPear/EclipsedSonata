const { ccclass } = cc._decorator

@ccclass
export default class PlayerInner extends cc.Component {
    protected start(): void {
        // 上下动
        var tween = cc.tween(this.node)
            .by(1, { y: 20 }, { easing: 'sineInOut' })
            .by(1, { y: -20 }, { easing: 'sineInOut' })
        cc.tween(this.node).repeatForever(tween).start()
    }
}