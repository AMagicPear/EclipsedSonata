import Player from "./Player";
import { dialogShowEvent, playNoteEvent } from "./util/EventManager";
import IDialog from "./util/IDialog";

const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class NPC extends cc.Component {
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

    _dialogShowing = false
    _disDong: number
    _disXi: number
    _currentDialogIndex: number = -1

    audioSource: cc.AudioSource = null
    abstract hasSelfDialog: boolean

    @property(cc.Boolean)
    freeze: boolean = true

    get dialogShowing(): boolean {
        return this._dialogShowing
    }

    set dialogShowing(value: boolean) {
        this._dialogShowing = value
        if (this._currentDialogIndex == -1) this.noticeDialog.active = value
        else if (this.hasSelfDialog) this.textBg.active = value
        if (this.freeze) dialogShowEvent.invoke(value)
    }

    abstract dialogContent: IDialog[]
    protected onLoad(): void {
        if (this.hasSelfDialog) {
            this.noticeDialog.active = false
            this.textBg.active = false
        }
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.audioSource = this.getComponent(cc.AudioSource)
    }

    onKeyDown(event: any) {
        if (!this.dialogShowing) return
        if (event.keyCode == cc.macro.KEY.space) {
            if (this._currentDialogIndex == -1) {
                this.noticeDialog.active = false
            }
            if (this._currentDialogIndex == this.dialogContent.length - 1) {
                if (this.hasSelfDialog) {
                    this.textBg.active = false
                    this.dialogShowing = false
                }
                this.playerDong.stopSay()
                this.playerXi.stopSay()
                return
            }
            this._currentDialogIndex++
            let currentDialogContent = this.dialogContent[this._currentDialogIndex]
            if (currentDialogContent.role == 1) {
                if (this.hasSelfDialog) this.textBg.active = false
                this.playerDong.say(currentDialogContent.text)
                this.audioSource.play()
            } else if (currentDialogContent.role == 2) {
                if (this.hasSelfDialog) this.textBg.active = false
                this.playerXi.say(currentDialogContent.text)
                this.audioSource.play()
                if (this._currentDialogIndex == 8) {
                    playNoteEvent.invoke(['淅淅', 0])
                }
            }
            else if (currentDialogContent.role == 0 && this.hasSelfDialog) {
                this.playerDong.stopSay()
                this.playerXi.stopSay()
                if (this.hasSelfDialog) {
                    this.textBg.active = true
                    this.label.string = currentDialogContent.text
                }
                this.audioSource.play()
            }
        }
    }

    protected update(dt: number): void {
        if (this.dialogShowing) return
        // 计算玩家角色与自身的X轴位置
        this._disDong = Math.abs(this.node.x - this.playerDong.node.x)
        this._disXi = Math.abs(this.node.x - this.playerXi.node.x)
        let dis = Math.min(this._disDong, this._disXi)
        if (dis < 60 && this._currentDialogIndex < this.dialogContent.length - 1) {
            if (!this.dialogShowing) {
                this.dialogShowing = true
            }
        }
    }
}
