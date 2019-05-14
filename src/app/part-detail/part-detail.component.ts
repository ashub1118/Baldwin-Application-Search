import { Component, OnInit } from '@angular/core';
import {PartDetailService} from "../part-detail.service";
import {ActivatedRoute} from "@angular/router";
import {TranslationService} from "../translation.service";
import {UrlPassService} from "../url-pass.service";


@Component({
    selector: 'app-part-detail',
    templateUrl: './part-detail.component.html',
    styleUrls: ['./part-detail.component.css']
})
export class PartDetailComponent implements OnInit {

    partDetailService: PartDetailService;
     translation: TranslationService;
    desc: string;
    contains: string;
    fits: string;
    replace: string;
    applicationTypeFromService:UrlPassService;
    od: string;
    od1mm: string;
    id: string;
    length: string;
    fgskt: string;
    ogskt: string;
    endseals: string;
    grommets: string;
    upc: string;
    imageScr: string;
    notes: string;
    fitsInside: string;
    useWith: string;
    size: string;
    thread: string;
    inlet: string;
    outlet: string;
    agskt: string;
    igskt: string;
    oring: string;
    spring: string;
    panGasket: string;
    realtedTo: string;
    backToResult = 'Back to results';
    clickForLargerView = 'Click for Larger View';
    notesTilte = 'Notes';
    fitsInsideTilte = 'Fits_Inside';
    useWithTilte = 'Use_With';
    containsTilte = 'Contains';
    fitsTilte = 'Fits';
    replacesTilte = 'Replaces';
    sizeTilte = 'Size';
    threadTilte = 'Thread';
    inletTilte = 'Inlet';
    outletTilte = 'Outlet';
    lengthTilte = 'Length';
    endSealsTilte = 'End Seals';
    grommetsTilte = 'Grommets';
    springTilte = 'Spring';
    panGasketTilte = 'Pan Gasket';
    relatedToTilte = 'Related to';
    wtbTilte = 'Where To Buy';
    applicationCoverageTilte = 'Application Coverage';
    showBackButton = true;
    partNumber: string;
    wtbURL: string;
    appType:string;
    constructor(partDetailService: PartDetailService, private route: ActivatedRoute , translation: TranslationService,applicationTypeFromService: UrlPassService) {
        this.partDetailService = partDetailService;
        this.translation = translation;


    }

    ngOnInit() {
        let via = this.route.snapshot.queryParamMap.get("via");
        console.log(via);
        if(via!==undefined && via=='email'){
            this.showBackButton = false;
        }
        this.backToResult = this.translation.getTranslation(this.backToResult);
        this.clickForLargerView = this.translation.getTranslation(this.clickForLargerView);
        this.notesTilte = this.translation.getTranslation(this.notesTilte);
        this.fitsInsideTilte = this.translation.getTranslation(this.fitsInsideTilte);
        this.useWithTilte = this.translation.getTranslation(this.useWithTilte);
        this.containsTilte = this.translation.getTranslation(this.containsTilte);
        this.fitsTilte = this.translation.getTranslation(this.fitsTilte);
        this.replacesTilte = this.translation.getTranslation(this.replacesTilte);
        this.sizeTilte = this.translation.getTranslation(this.sizeTilte);
        this.threadTilte = this.translation.getTranslation(this.threadTilte);
        this.inletTilte = this.translation.getTranslation(this.inletTilte);
        this.outletTilte = this.translation.getTranslation(this.outletTilte);
        this.lengthTilte = this.translation.getTranslation(this.lengthTilte);
        this.endSealsTilte = this.translation.getTranslation(this.endSealsTilte);
        this.grommetsTilte = this.translation.getTranslation(this.grommetsTilte);
        this.springTilte = this.translation.getTranslation(this.springTilte);
        this.panGasketTilte = this.translation.getTranslation(this.panGasketTilte);
        this.relatedToTilte = this.translation.getTranslation(this.relatedToTilte);
        this.wtbTilte = this.translation.getTranslation(this.wtbTilte);
        this.wtbURL=(window as any).whereToBuyUrl;

        console.log(this.route.snapshot.queryParamMap.get("application"));
        this.appType = this.route.snapshot.queryParamMap.get("application");



        let partNo = this.route.snapshot.paramMap.get('id');
        this.partNumber=this.route.snapshot.paramMap.get('id');

        (window as any).$('.my-4.pull-left').html(partNo);
        (window as any).$('.button-set-email').show();

        this.partDetailService.getPartDetail(partNo)
            .subscribe(data => {
                console.log(data);
                if(data["response"]!=null){
                    let doc = data["response"]["docs"][0];
                    if(doc["description_si"]!=null && doc["description_si"].length>0 ) {
                        this.desc = doc["description_si"];
                    }
                    if(doc["contain_si"]!=null && doc["contain_si"].length>0 ) {
                        this.contains = doc["contain_si"];
                    }
                    if(doc["fits_si"]!=null && doc["fits_si"].length>0  ) {
                        this.fits = doc["fits_si"];
                    }
                    if(doc["replaces_si"]!=null && doc["replaces_si"].length>0  ) {
                        this.replace = doc["replaces_si"];
                    }

                    if(doc["OD1_si"]!=null && doc["OD1_si"].length>0  ) {
                        this.od = doc["OD1_si"];

                        if(doc["od1mm_si"]!=null && doc["od1mm_si"].length>0 ) {
                            this.od = this.od + ' ('+doc["od1mm_si"]+')';
                        }
                        if(doc["rem1_si"]!=null && doc["rem1_si"].length>0 ) {
                            this.od = this.od + ' '+doc["rem1_si"];
                        }
                    }
                    if(doc["OD2_si"]!=null && doc["OD2_si"].length>0 ) {
                        this.od = this.od + ' '+doc["OD2_si"];
                    }
                    if(doc["od2mm_si"]!=null && doc["od2mm_si"].length>0 ) {
                        this.od = this.od + ' ('+doc["od2mm_si"]+')';
                    }


                    if(doc["ID1_si"]!=null && doc["ID1_si"].length>0) {
                        this.id = doc["ID1_si"];

                        if(doc["id1mm_si"]!=null && doc["id1mm_si"].length>0) {
                            this.id = this.id +' ('+ doc["id1mm_si"]+')';
                        }

                        if(doc["rem2_si"]!=null && doc["rem2_si"].length>0) {
                            this.id = this.id + ' ' +doc["rem2_si"];
                        }
                    }
                    console.log('this.id '+this.id);
                    if(doc["ID2_si"]!=null && doc["ID2_si"].length>0) {
                        if( this.id != null) {

                            this.id = this.id + '  ' + doc["ID2_si"];
                        }else{
                            console.log('this.id 2');
                            this.id = doc["ID2_si"];
                        }
                        if(doc["id2mm_si"]!=null && doc["id2mm_si"].length>0) {
                            this.id = this.id +' ('+ doc["id2mm_si"]+')';
                        }
                    }

                    console.log('this.id '+this.id);

                    if(doc["length_si"]!=null && doc["length_si"].length>0){
                        this.length = doc["length_si"];
                        if(doc["lengthmm_si"]!=null && doc["lengthmm_si"].length>0) {
                            this.length = this.length +' ('+ doc["lengthmm_si"]+')';
                        }
                    }

                    if(doc["fGskt_si"]!=null && doc["fGskt_si"].length>0) {
                        this.fgskt = doc["fGskt_si"];
                    }

                    if(doc["fGskt_si"]!=null && doc["fGskt_si"].length>0) {
                        this.fgskt = doc["fGskt_si"];
                    }

                    if(doc["oGskt_si"]!=null && doc["oGskt_si"].length>0) {
                        this.ogskt = doc["oGskt_si"];
                    }
                    if(doc["endSeals_si"]!=null && doc["endSeals_si"].length>0) {
                        this.endseals = doc["endSeals_si"];
                    }
                    if(doc["grommets_si"]!=null && doc["grommets_si"].length>0) {
                        this.grommets = doc["grommets_si"];
                    }
                    if(doc["UPC_si"]!=null && doc["UPC_si"].length>0) {
                        this.upc = doc["UPC_si"];
                    }
                    if(doc["partImage_si"]!=null && doc["partImage_si"].length>0) {
                        this.imageScr = doc["partImage_si"];
                    }

                    if(doc["notes_si"]!=null && doc["notes_si"].length>0) {
                        this.notes = doc["notes_si"];
                    }

                    if(doc["fitsInside_si"]!=null && doc["fitsInside_si"].length>0) {
                        this.fitsInside = doc["fitsInside_si"];
                    }
                    if(doc["useWith_si"]!=null && doc["useWith_si"].length>0) {
                        this.useWith = doc["useWith_si"];
                    }

                    if(doc["size_si"]!=null && doc["size_si"].length>0) {
                        this.size = doc["size_si"];
                        if(doc["sizemm_si"]!=null && doc["sizemm_si"].length>0) {
                            this.size = this.size +'('+doc["sizemm_si"]+')';
                        }
                    }

                    if(doc["thread_si"]!=null && doc["thread_si"].length>0) {
                        this.thread = doc["thread_si"];
                        if(doc["perInch_si"]!=null && doc["perInch_si"].length>0) {
                            this.thread = this.thread +'-'+doc["perInch_si"];
                        }
                    }
                    if(doc["inlet_si"]!=null && doc["inlet_si"].length>0) {
                        this.inlet = doc["inlet_si"];
                    }
                    if(doc["outlet_si"]!=null && doc["outlet_si"].length>0) {
                        this.outlet = doc["outlet_si"];
                    }
                    if(doc["aGskt_si"]!=null && doc["aGskt_si"].length>0) {
                        this.agskt = doc["aGskt_si"];
                    }
                    if(doc["iGskt_si"]!=null && doc["iGskt_si"].length>0) {
                        this.igskt = doc["iGskt_si"];
                    }
                    if(doc["oRing_si"]!=null && doc["oRing_si"].length>0) {
                        this.oring = doc["oRing_si"];
                    }
                    if(doc["spring_si"]!=null && doc["spring_si"].length>0) {
                        this.spring = doc["spring_si"];
                    }
                    if(doc["panGasket_si"]!=null && doc["panGasket_si"].length>0) {
                        this.panGasket = doc["panGasket_si"];
                    }
                    if(doc["relatedTo_si"]!=null && doc["relatedTo_si"].length>0) {
                        this.realtedTo = doc["relatedTo_si"];
                    }
                    (window as any).$('a[data-rel^=lightcase]').lightcase();


                    (window as any).$('#productNameH3').html(doc["baldwinPartId_s"]);
                    (window as any).$('#productName').val(doc["baldwinPartId_s"]);
                    (window as any).$('#productURL').val(location.href+'?via=email');
                    (window as any).$('.product-img img').attr('src','http:'+doc["partImage_si"]);
                    (window as any).$('.product .product-info p').html(doc["description_si"]);
                }
            });
    }

    backToSearchResult(){
        (window as any).history.back();
    }

    openWTBPopUp(){
        console.log(this.wtbURL);
        window.open(this.wtbURL,'Where To Buy','width=1050,height=600');
    }
}
