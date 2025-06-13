type NoteDong = 'E' | 'R' | 'Q' | 'F'

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
    note: NoteDong,     // 音符
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
        note: 'E'
    }, {
        startTime: 6,
        note: 'E'
    }, {
        startTime: 8,
        note: 'E'
    },{
        startTime: 9,
        note: 'E'
    }, {
        startTime: 10,
        note: 'E'
    }, {
        startTime: 12,
        note: 'E'
    }, {
        startTime: 13,
        note: 'E'
    }, {
        startTime: 14,
        note: 'E'
    }, {
        startTime: 15,
        note: 'E'
    }, {
        startTime: 16,
        note: 'E'
    }, {
        startTime: 17,
        note: 'E'
    }, {
        startTime: 18,
        note: 'E'
    }
    ]
}