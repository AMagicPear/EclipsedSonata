import Player from "./Player";
import { dialogShowEvent } from "./util/EventManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NPC extends cc.Component {
    @property(Player)
    playerDong: Player = null

    @property(Player)
    playerXi: Player = null

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
    _currentDialogIndex: number = -1

    get dialogShowing(): boolean {
        return this._dialogShowing
    }

    set dialogShowing(value: boolean) {
        this._dialogShowing = value
        if (this._currentDialogIndex == -1) this.noticeDialog.active = value
        else this.textBg.active = value
        dialogShowEvent.invoke(value)
    }

    dialogContent = [
        { role: 1, text: "长老……" },
        { role: 1, text: "为什么我的鼓……" },
        { role: 1, text: "它今天敲不响了？" }
    ]

    protected onLoad(): void {
        this.noticeDialog.active = false
        this.textBg.active = false
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event: any) {
        if (!this.dialogShowing) return
        if (event.keyCode == cc.macro.KEY.space) {
            if (this._currentDialogIndex == -1) {
                this.noticeDialog.active = false
                this.textBg.active = true
            }
        }
    }

    protected update(dt: number): void {
        if (this.dialogShowing) return
        // 计算玩家角色与自身的X轴位置
        this._disDong = Math.abs(this.node.x - this.playerDong.node.x)
        this._disXi = Math.abs(this.node.x - this.playerXi.node.x)
        let dis = Math.min(this._disDong, this._disXi)
        if (dis < 60) {
            if (!this.dialogShowing) {
                this.dialogShowing = true
            }
        }
    }
}
