// type NoteDong = 'E' | 'R' | 'Q' | 'F'

type NoteXi = 'U' | 'O' | 'P' | 'H'

const CircleSpeedFromNoteXi: Record<NoteXi, number> = {
    'U': 1,
    'O': 1,
    'P': 1,
    'H': 1,
}

export interface ScoreNote {
    startTime: number,  // 起始小节号
    // duration: number,   // 持续节拍数
    note: number,     // 音符
}

export interface Score {
    name: string,   // 曲谱名称
    bpm: number,    // 每分钟节拍数
    drums: ScoreNote[], // 音符
}

export let testScore: Score = {
    name: 'testscore',
    bpm: 60,
    drums: [{
        startTime: 5,
        note: 0
    }, {
        startTime: 6,
        note: 0
    }, {
        startTime: 8,
        note: 0
    },{
        startTime: 9,
        note: 0
    }, {
        startTime: 10,
        note: 0
    }, {
        startTime: 12,
        note: 0
    }, {
        startTime: 13,
        note: 0
    }, {
        startTime: 14,
        note: 0
    }, {
        startTime: 15,
        note: 0
    }, {
        startTime: 16,
        note: 0
    }, {
        startTime: 17,
        note: 0
    }, {
        startTime: 18,
        note: 0
    }
    ]
}