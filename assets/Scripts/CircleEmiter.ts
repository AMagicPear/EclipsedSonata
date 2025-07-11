import { keyMap } from "./HitManager";
import { testScore, ScoreNote, Score } from "./util/scoreTranslator";
const { ccclass, property } = cc._decorator;

@ccclass
export default class CircleEmiter extends cc.Component {
    @property({ type: cc.Prefab })
    circleSprite: cc.Prefab = null

    @property(cc.Float)
    rorateSpeed: number = 10

    @property(cc.Label)
    testHitLabel: cc.Label = null

    @property(cc.AudioSource)
    audioSource: cc.AudioSource = null

    circles: { noteIndex: number, insAngle: number, node: cc.Node }[] = []
    drumsToDraw: ScoreNote[] = []
    incomingIndex: number = 0
    judgeIndex: number = 0

    @property(cc.Float)
    notesAheadTime: number = 5
    // elaspedTime: number = 0

    protected onLoad(): void {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    protected start(): void {
        // this.testHitLabel.enabled = false
        this.loadScore(testScore)
        // this.elaspedTime = 0
        this.incomingIndex = 0
        console.log(this.drumsToDraw)
        this.audioSource.play()
    }

    protected update(dt: number): void {
        // this.elaspedTime += dt
        this.node.angle -= this.rorateSpeed * dt    // 以rorateSpeed转动
        if (this.incomingIndex != undefined
            && this.incomingIndex < this.drumsToDraw.length
            && this.audioSource.getCurrentTime() > this.drumsToDraw[this.incomingIndex].startTime - this.notesAheadTime) {
            let newCircle = cc.instantiate(this.circleSprite)
            this.node.addChild(newCircle)
            newCircle.setRotation(this.node.angle)
            this.circles.push({
                noteIndex: this.incomingIndex,
                insAngle: this.node.angle,
                node: newCircle
            })
            this.scheduleOnce(() => {
                newCircle.destroy()
            }, this.notesAheadTime + 3)
            // this.scheduleOnce()
            // console.log("当前曲谱下标", this.incomingIndex)
            // console.log(this.circles)
            this.incomingIndex += 1
        }
    }

    private loadScore(score: Score) {
        this.drumsToDraw = score.drums
        console.log(`已加载曲谱，共${this.drumsToDraw.length}个音符`)
    }

    private onKeyDown(event: cc.Event.EventKeyboard) {
        if(!this.drumsToDraw[this.judgeIndex]) return
        const [playerName, noteIndex] = keyMap[event.keyCode]
        if (Math.abs(this.audioSource.getCurrentTime() - this.drumsToDraw[this.judgeIndex].startTime - 2) < 0.2 
            && this.drumsToDraw[this.judgeIndex].note == noteIndex) {
            this.testHitLabel.string = "hit"
            this.circles.find(circle => circle.noteIndex == this.judgeIndex).node.color = new cc.Color(255, 0, 0, 255)
            this.judgeIndex += 1
        }
        else {
            this.testHitLabel.string = "miss"
        }
    }
}
