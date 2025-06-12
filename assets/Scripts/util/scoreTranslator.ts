type NoteDong = 'E' | 'R' | 'Q' | 'F'

type NoteXi = 'U' | 'O' | 'P' | 'H'

const CircleSpeedFromNoteXi: Record<NoteXi, number> = {
    'U': 1,
    'O': 1,
    'P': 1,
    'H': 1,
}

interface ScoreNote {
    startTime: number,  // 起始小节号
    duration: number,   // 持续节拍数
    note: NoteDong,     // 音符
}

interface Score {
    name: string,   // 曲谱名称
    bpm: number,    // 每分钟节拍数
    drums: ScoreNote[],
}

let testScore: Score = {
    name: 'testscore',
    bpm: 90,
    drums: [{
        startTime: 0,
        duration: 1,
        note: 'E'
    }, {
        startTime: 1,
        duration: 1,
        note: 'E'
    }]
}