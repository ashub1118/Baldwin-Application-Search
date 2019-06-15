import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class UrlPassService {
    getUrl() {
        return this.url;
    }

    setUrl(value) {
        this.url = value;
    }
   private url;
    private applicationType;
    getApplicationType() {
        return this.applicationType;
    }

    setApplicationType(value) {
        this.applicationType = value;
    }


    constructor() { }


}
