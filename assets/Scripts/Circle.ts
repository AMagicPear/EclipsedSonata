// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Float)
    public spinSpeed: number = 2.0;

    @property([cc.Float])
    private judgeRotationPoints: number[] = [];

    @property(cc.Label)
    private timeLabel: cc.Label = null;

    @property(cc.Label)
    hitLabel: cc.Label = null;

    @property(cc.Color)
    private highlightColor: cc.Color = new cc.Color(203, 47, 47, 255);

    @property(cc.Color)
    private defaultColor: cc.Color = new cc.Color(255, 255, 255, 255);

    _state: boolean = false;
    get state() {
        return this._state;
    }

    set state(value) {
        this._state = value;
        this.timeLabel.node.color = value ? this.highlightColor : this.defaultColor;
    }

    protected onLoad(): void {
        this.node.on('mousedown', this.judge, this);
    }

    protected update(dt: number): void {
        this.node.angle += this.spinSpeed
        this.node.angle %= 360
        if (this.state) this.state = false;
        for (const point of this.judgeRotationPoints)
            if (Math.abs(this.node.angle - point) < 10)
                if (!this.state) this.state = true;
    }

    private judge(event: any) {
        this.hitLabel.node.color = this.state ? this.highlightColor : this.defaultColor;
    }
}
