import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TranslationService} from "../translation.service";
import {SearchPhase} from "../search-phase";
import {SaveSearchKeywordService} from "../save-search-keyword.service";


@Component({
    selector: 'app-application-ref-pagination',
    templateUrl: './application-ref-pagination.component.html',
    styleUrls: ['./application-ref-pagination.component.css']
})
export class ApplicationRefPaginationComponent implements OnInit {
    @Input() totalcount;
    @Input() currentPage;
    @Input() count;
    @Output() pageChanged: EventEmitter<number> =   new EventEmitter();
    @Output() rowChanged: EventEmitter<number> =   new EventEmitter();
    disableNext = false;
    disablePrev = false;
    router: Router;
    route: ActivatedRoute;
    resultPerPage = "RESULTS PER PAGE";
    prev = "PREV";
    next = "NEXT";
    startPaginationFrom = [];
    paginationOptions ;
    sub: any;
    i:number;
    @Input() crossrefresult;
    translationService: TranslationService;
    searchkeyword: SaveSearchKeywordService;
    constructor(router: Router ,route: ActivatedRoute,translationService:TranslationService,searchkeyword:SaveSearchKeywordService) {
        this.router=router;
        this.route=route;
        this.translationService=translationService;
        this.searchkeyword=searchkeyword;

    }

    ngOnChanges(changes: SimpleChanges) {
        this.i=this.i+1;
        console.log(changes);
        if( changes.currentPage !== undefined){
            this.currentPage = changes.currentPage.currentValue;
        }
        if( changes.totalcount !== undefined){
            this.totalcount = changes.totalcount.currentValue;
        }
            this.callPagination();
    }

    callPagination(){
        this.resultPerPage = this.translationService.getTranslation(this.resultPerPage);
        this.prev = this.translationService.getTranslation(this.prev);
        this.next = this.translationService.getTranslation(this.next);

        let mod = this.totalcount % this.count;

        let quats  = Math.floor((this.totalcount / this.count))


        if(mod > 0){
            quats = quats + 1;
        }
        this.startPaginationFrom = [];
        this.paginationOptions = [10, 25 , 50, 100];
        console.log('this.totalcount '+this.totalcount);
        console.log('this.count '+this.count);
        console.log('this.currentPage '+this.currentPage);
        if ( this.totalcount <= (this.currentPage * this.count)) {
            this.disableNext = true;
        }
        else {
            this.disableNext = false;
        }

        if ( this.currentPage == 1) {

            this.disablePrev = true;
        }
        else {
            this.disablePrev = false;
        }


        console.log('quats '+quats);
        console.log('this.currentPage '+this.currentPage);
        let startPaginationNo = this.currentPage ;
        if ( quats == this.currentPage) {
            startPaginationNo = this.currentPage - 2 ;
        }

        if ( ( quats - this.currentPage ) > 0 ) {
            startPaginationNo = this.currentPage - 1 ;
        }

        if(this.currentPage == 1) {
            startPaginationNo = this.currentPage;
        }

        if(startPaginationNo <=0) {
            startPaginationNo = 1
        }
        console.log('startPaginationNo '+startPaginationNo);
        for ( let i = startPaginationNo; i <= startPaginationNo + 2 && i<=quats;i ++ ) {


            this.startPaginationFrom.push(i);
            if((i*this.count)>this.totalcount) {
                break;
            }
        }
    }
    goToPage(pageNo, event){
        // debugger;
        if(event.currentTarget.getAttribute('class').indexOf('disabled')==-1) {
          //
            this.searchkeyword.setStart(pageNo);
            this.searchkeyword.setRow(this.count);
            this.pageChanged.emit(pageNo);
         //   this.router.navigate([''],{params:JSON.parse(JSON.stringify(this.searchkeyword))});
        }
    }

    rowChangedEvent(event) {
       this.searchkeyword.setStart(1);
        this.searchkeyword.setRow(event.target.value);
        this.rowChanged.emit(event.target.value);
        /*
       this.router.navigate([''],{queryParams:JSON.parse(JSON.stringify(this.searchkeyword))});*/

    }
    ngOnInit() {
      console.log('current page:'+this.currentPage);
      this.i=0;
       /* this.sub = this.route.queryParams.subscribe(params => {

            console.log('params '+params );
            if(params['pageno']!=null) {
                this.pageChanged.emit(params['pageno']);
            }

            if(params['count']!=null) {
                this.rowChanged.emit(params['count']);
            }
        });*/
     //   this.callPagination();

    }
}
