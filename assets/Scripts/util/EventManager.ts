import { PlayerName } from "../Player"

export class EventEmitter<T> {
    private name: string
    private actions: ((arg: T) => void)[] = []
    subscribe(callback: (arg: T) => void): void {
        this.actions.push(callback)
    }

    unsubscribe(callback: (arg: T) => void): void {
        this.actions = this.actions.filter(action => action !== callback)
    }

    invoke(arg: T): void {
        console.log("event triggerred:", this.name, arg)
        this.actions.forEach(action => action(arg))
    }

    constructor(name: string) {
        this.name = name
    }
}

export const dialogShowEvent: EventEmitter<boolean> = new EventEmitter<boolean>('dialogShow')

export const gainNoteEvent: EventEmitter<[PlayerName, number]> = new EventEmitter<[PlayerName, number]>('gainNote')