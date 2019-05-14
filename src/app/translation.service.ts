import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class TranslationService {

    translations: any;
    constructor() {
        this.translations = (window as any).translations;
    }
    getTranslation(trans) {
        if(this.translations[trans]!=null) {
            return this.translations[trans]
        }else{
            return trans;
        }
    }
}
