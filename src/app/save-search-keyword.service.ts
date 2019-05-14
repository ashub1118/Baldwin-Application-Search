import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class SaveSearchKeywordService {
    getPhase(): string {
        return this.phase;
    }

    setPhase(value: string) {
        this.phase = value;
    }

    getRow(): number {
        return this.row;
    }

    setRow(value: number) {
        this.row = value;
    }

    getStart(): number {
        return this.start;
    }

    setStart(value: number) {
        this.start = value;
    }

    private phase: string;
    private row;
    private start;

    constructor() { }


}
