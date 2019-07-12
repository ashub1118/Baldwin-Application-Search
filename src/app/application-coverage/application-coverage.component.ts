import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Select2OptionData} from "ng-select2";
import {BreadCum} from "../bread-cum";
import {HttpClient} from "@angular/common/http";
import {TranslationService} from "../translation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UrlPassService} from "../url-pass.service";
import {SearchPhase} from "../search-phase";
import {PlatformLocation} from "@angular/common";


@Component({
    selector: 'app-application-coverage',
    templateUrl: './application-coverage.component.html',
    styleUrls: ['./application-coverage.component.css'],
    /*providers: [ApplicationCoverageComponent]*/
})
export class ApplicationCoverageComponent implements OnInit {
    public applicationType: Array<Select2OptionData>;
    translationService: TranslationService;
    pageLoadFlag:boolean;
    selectionBreadCum=[];
    data=[];
    pageNumbers=[];
    crossToBaldwinResults= [];
    count:number;
    pages:number;
    start:number;
    currentPage:number;
    row:number;
    totalcount:number;
    accordianData=[];
    selected: string;
    selectedApplicationType;
    SelectedsearchBoxValue;
    paginationOptions=[];
    numFound: number;
    showNotFoundText:boolean = true;
    prev = "PREV";
    next = "NEXT";
    disableNext = false;
    disablePrev = false;
    startPaginationFrom=[];
    applicationCoverageText='Application Coverage';
    applicationTypeText='Application Type';
    searchResultsTextFor='Search results for';
    makeText='Make';
    model='Model';
    year='Year';
    description='Description';
    filter='Filter';
    baldwinNumber='Baldwin Number';
    qualifier='Qualifiers';
    automativeApplicationText='Automotive Applications';
    offHighwayApplicationsText='Off-Highway Applications';
    truckAndBusesApplicationsText='Trucks & Buses Applications';
    placeHolderApplication = 'Select An Application';
    resultPerPage='RESULTS PER PAGE';
    noApplicationFoundText='NO APPLICATION FOUND';
    router: Router;
    route: ActivatedRoute;
    partNumber:string;
    urlToPass:string;
    url: UrlPassService;
    applicationTypeFromService='';
    returnToApplicationSearch='Return to Application Search';
    showNoRecordFound:boolean;
    applicatonNumber:string;
    backButtonClicked: boolean;
    i:number;
    @Input() searchkeyword: SearchPhase;
    doNotCallFalg: boolean;
    accordianClickedFlag:boolean;
   /* accordionTemplate: AccordionTemplate;*/
    @Output() parentPageChanged: EventEmitter<number> =   new EventEmitter();
    @Output() parentrowChanged: EventEmitter<number> =   new EventEmitter();
    constructor(http: HttpClient,translationService: TranslationService,router: Router,route:ActivatedRoute, url: UrlPassService,location: PlatformLocation) {
        this.http=http;
        this.translationService=translationService;
        this.route=route;
        this.router=router;
        this.url=url;
        location.onPopState(() => {
            this.backButtonClicked = true;
            this.applicatonNumber='';

        });
    }
    http: HttpClient;
 //   partNumber: string='N/R';
    applicationTypeToPass: number;
    params={
        'application':'',
         'start':0,
         'row':0,
         'applnNo':''
    };
    ngOnInit() {
        (window as any).$('.my-4.pull-left').html("APPLICATION COVERAGE");
        (window as any).$('.button-set-email').hide();
        window.scroll(0,0);
        this.urlToPass=this.url.getUrl();
        this.i=0;
        this.applicationTypeFromService=this.route.snapshot.queryParamMap.get("application");
        this.selectedApplicationType=this.route.snapshot.queryParamMap.get("application");
        this.placeHolderApplication = this.translationService.getTranslation(this.placeHolderApplication);
        this.applicationCoverageText = this.translationService.getTranslation(this.applicationCoverageText);
        this.applicationTypeText = this.translationService.getTranslation(this.applicationTypeText);
        this.searchResultsTextFor = this.translationService.getTranslation(this.searchResultsTextFor);
        this.makeText = this.translationService.getTranslation(this.makeText);
        this.model = this.translationService.getTranslation(this.model);
        this.year = this.translationService.getTranslation(this.year);
        this.description = this.translationService.getTranslation(this.description);
        this.filter = this.translationService.getTranslation(this.filter);
        this.baldwinNumber = this.translationService.getTranslation(this.baldwinNumber);
        this.qualifier = this.translationService.getTranslation(this.qualifier);
        this.automativeApplicationText = this.translationService.getTranslation(this.automativeApplicationText);
        this.resultPerPage = this.translationService.getTranslation(this.resultPerPage);
        this.returnToApplicationSearch = this.translationService.getTranslation(this.returnToApplicationSearch);
        this.noApplicationFoundText = this.translationService.getTranslation(this.noApplicationFoundText);
        this.partNumber=this.route.snapshot.paramMap.get('partNumber');
        this.paginationOptions=[10,25,50,100];
        this.pageLoadFlag=true;
        this.showNoRecordFound=false;
        this.start=0;
        this.row=25;
        this.doNotCallFalg=true;
        this.accordianClickedFlag=false;
        console.log(this.params);
        this.applicationType = [
            {
                id:'',
                text:''
            },
            {
                id: 'Automotive Applications',
                text: this.automativeApplicationText
            },
            {
                id: 'Off-Highway Applications',
                text: this.offHighwayApplicationsText
            },
            {
                id: 'Trucks & Buses Applications',
                text: this.truckAndBusesApplicationsText
            }
        ];

            this.route.queryParams.subscribe(params => {
                  if( this.pageLoadFlag || this.backButtonClicked){
                        let val = {
                            value: ''
                    };
                    if (params['application'] != null) {
                            this.selectedApplicationType = params['application'];
                            val.value = this.selectedApplicationType;

                    }
                    if(params['start']!=null) {
                        if(params['start']>0) {
                       //     this.searchkeyword.start = parseInt(queryParams['start']) - 1;
                            this.start = params['start'];
                        }else{
                            //this.searchkeyword.start =0;
                            this.start =0;
                        }
                    }
                    if(params['row']!=null) {
                        if(params['row']>=10) {
                            //this.searchkeyword.row = parseInt(queryParams['row']);
                            this.row = params['row'];
                        }else{
                            this.row =25;
                        }
                    }
                    if(params['applnNo']!=null && params['applnNo'].length > 0) {

                            this.applicatonNumber = params['applnNo'];
                         //document.querySelector("#demo"+this.applicatonNumber).classList.add('in');

                    }
                    this.selectedApplicationType = val.value;
                    for(let i=0;i < this.selectionBreadCum.length;i++){
                        if(this.selectionBreadCum[i]['type']=="selectedApplicationType"){
                            if(val.value!="") {
                                this.selectionBreadCum[i]['value']=val.value;
                            }

                        }
                    }
                    this.i++;
                    this.getDataToFillIntoTable(val.value);
               }
            });
    }
    public changeCoverageApplicationType(e: any): void {
        this.row=25;
        this.start=0;
        this.url.setApplicationType('');
        this.doNotCallFalg=true;
        this.selectedApplicationType=e.value;
        this.params.row=this.row;
        this.params.start=this.start;
        this.applicatonNumber='';
        this.params.application=e.value;
       for(let i=0;i < this.selectionBreadCum.length;i++){
           if(this.selectionBreadCum[i]['type']=="selectedApplicationType"){
               if(e.value!="") {
                   this.selectionBreadCum[i]['value']=e.value;
               }

           }
       }
        this.getDataToFillIntoTable(e.value);
    }

    public getDataToFillIntoTable(selected){
        this.doNotCallFalg=false;
        this.pageNumbers=[];
        this.selectionBreadCum=[];
        this.pageLoadFlag=false;
        this.params.start=this.start;
        this.params.row=this.row;
        this.params.applnNo=this.applicatonNumber;
        this.params.application=this.selectedApplicationType;
        this.selectedApplicationType=this.params.application;
        this.selectionBreadCum.push(new BreadCum('Application', this.selectedApplicationType));
        this.selectionBreadCum.push(new BreadCum('partNumber', this.partNumber));
        if(this.selectedApplicationType=='Automotive Applications'){
            this.applicationTypeToPass=1;
        }else if(this.selectedApplicationType=='Off-Highway Applications'){
            this.applicationTypeToPass=2;
        }else if(this.selectedApplicationType=='Trucks & Buses Applications'){
            this.applicationTypeToPass=3;
        }
        (document.querySelector("#preloader") as HTMLElement).style.display = 'block';
        (document.querySelector("#preloader") as HTMLElement).style.top = (window as any).$('section#g3_homePage').offset().top;
        let url=(window as any).searchURL+"?q={!join from=applnNo_s to=applnNo_s}coreName_s:ApplicationPartsData AND bPartnumber_s:"+'"'+this.partNumber+'"'+"&fq=coreName_s:ApplicationData AND vehicleRef_s:"+this.applicationTypeToPass+"&sort=manufacturer_s asc,make_s asc,model_s asc,description_s,porder_si,porderNo_s asc&start="+this.start+"&rows="+this.row+"&fl=year_s,make_s,model_s,description_s,porder_si,porderNo_s,applnNo_s&wt=json&omitHeader=true";
        this.http.get(url).subscribe(
            data => {
              //  console.log(data['response']['docs']);
                this.router.navigate(['/coverage/'+this.partNumber],{queryParams:(this.params)});
                this.data=data['response']['docs'];
                this.crossToBaldwinResults = data['response']['docs'];
                this.numFound= data['response']['numFound'];
                this.totalcount=this.numFound;
                this.currentPage=Math.floor((this.start/this.row)+1 );
                (document.querySelector("#preloader") as HTMLElement).style.display = 'none';
                (window as any).openAccordian(this.applicatonNumber);
                 if(this.applicatonNumber!=null && this.applicatonNumber.length > 0) {
                     this.accordianClicked(event, this.applicatonNumber);
                 }

            }


        );


    }
    rowChangeEvent(row) {
        this.doNotCallFalg=false;
        this.applicatonNumber='';
        this.backButtonClicked = false;
      //  console.log(row);
        this.row=row;
        this.start=0;
      //  this.parentrowChanged.emit(row);
        this.getDataToFillIntoTable(this.params.application);
    }
    pageChanged(pageno){
        this.doNotCallFalg=false;
        this.applicatonNumber='';
        this.backButtonClicked = false;
      //  console.log(pageno);
        this.start = (pageno - 1)*this.row;
      //  this.currentPage=pageno;
        this.getDataToFillIntoTable(this.params.application);
        //sconsole.log(this.startPaginationFrom);
        //this.parentPageChanged.emit(pageno-1);
    }
    removeBreadcum(selectedremoveBreacum: BreadCum){
        let i=0;
        for(let i=0;i<this.selectionBreadCum.length;i++){
            if(this.selectionBreadCum[i]==selectedremoveBreacum){
                this.selectionBreadCum.length = i;
            }
        }

        this.selectedApplicationType='';
        this.SelectedsearchBoxValue='';

        for(let i=0;i<this.selectionBreadCum.length;i++){
            let type=this.selectionBreadCum[i].type;
            switch(type) {
                case 'selectedApplicationType':
                    this.selectedApplicationType = this.selectionBreadCum[i].value;
                    this.applicationType=[];
                    break;
                case 'SelectedsearchBoxValue':
                    this.SelectedsearchBoxValue = this.selectionBreadCum[i].value;
                    break;
            }
        }
    }

    checkUrl(partNumber){
        if(partNumber=='N/R' || partNumber=='N/S' || partNumber=="MT" || partNumber=="M.T." || partNumber=="CLN&R"){
            return false;
        }else{
            return true;
        }
    }

    accordianClicked(event,applicatonNumber) {
        // console.log((document.querySelector('#accordion'this.applicatonNumber'') as HTMLElement));
        this.backButtonClicked=false;
       this.params.applnNo=applicatonNumber;
        this.router.navigate(['/coverage/'+this.partNumber],{queryParams:(this.params)});
       this.applicatonNumber=applicatonNumber;
        (window as any).accordianClickedEvent( event,this.applicatonNumber);
        this.accordianData = [];
        // if(document.querySelector("#accordian"+this.applicatonNumber).classList.contains('active')==true){
        try {
            console.log(document.getElementById('accordian' + applicatonNumber).classList.contains('active'));
            if(document.getElementById('accordian' + applicatonNumber).classList.contains('active')==false){
                return;
            }
        }catch(e){
            //  console.log(e);
        }
        let url = (window as any).searchURL + "?q=applnNo_s:" + this.applicatonNumber + "&fq=coreName_s:ApplicationPartsData AND vehicleRef_s:" + this.applicationTypeToPass + "&sort=seqNumber_si,fldNumber_si,bPartnumber_s asc&fl=partPrompt_si,bPartnumber_s,notes_si&wt=json&omitHeader=true";
        this.http.get(url).subscribe(
            data => {
                this.accordianData = data['response']['docs'];
                this.accordianClickedFlag=false;
            }
        );
    }

    returnToApplicationMethod(){
        (window as any).location.replace(this.urlToPass);
    }

}
