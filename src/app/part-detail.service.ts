import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PartDetailService {

    http: HttpClient;
    //url = (window as any).searchDomain+'/solr/BaldwinECatalog/select?fq=coreName_s%3ABaldwinPartData&wt=json&indent=true&facet=true&facet.field=coreName_s';
    constructor(http: HttpClient) {
        this.http = http;
    }

    getPartDetail(partNo) {
        let url = (window as any).searchDomain+'/solr/BaldwinECatalog/select?fq=coreName_s%3ABaldwinPartData&wt=json&indent=true&facet=true&facet.field=coreName_s';
        url = url + '&' + 'q=baldwinPartId_s:' + '"'+partNo+'"';
        console.log(url);
        return this.http.get(url);
    }
}
