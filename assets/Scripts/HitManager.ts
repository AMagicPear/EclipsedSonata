import { PlayerName } from "./Player";
import { gainNoteEvent, playNoteEvent } from "./util/EventManager";

const { ccclass, property } = cc._decorator;
// const DongNotes = ['e', 'r', 'q', 'f']
// const XiNotes = ['u', 'o', 'p', 'h']
export const keyMap: Record<number, [PlayerName, number]> = {
    [cc.macro.KEY.e]: ['咚咚', 0],
    [cc.macro.KEY.r]: ['咚咚', 1],
    [cc.macro.KEY.q]: ['咚咚', 2],
    [cc.macro.KEY.f]: ['咚咚', 3],
    [cc.macro.KEY.u]: ['淅淅', 0],
    [cc.macro.KEY.o]: ['淅淅', 1],
    [cc.macro.KEY.p]: ['淅淅', 2],
    [cc.macro.KEY.h]: ['淅淅', 3],
};
@ccclass
export default class HitManager extends cc.Component {
    @property([cc.Node])
    dongNotesUI: cc.Node[] = []

    @property([cc.Node])
    xiNotesUI: cc.Node[] = []

    dongNotesState: boolean[] = new Array(3).fill(false)
    xiNotesState: boolean[] = new Array(4).fill(false)

    notesAll: Record<PlayerName, { states: boolean[], UI: cc.Node[] }>

    @property(cc.Boolean)
    fullMode: boolean = false

    protected onLoad(): void {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.notesAll = {
            '咚咚': {
                states: this.dongNotesState,
                UI: this.dongNotesUI
            },
            '淅淅': {
                states: this.xiNotesState,
                UI: this.xiNotesUI
            }
        }
        gainNoteEvent.subscribe(([playerName, index]) => {
            if (playerName == '咚咚') {
                this.dongNotesState[index] = true
                this.dongNotesUI[index].opacity = 255
            } else if (playerName == '淅淅') {
                this.xiNotesState[index] = true
                this.dongNotesUI[index].opacity = 255
            }
        })
        playNoteEvent.subscribe(([playerName, index]) => {
            this.notesAll[playerName].UI[index].opacity = 100
            this.scheduleOnce(() => this.notesAll[playerName].UI[index].opacity = 255, 0.1)
        })
    }

    protected start(): void {
        if (!this.fullMode) { this.notesAll.淅淅.states[0] = true }
        else {
            for (let i = 0; i < this.dongNotesUI.length; i++) {
                gainNoteEvent.invoke(['咚咚', i])
            }
            for (let i = 0; i < this.xiNotesUI.length; i++) {
                gainNoteEvent.invoke(['淅淅', i])
            }
        }
    }



    onKeyDown(event: cc.Event.EventKeyboard) {
        const noteInfo = keyMap[event.keyCode];
        if (noteInfo) {
            const [playerName, index] = noteInfo;
            const stateArray = this.notesAll[playerName].states;
            if (stateArray[index]) {
                playNoteEvent.invoke(noteInfo);
            }
        }
    }
}
