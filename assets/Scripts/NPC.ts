import EventEmitter from "./util/EventManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NPC extends cc.Component {
    @property(cc.Node)
    playerDong: cc.Node = null

    @property(cc.Node)
    playerXi: cc.Node = null

    @property(cc.Node)
    textBg: cc.Node = null

    @property(cc.Label)
    label: cc.Label = null

    @property(cc.Node)
    noticeDialog: cc.Node = null

    @property([cc.String])
    dialogs: string[] = []

    _dialogShowing = false
    _disDong: number
    _disXi: number
    _currentDialogIndex: number = 0

    dialogShowEvent: EventEmitter<boolean>
    get dialogShowing(): boolean {
        return this._dialogShowing
    }

    set dialogShowing(value: boolean) {
        this._dialogShowing = value
        // this.label.enabled = value
        this.noticeDialog.active = value
        this.dialogShowEvent.invoke(value)
    }

    protected onLoad(): void {
        this.label.enabled = false
        this.noticeDialog.active = false
        this.textBg.active = false
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.dialogShowEvent = new EventEmitter<boolean>('dialogShow')
    }

    onKeyDown() {

    }

    protected update(dt: number): void {
        // 计算玩家角色与自身的X轴位置
        this._disDong = Math.abs(this.node.x - this.playerDong.x)
        this._disXi = Math.abs(this.node.x - this.playerDong.x)
        let dis = Math.min(this._disDong, this._disXi)
        if (dis < 60) {
            if (!this.dialogShowing) {
                this.dialogShowing = true
            }
        } else {
            if (this.dialogShowing) {
                this.dialogShowing = false
            }
        }
    }
}
