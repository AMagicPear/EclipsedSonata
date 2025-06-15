import { dialogShowEvent, playNoteEvent } from "./util/EventManager";

const { ccclass, property } = cc._decorator;
export type PlayerName = '咚咚' | '淅淅'

@ccclass
export default class Player extends cc.Component {
    rigidbody: cc.RigidBody

    @property(cc.String)
    playerName: PlayerName = '咚咚'

    @property(cc.Sprite)
    sprite: cc.Sprite = null

    @property(cc.SpriteFrame)
    stillSprite: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    playingSprite: cc.SpriteFrame = null

    @property(cc.Float)
    speed_c: number = 100

    @property(cc.Float)
    jumpImpFactor: number = 200

    @property(cc.Node)
    dialogBg: cc.Node = null

    @property(cc.Label)
    dialogText: cc.Label = null

    @property(cc.AudioSource)
    audioSource: cc.AudioSource = null

    @property([cc.AudioClip])
    notesClip: cc.AudioClip[] = []

    @property(cc.AudioClip)
    jumpAudio: cc.AudioClip = null

    kbPressed: Record<'left' | 'right' | 'up' | 'down', boolean> = {
        left: false,
        right: false,
        up: false,
        down: false
    }

    onGround: boolean = true
    disalogStatus: boolean = false

    protected onLoad(): void {
        this.rigidbody = this.getComponent(cc.RigidBody)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        dialogShowEvent.subscribe((show) => { this.disalogStatus = show })
        playNoteEvent.subscribe(([playerName, i]) => {
            if (playerName == this.playerName) {
                this.sprite.spriteFrame = this.playingSprite
                this.audioSource.clip = this.notesClip[i]
                this.audioSource.play()
                this.scheduleOnce(() => this.sprite.spriteFrame = this.stillSprite, 0.2)
            }
        })
    }

    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider): void {
        if (otherCollider.tag == 1) {
            this.onGround = true
        }
    }

    onEndContact(contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider): void {
        if (otherCollider.tag == 1) {
            this.onGround = false
        }
    }

    protected update(dt: number): void {
        if (this.disalogStatus) return
        if (this.kbPressed.left && this.kbPressed.right) return
        if (!this.kbPressed.left && !this.kbPressed.right) return
        // if (this.kbPressed.left) this.node.x -= this.speed_c * dt
        // if (this.kbPressed.right) this.node.x += this.speed_c * dt
        if (this.kbPressed.left)
            this.rigidbody.applyForce(new cc.Vec2(-100 * this.rigidbody.getMass(), 0), this.rigidbody.getLocalCenter(), true);
        if (this.kbPressed.right)
            this.rigidbody.applyForce(new cc.Vec2(100 * this.rigidbody.getMass(), 0), this.rigidbody.getLocalCenter(), true);
    }

    onKeyDown(event: cc.Event.EventKeyboard): void {
        if (this.playerName == "咚咚") {
            switch (event.keyCode) {
                case cc.macro.KEY.a:
                    this.kbPressed.left = true
                    break;
                case cc.macro.KEY.d:
                    this.kbPressed.right = true
                    break;
                case cc.macro.KEY.w:
                    this.kbPressed.up = true
                    if (this.onGround && !this.disalogStatus) {
                        this.rigidbody.applyLinearImpulse(new cc.Vec2(0, this.jumpImpFactor * this.rigidbody.getMass()), this.rigidbody.getLocalCenter(), true);
                        this.audioSource.clip = this.jumpAudio
                        this.audioSource.play()
                    }
                    break
                case cc.macro.KEY.s:
                    this.kbPressed.down = true
                    break
            }
        } else if (this.playerName == "淅淅") {
            switch (event.keyCode) {
                case cc.macro.KEY.j:
                    this.kbPressed.left = true
                    break;
                case cc.macro.KEY.l:
                    this.kbPressed.right = true
                    break;
                case cc.macro.KEY.i:
                    this.kbPressed.up = true
                    if (this.onGround && !this.disalogStatus) {
                        this.rigidbody.applyLinearImpulse(new cc.Vec2(0, this.jumpImpFactor * this.rigidbody.getMass()), this.rigidbody.getLocalCenter(), true);
                        this.audioSource.clip = this.jumpAudio
                        this.audioSource.play()
                    }
                    break
                case cc.macro.KEY.k:
                    this.kbPressed.down = true
                    break
            }
        } else console.warn("玩家名称错误")
    }

    onKeyUp(event: any): void {
        if (this.playerName == "咚咚") {
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
        } else if (this.playerName == "淅淅") {
            switch (event.keyCode) {
                case cc.macro.KEY.j:
                    this.kbPressed.left = false
                case cc.macro.KEY.l:
                    this.kbPressed.right = false
                    break;
                case cc.macro.KEY.i:
                    this.kbPressed.up = false
                    break
                case cc.macro.KEY.k:
                    this.kbPressed.down = false
                    break
            }
        }
    }

    say(text: string) {
        this.dialogBg.active = true
        this.dialogText.string = text
    }

    stopSay() {
        this.dialogBg.active = false
    }
}
