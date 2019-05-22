    import { Component, OnInit } from '@angular/core';
    import {Select2OptionData} from "ng-select2";
    import {BreadCum} from "../bread-cum";
    import {HttpClient} from "@angular/common/http";
    import {debug} from "util";
    import {ActivatedRoute, Router} from "@angular/router";
    import {TranslationService} from "../translation.service";
    import {UrlPassService} from "../url-pass.service";
    import {FormControl, FormGroup, Validators} from "@angular/forms";
    @Component({
      selector: 'app-application-search',
      templateUrl: './application-search.component.html',
      styleUrls: ['./application-search.component.css']
    })
    export class ApplicationSearchComponent implements OnInit {
        yearFlag: boolean=true;
        requestFromModalWindow:boolean;
        yearFlagModel: boolean = true;
        manufacturerFlagModel: boolean = false;
        makeFlagModel: boolean = true;
        modelFlagModel: boolean = true;
        equipmentTypeFlagModel: boolean = false;
        engineFlagModel: boolean = true;
        make: boolean=true;
        yearList = [];
        model: boolean=true;
        selectedYear='';
        manufactureList = [];
        makerList = [];
        selectedMaker='';
        modelList =[];
        selectedModel='';
        engineList = [];
        selectedEngin='';
        equipmentTypeList = [];
        selectedEquipment='';
        selectionBreadCum = [];
        selectedApplicationType;
        public manufacturer: boolean=false;
        public equipmentType: boolean=false;
        public engine: boolean=true;
        public selected: string;
        selectedManufacture='';
        applicationTypeModel= [];
        yearListModel = [];
        manufactureListModel = [];
        makerListModel = [];
        equipmentTypeListModel = [];
        modelListModel = [];
        engineListModel = [];
        http: HttpClient;
        selectedApplicationTypeModel;
        selectedYearModel;
        selectedManufactureModel;
        selectedMakerModel;
        selectedEquipmentModel;
        selectedModelModel;
        selectedEnginModel;
        popUpSubmitButtonDisabled = true;
        selectedApplication;
        applicationTypeOption =[];
        yearOption = [];
        selectedAppId;
        productPartResults=[];
        router: Router;
        route: ActivatedRoute;
        ShowPopUpFlag:boolean=true;
        translationService: TranslationService;
        applicationSearch:string='Application Search';
        applicationTypeText:string='Application Type';
        year:string='Year';
        manufacturerText:string='Manufacturer';
        makeText:string='Make (Optional)';
        equipmentText:string='Equipment Type (Optional)';
        modelText='Model';
        engineText='Engine';
        filterText='Filter';
        baldwinNumberText='Baldwin Number';
        qualifiersText='Qualifiers';
        placeHolderYear='Select Year';
        placeHolderManufacture='Select Manufacture';
        placeHolderMaker='Select Make';
        placeHolderModel='Select Model';
        placeHolderEngine='Select Engine';
        placeHolderEquipment='Select Equipment';
        placeHolderApplication='Select An Application';
        automativeApplicationsText='Automotive Applications';
        offHighwayApplicationsText='Off-Highway Applications';
        truckAndBusesText='Trucks & Buses Applications';
        pageLoadFlag:boolean;
        selectedEngineText:string;
       subsEvent:boolean;
       url: UrlPassService;
        totalcount;
        isSubmitted = false;
        contactSubmitted = 'Contact Information posted successfully';
        sorryLabel = 'Parts Information Not Available';
        detailLabel = 'Please provide us with more detail to further assist you:';
        fnameLabel = 'First Name';
        lnameLabel = 'Last Name';
        emailLabel = 'E-Mail';
        phoneLabel = 'Phone Number';
        additionalInfoLabel = 'Additional Application Information';
        submitLabel = 'Submit';
        searchLabel='Search';
        invalidFirstNameText='Please enter a valid First Name';
        invalidLastNameText='Please enter a valid Last Name';
        EmailInvalidText='Please enter a valid email address';
        phoneInvalidText='Please enter a valid phone number';
        lostSalesUrl: string;
        groupId = null;
        lostSalesContactUrl: string;
        params={
            'application':'',
            'year':'',
            'make':'',
            'model':'',
            'engine':'',
            'equipment':'',
            'manufacturer':'',
        };
        parameters=[];
      constructor(http: HttpClient,router: Router,route: ActivatedRoute,translationService: TranslationService, url: UrlPassService) {
          this.http = http;
          this.router=router;
          this.route=route;
          this.translationService = translationService;
          this.url= url;
      }
        public applicationType: Array<Select2OptionData>;
        public value: string[];
        public current: string;

      ngOnInit() {
         // this.getYearList();
          (window as any).$('.my-4.pull-left').html("APPLICATION SEARCH");
          (window as any).$('.button-set-email').hide();
          this.subsEvent=true;
          this.requestFromModalWindow=false;
          this.pageLoadFlag = true;
          this.placeHolderApplication = this.translationService.getTranslation(this.placeHolderApplication);
          this.placeHolderYear = this.translationService.getTranslation(this.placeHolderYear);
          this.placeHolderManufacture = this.translationService.getTranslation(this.placeHolderManufacture);
          this.placeHolderMaker = this.translationService.getTranslation(this.placeHolderMaker);
          this.placeHolderModel = this.translationService.getTranslation(this.placeHolderModel);
          this.placeHolderEngine =this.translationService.getTranslation(this.placeHolderEngine);
          this.placeHolderEquipment = this.translationService.getTranslation(this.placeHolderEquipment);
          this.applicationSearch= this.translationService.getTranslation(this.applicationSearch);
          this.applicationTypeText= this.translationService.getTranslation(this.applicationTypeText);
          this.year= this.translationService.getTranslation(this.year);
          this.manufacturerText= this.translationService.getTranslation(this.manufacturerText);
          this.makeText= this.translationService.getTranslation(this.makeText);
          this.equipmentText= this.translationService.getTranslation(this.equipmentText);
          this.modelText= this.translationService.getTranslation(this.modelText);
          this.engineText= this.translationService.getTranslation(this.engineText);
          this.filterText= this.translationService.getTranslation(this.filterText);
          this.baldwinNumberText= this.translationService.getTranslation(this.baldwinNumberText);
          this.qualifiersText= this.translationService.getTranslation(this.qualifiersText);
          this.automativeApplicationsText= this.translationService.getTranslation(this.automativeApplicationsText);
          this.offHighwayApplicationsText= this.translationService.getTranslation(this.offHighwayApplicationsText);
          this.truckAndBusesText= this.translationService.getTranslation(this.truckAndBusesText);
          this.contactSubmitted= this.translationService.getTranslation(this.contactSubmitted);
          this.sorryLabel= this.translationService.getTranslation(this.sorryLabel);
          this.detailLabel= this.translationService.getTranslation(this.detailLabel);
          this.fnameLabel= this.translationService.getTranslation(this.fnameLabel);
          this.lnameLabel= this.translationService.getTranslation(this.lnameLabel);
          this.emailLabel= this.translationService.getTranslation(this.emailLabel);
          this.phoneLabel= this.translationService.getTranslation(this.phoneLabel);
          this.additionalInfoLabel= this.translationService.getTranslation(this.additionalInfoLabel);
          this.submitLabel= this.translationService.getTranslation(this.submitLabel);
          this.invalidFirstNameText= this.translationService.getTranslation(this.invalidFirstNameText);
          this.invalidLastNameText= this.translationService.getTranslation(this.invalidLastNameText);
          this.EmailInvalidText= this.translationService.getTranslation(this.EmailInvalidText);
          this.phoneInvalidText= this.translationService.getTranslation(this.phoneInvalidText);
          this.searchLabel= this.translationService.getTranslation(this.searchLabel);
          this.applicationType = [
              {
                  id:'',
                  text:''
              },
              {
                  id: 'Automotive Applications',
                  text: this.automativeApplicationsText
              },
              {
                  id: 'Off-Highway Applications',
                  text: this.offHighwayApplicationsText
              },
              {
                  id: 'Trucks & Buses Applications',
                  text: this.truckAndBusesText
              }
          ];


          this.value = ['Automotive Applications'];

          this.current = this.value.join(' | ');


          this.applicationTypeModel = this.applicationType;

              this.route.queryParams.subscribe(params => {
                  if(this.pageLoadFlag && this.requestFromModalWindow==false ) {
                      let i = 0;
                      let val = {
                          value: ''
                      };
                      if (params['application'] != null) {
                          (window as any).$('#search-popup-modal-show').modal('hide');
                          this.selectedApplicationType = params['application'];
                          val.value = this.selectedApplicationType;
                          this.changeApplicationType(val);
                      }else{
                          (window as any).$('#search-popup-modal-show').modal({
                              backdrop: 'static',
                              keyboard: false
                          });
                      }

                      if (params['year'] != null) {
                          this.selectedYear = params['year'];
                          val.value = this.selectedYear;
                          console.log(this.yearList);
                          console.log(this.selectedYear);
                          if (this.selectedYear != null  && this.selectedYear.length>0) {
                              this.changeYear(val);
                          }


                      }



                        if (params['manufacturer'] != null) {
                            this.selectedManufacture = params['manufacturer'];
                            val.value = this.selectedManufacture;
                            if (this.selectedManufacture != null && this.selectedManufacture.length>0) {
                                this.changeManufacture(val);
                            }

                        }

                      if (params['make'] != null ) {
                          this.selectedMaker = params['make'];
                          val.value = this.selectedMaker;
                          if (this.selectedMaker != null && this.selectedMaker.length>0) {
                              this.changeMaker(val);
                          }


                      }

                        if (params['equipment'] != null) {
                            this.selectedEquipment = params['equipment'];
                            val.value = this.selectedEquipment;
                            if (this.selectedEquipment != null && this.selectedEquipment.length>0) {
                                this.changeEquipment(val);
                            }


                        }
                        if (params['model'] != null) {
                            this.selectedModel = params['model'];
                            val.value = this.selectedModel;
                            if (this.selectedModel != null && this.selectedModel.length>0) {
                                this.changeModel(val);
                            }


                        }


                        if (params['engine'] != null) {
                            this.selectedEngin = params['engine'];
                            val.value = this.selectedEngin;
                            if (this.selectedEngin != null && this.selectedEngin.length>0) {
                                this.changeEngine(val);
                            }

                        }
                  }
              })

      }

        partRequestForm = new FormGroup({
            firstName: new FormControl('',[Validators.pattern('[a-z|A-Z]*')]),
            lastName: new FormControl('',[Validators.pattern('[a-z|A-Z]*')]),
            email: new FormControl('',[Validators.pattern('\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,4})+')]),
            phone: new FormControl('',[Validators.pattern('[0-9]{10,12}')]),
            additionalInformation: new FormControl(''),
        });
        changeYear(e){
            this.totalcount=null;
            this.subsEvent=true;
            this.makerList = [];
            this.modelList = [];
            this.engineList = [];
            this.selectionBreadCum.length = 1;
            this.selectionBreadCum.push(new BreadCum('Year',e.value));
            this.params.year=e.value;
            this.params.make='';
            this.selectedYearModel = e.value;
            this.selectedYear=e.value;
            this.parameters.push();
            this.productPartResults = [];
            this.makerListModel=[];
            this.modelListModel=[];
            this.engineListModel=[];
            this.selectedMaker="";
            this.selectedModel="";
            this.selectedEngin="";
            this.selectedMakerModel="";
            this.selectedModelModel="";
            this.selectedEnginModel="";
            this.getMakerList('Left');
            this.getModelList('Left');
        }

        changeYearModel(e){
            this.popUpSubmitButtonDisabled = true;
            this.selectedYearModel = e.value;
            this.params.year=e.value;
            this.makerListModel = [];
            this.modelListModel = [];
            this.engineListModel = [];
            this.makerList=[];
            this.modelList=[];
            this.engineList=[];
            this.selectedMakerModel='';
            this.selectedModelModel='';
            this.selectedEnginModel='';
            this.getMakerList('Model');
            this.getModelList('Model');
        }
        changeManufacture(e){
            this.totalcount=null;
            this.subsEvent=false;
            this.selectionBreadCum.push(new BreadCum('Manufacture',e.value));
            this.params.manufacturer=e.value;
            this.params.equipment='';
            this.params.make='';
            this.selectedManufacture=e.value;
            this.selectedMaker='';
            this.selectedModel='';
            this.selectedEquipment='';
            this.selectedEngin='';
            this.engineList=[];
            this.modelList=[];
            this.productPartResults = [];
           /* this.makerList=[];*/
            this.getEquipmentList('Left');
            this.getModelList('Left');
        }

        changeManufactureModel(e){
            this.popUpSubmitButtonDisabled = true;
            this.selectedManufactureModel=e.value;
            this.params.manufacturer=e.value;
            this.modelListModel=[];
            this.engineListModel=[];
            this.equipmentTypeListModel=[];
            this.equipmentTypeList=[];
            this.engineList=[];
            this.modelList=[];
            this.makerList=[];
            this.selectedMakerModel='';
            this.selectedEquipmentModel='';
            this.selectedModelModel='';
            this.selectedEnginModel='';
            this.getEquipmentList('Model');
            this.getModelList('Model');

        }

        changeEquipmentModel(e){
            this.popUpSubmitButtonDisabled = true;
            this.selectedEquipmentModel=e.value;
            this.params.equipment=e.value;
            this.modelListModel=[];
            this.engineListModel=[];
            this.modelList=[];
            this.engineList=[];
            this.selectedModelModel='';
            this.selectedEnginModel='';
            this.getModelList('Model');
        }
        changeMaker(e){
            this.totalcount=null;
            this.subsEvent=false;
            this.engineList = [];
            this.params.make=e.value;
            this.selectionBreadCum.length = 2;
            this.selectionBreadCum.push(new BreadCum('Maker',e.value));
            this.selectedMaker = e.value;
            this.modelList = [];
            this.engineList = [];
            this.productPartResults = [];
            this.selectedModel="";
            this.selectedEngin="";
            this.selectedModelModel="";
            this.selectedEnginModel="";
            this.getModelList('Left');

        }
        changeMakerModel(e){
            this.popUpSubmitButtonDisabled = true;
            this.selectedMakerModel = e.value;
            this.params.make=e.value;
            this.modelListModel = [];
            this.engineListModel = [];
            this.modelList=[];
            this.engineList=[];
            this.selectedModelModel='';
            this.selectedEnginModel='';
            this.getModelList('Model');

        }
        changeEquipment(e){
            this.totalcount=null;
            this.subsEvent=false;
            this.selectionBreadCum.push(new BreadCum('Equipment',e.value));
            this.params.equipment=e.value;
            this.selectedEquipment=e.value;
            /*this.modelList=[];*/
            this.selectedModel='';
            this.selectedEngin='';
            this.engineList=[];
            this.productPartResults = [];
            this.getModelList('Left');
        }

        changeModel(e){
            this.totalcount=null;
            this.selectionBreadCum.length = 3;
            this.selectionBreadCum.push(new BreadCum('Model',e.value));
            this.params.model=e.value;
            this.selectedModel = e.value;
            this.engineList = [];
            this.productPartResults = [];
            this.selectedEngin="";
            this.selectedEnginModel="";
            this.getEngineList('Left');
        }
        changeModelModel(e){
            this.popUpSubmitButtonDisabled = true;
            this.selectedModelModel = e.value;
            this.params.model=e.value;
            this.engineList = [];
            this.engineListModel=[];
            this.selectedEnginModel='';
            this.getEngineList('Model');
           // this.productPartResult();

        }
        changeEngine(e){
            this.totalcount=null;
            this.pageLoadFlag = false;
            this.selectionBreadCum.length = 4;
          //  this.selectionBreadCum.push(new BreadCum('Engine',e.data[0].text));
            //this.selectedEngineText=e.data[0].text;
            this.params.engine=e.value;
            this.selectedAppId = e.value;
            this.productPartResults = [];
            this.router.navigate([''],{queryParams:(this.params)});
            this.url.setUrl((window as any).location.href);
            this.url.setApplicationType(this.selectedApplicationType);
            console.log((window as any).location.href);
            this.productPartResult();
        }

        changeEngineModel(e){
            let application='';
            this.params.engine=e.value;
            if(this.selectedApplicationTypeModel==1){
                application='Automotive Applications'
            }else if(this.selectedApplicationTypeModel==2){
                application='Off-Highway Applications';
            }else{
                application='Trucks & Buses Applications';
            }
            this.url.setApplicationType(application);
            if(e.value.length>0){
                this.selectedAppId = e.value;

                this.popUpSubmitButtonDisabled = false;
            }
        }

        public changeApplicationTypeModel(e: any): void {
            this.params.application=e.value;
            this.selected = e.value;
            this.yearListModel = [];
            this.modelListModel = [];
            this.makerListModel = [];
            this.engineListModel = [];
            this.equipmentTypeListModel = [];
            this.manufactureListModel=[];
            this.yearList=[];
            this.makerList=[];
            this.modelList=[];
            this.selectedYearModel='';
            this.selectedMakerModel='';
            this.selectedModelModel='';
            this.selectedEnginModel='';
            this.selectedEquipmentModel='';
            this.selectedManufactureModel='';
            this.engineList=[];

            this.popUpSubmitButtonDisabled = true;
            if(this.selected=='Automotive Applications'){
                this.selectedApplicationTypeModel = '1';
                this.getYearList('Model');
                this.yearFlagModel=true;
                this.makeFlagModel=true;
                this.modelFlagModel=true;
                this.manufacturerFlagModel=false;
                this.equipmentTypeFlagModel=false;
                this.engineFlagModel=true;
            }
            else if(this.selected=='Off-Highway Applications'){
                this.selectedApplicationTypeModel = '2';
                this.getManufacturerList('Model');
                this.manufacturerFlagModel=true;
                this.equipmentTypeFlagModel=true;
                this.modelFlagModel=true;
                this.yearFlagModel=false;
                this.makeFlagModel=false;
                this.engineFlagModel=true;
            }
            else if(this.selected=='Trucks & Buses Applications'){
                this.selectedApplicationTypeModel = '3';
                this.getManufacturerList('Model');
                this.manufacturerFlagModel=true;
                this.makeFlagModel=true;
                this.modelFlagModel=true;
                this.yearFlagModel=false;
                this.equipmentTypeFlagModel=false;
                this.engineFlagModel=true;
            }

            (window as any).selectBoxCss();
        }

        public changeApplicationType(e: any): void {
            this.totalcount=null;
            this.params.application=e.value;
            this.selectionBreadCum = [];
            this.productPartResults = [];
            this.selectionBreadCum.push(new BreadCum('Application',e.value));
            this.selected = e.value;
            if(this.selected=='Automotive Applications'){
                this.selectedApplicationTypeModel = '1';
                this.getYearList('Left');
                this.yearFlag=true;
                this.make=true;
                this.model=true;
                this.manufacturer=false;
                this.equipmentType=false;
                this.engine=true;
            }
            else if(this.selected=='Off-Highway Applications'){
                this.selectedApplicationTypeModel = '2';
                this.getManufacturerList('Left');
                this.manufacturer=true;
                this.equipmentType=true;
                this.model=true;
                this.yearFlag=false;
                this.make=false;
                this.engine=true;
            }
            else if(this.selected=='Trucks & Buses Applications'){
                this.selectedApplicationTypeModel = '3';
                this.getManufacturerList('Left');
                this.manufacturer=true;
                this.make=true;
                this.model=true;
                this.yearFlag=false;
                this.equipmentType=false;
                this.engine=true;
            }
            this.yearList=[];
            this.modelList=[];
            this.engineList=[];
            this.makerList=[];
            this.manufactureList=[];
           this.selectedYear='';
            this.selectedManufacture='';
            this.selectedEquipment='';
            this.selectedMaker='';
            this.selectedModel='';
            this.selectedEngin='';
            (window as any).selectBoxCss();
        }
        removeBreadcum(selectedremoveBreacum: BreadCum){
            let i=0;
            for(let i=0;i<this.selectionBreadCum.length;i++){
                if(this.selectionBreadCum[i]==selectedremoveBreacum){
                    this.selectionBreadCum.length = i;
                }
            }

            /*this.selectedApplicationType='';
            this.selectedYear='';
            this.selectedMaker='';
            this.selectedEngin='';
            this.selectedModel='';
            this.selectedEquipment='';*/


        }


        sortYear(data,source){
            let flag= true ;
            let year=  [];
            data.facet_counts.facet_fields["year_s"].map(function(obj){
                if(flag){
                    year.push(obj);
                    flag = false;
                }else{
                    flag = true;
                }
            })
            if(source =='Model') {
                this.yearListModel = year.sort(function (obj1, obj2) {
                    return (obj2 - obj1);
                });
                this.yearList = this.yearListModel;
            }else{
                this.yearList = year.sort(function (obj1, obj2) {
                    return (obj2 - obj1);
                });
            }

        }
        getYearList(source){
            let url=(window as any).searchURL+'?q=NOT%20year_s:""&fq=coreName_s:ApplicationData%20AND%20vehicleRef_s:'+this.selectedApplicationTypeModel+'&rows=0&wt=json&indent=true&facet=true&facet.field=year_s&facet.limit=-1&facet.mincount=1';
                if(source=="Left"){
                    (document.querySelector("#preloader") as HTMLElement).style.display = 'block';
                    (document.querySelector("#preloader") as HTMLElement).style.top = (window as any).$('section#g3_homePage').offset().top;
                }
                if(source=="Model"){
                    (document.querySelector("#preloader") as HTMLElement).style.display = 'block';
                    (document.querySelector("#preloader") as HTMLElement).style.top = (window as any).$('.modal').offset().top;
                }

            this.http.get(url).subscribe(
                data => {
                    if(source == 'Model'){
                        this.sortYear(data,source);
                    }else{
                        this.sortYear(data,source);
                    }
                    (document.querySelector("#preloader") as HTMLElement).style.display = 'none';
                }
            );
        }

        sort(data,key,source){
            let flag= true ;
            let maker=  [];
            data.facet_counts.facet_fields[key].map(function(obj){
                if(flag){
                    maker.push(obj);
                    flag = false;
                }else{
                    flag = true;
                }
            })
            if(key=='make_s' && source =='Model'){
                this.makerListModel=maker.sort();
                this.makerList=maker.sort();
                if(this.selectedApplicationTypeModel==2){
                    this.equipmentTypeListModel=maker.sort();
                    this.equipmentTypeList=maker.sort();
                }

            }else if(key=='make_s' && source =='Left'){
                if(this.selectedApplicationTypeModel==2){
                    this.equipmentTypeList = maker.sort();
                }
                if(maker.length>0) {
                    this.makerList = maker.sort();
                }
            }
            if(key=='model_facet' && source =='Model'){
                 this.modelListModel = maker.sort();
                 this.modelList = maker.sort();
            }else if(key=='model_facet' && source =='Left'){
                this.modelList = maker.sort();
            }
            if(key=='manufacturer_s' && source=='Model'){
                this.manufactureListModel=maker.sort();
                this.manufactureList=maker.sort();
            }
            else if(key=='manufacturer_s' && source=='Left'){
                this.manufactureList=maker.sort();
            }
            /*if(key=='equipment_s' && source=='Model'){
                this.equipmentTypeListModel=maker.sort();
                this.equipmentTypeList=maker.sort();
            }*/

        }
        getMakerList(source){
            this.selectedMaker="";
            this.selectedMakerModel="";
            let url=(window as any).searchURL+'?q=year_s:(""'+this.selectedYearModel+')&fq=coreName_s:ApplicationData%20AND%20vehicleRef_s:'+this.selectedApplicationTypeModel+'&rows=0&wt=json&indent=true&facet=true&facet.field=make_s&facet.limit=-1&facet.mincount=1';
            if(source=="Left"){
                (document.querySelector("#preloader") as HTMLElement).style.display = 'block';
                (document.querySelector("#preloader") as HTMLElement).style.top = (window as any).$('section#g3_homePage').offset().top;
            }
            else if(source=="Model"){
                (document.querySelector("#preloader") as HTMLElement).style.display = 'block';
                (document.querySelector("#preloader") as HTMLElement).style.top = (window as any).$('.modal').offset().top;
            }
            this.http.get(url).subscribe(
                data => {
                    if(source == 'Model'){
                        this.sort(data,'make_s',source);
                    }else{
                        this.sort(data,'make_s',source);
                    }
                    if(this.selectedApplicationTypeModel==2){
                        this.sort(data,'equipment_s',source);
                    }
                    (document.querySelector("#preloader") as HTMLElement).style.display = 'none';
                }
            );
        }

        getModelList(source){
            let query='';
            this.selectedModel="";
           if(source=='Model'){
               if(this.selectedMakerModel!=null && this.selectedMakerModel.length > 0){
                   query = query + 'year_s:("" '+this.selectedYearModel+')'+' AND make_s:'+'"'+this.selectedMakerModel+'"';
               }else{
                   query = query + 'year_s:'+this.selectedYearModel +' AND make_s:*';
               }
           }
            if(source=='Left'){
                 query='';
                if(this.selectedMaker!=null && this.selectedMaker.length > 0){
                    query = query +'year_s:(""'+this.selectedYear+')'+ ' AND make_s:'+'"'+this.selectedMaker+'"';
                }else{
                    query = query +'year_s:'+this.selectedYear+' AND make_s:*';
                }
            }

            if(this.selectedApplicationTypeModel==2 ){
                  if(source=='Model'){
                      if(this.selectedManufactureModel!=null && this.selectedManufactureModel.length > 0){
                          query= 'manufacturer_s:'+'"'+this.selectedManufactureModel+'"';
                      }
                      if(this.selectedEquipmentModel!=null && this.selectedEquipmentModel.length > 0){
                          query= query+' AND make_s:'+'"'+this.selectedEquipmentModel+'"';
                      }
                      else{
                          query= query+' AND make_s:*';
                      }
                  }
                    if(source=='Left'){
                        if(this.selectedManufacture!=null){
                            query = 'manufacturer_s:' + '"'+this.selectedManufacture+'"';
                        }
                        if(this.selectedEquipment!=null && this.selectedEquipment.length > 0){
                            query = query+'AND make_s:'+'"'+this.selectedEquipment+'"';
                        }
                        else{
                            query = query + ' AND make_s:*';
                        }
                    }
            }
            if( this.selectedApplicationTypeModel==3){
                    if(source=='Model'){
                        if(this.selectedManufactureModel!=null && this.selectedManufactureModel.length > 0){
                            query = 'manufacturer_s:' + '"'+this.selectedManufactureModel+'"';
                        }
                        if(this.selectedMakerModel!=null && this.selectedMakerModel.length > 0){
                            query = query + ' AND make_s:'+'"'+this.selectedMakerModel+'"';
                        }else{
                            query = query + ' AND make_s:*';
                        }
                    }
                if(source=='Left'){
                    if(this.selectedManufacture!=null && this.selectedManufacture.length > 0){
                        query= 'manufacturer_s:'+'"'+this.selectedManufacture+'"';
                    }
                    if(this.selectedMaker!=null && this.selectedMaker.length > 0){
                        query= query+' AND make_s:'+'"'+this.selectedMaker+'"';
                    }
                    else{
                        query= query+' AND make_s:*';

                    }
                }
            }
            query=query.replace(/[&]/g,'%26');
            let url=(window as any).searchURL+'?q='+query+'&fq=coreName_s:ApplicationData%20AND%20vehicleRef_s:'+this.selectedApplicationTypeModel+'&rows=0&wt=json&indent=true&facet=true&facet.field=model_facet&facet.limit=-1&facet.mincount=1';
            if(source=="Left"){
                (document.querySelector("#preloader") as HTMLElement).style.display = 'block';
                (document.querySelector("#preloader") as HTMLElement).style.top = (window as any).$('section#g3_homePage').offset().top;
            }
            else if(source=="Model"){
                (document.querySelector("#preloader") as HTMLElement).style.display = 'block';
                (document.querySelector("#preloader") as HTMLElement).style.top = (window as any).$('.modal').offset().top;
            }
            this.http.get(url).subscribe(
                data => {
                    if(source == 'Model'){
                        this.sort(data,'model_facet',source);
                    }else{
                        this.sort(data,'model_facet',source);
                    }
                    (document.querySelector("#preloader") as HTMLElement).style.display = 'none';
                }
            );
        }

        getManufacturerList(source){
            this.selectedManufacture="";
            let query='NOT manufacturer_s:""';
            query=query.replace(/[&]/g,'%26');
            let url=(window as any).searchURL+'?q='+query+'&fq=coreName_s:ApplicationData%20AND%20vehicleRef_s:'+this.selectedApplicationTypeModel+'&rows=0&wt=json&indent=true&facet=true&facet.field=manufacturer_s&facet.limit=-1&facet.mincount=1';
            if(source=="Left"){
                (document.querySelector("#preloader") as HTMLElement).style.display = 'block';
                (document.querySelector("#preloader") as HTMLElement).style.top = (window as any).$('section#g3_homePage').offset().top;
            }
            else if(source=="Model"){
                (document.querySelector("#preloader") as HTMLElement).style.display = 'block';
                (document.querySelector("#preloader") as HTMLElement).style.top = (window as any).$('.modal').offset().top;
            }
            this.http.get(url).subscribe(
                data => {
                    if(source == 'Model'){
                        this.sort(data,'manufacturer_s',source);
                    }else{
                        this.sort(data,'manufacturer_s',source);
                    }
                    (document.querySelector("#preloader") as HTMLElement).style.display = 'none';
                }
            );
        }

        getEquipmentList(source){
            this.selectedEquipment="";
            let query='manufacturer_s:"'+this.selectedManufactureModel+'"';
            if(source=='Left'){
                 query='manufacturer_s:"'+this.selectedManufacture+'"';
            }
            query=query.replace(/[&]/g,'%26');
            if(source=="Left"){
                (document.querySelector("#preloader") as HTMLElement).style.display = 'block';
                (document.querySelector("#preloader") as HTMLElement).style.top = (window as any).$('section#g3_homePage').offset().top;
            }
            else if(source=="Model"){
                (document.querySelector("#preloader") as HTMLElement).style.display = 'block';
                (document.querySelector("#preloader") as HTMLElement).style.top = (window as any).$('.modal').offset().top;
            }
            let url=(window as any).searchURL+'?q='+query+'&fq=coreName_s:ApplicationData%20AND%20vehicleRef_s:'+this.selectedApplicationTypeModel+'&rows=0&wt=json&indent=true&facet=true&facet.field=make_s&facet.limit=-1&facet.mincount=1';
            this.http.get(url).subscribe(
                data => {
                    if(source == 'Model'){
                        this.sort(data,'make_s',source);
                    }else{
                        this.sort(data,'make_s',source);
                    }
                    (document.querySelector("#preloader") as HTMLElement).style.display = 'none';
                }
            );
        }

        getEngineList(source){
                let query='';
            this.selectedEngin="";
                if(this.selectedMakerModel!=null && this.selectedMakerModel.length > 0){
                    query = query + 'year_s:("" '+this.selectedYearModel+')' +' AND make_s:"'+this.selectedMakerModel+'"';
                }
                else{
                    query = query + 'year_s:'+this.selectedYearModel +' AND make_s:*';
                }

                if(this.selectedModelModel!=null && source=='Model'){
                    query = query + ' AND model_facet:"'+this.selectedModelModel+'"';
                }

                if(source=='Left'){
                    query =  '';
                    if(this.selectedMaker!=null && this.selectedMaker.length > 0){
                        query = query +  'year_s:("" '+this.selectedYearModel+')' +' AND make_s:"'+this.selectedMaker+'"';
                    }else{
                        query = query + 'year_s:'+this.selectedYearModel  +' AND make_s:*';
                    }
                    if(this.selectedModel!=null && this.selectedModel.length > 0){
                        query = query + ' AND model_facet:"'+this.selectedModel+'"';
                    }
                }
            if(this.selectedApplicationTypeModel==2  ){
                let manufacturerValue=this.selectedManufactureModel;
                let modelValue= this.selectedModelModel;
                let equipmentValue=this.selectedEquipmentModel;
                query='manufacturer_s:"'+manufacturerValue+'"';
                if(this.selectedEquipmentModel!=null && this.selectedEquipmentModel.length > 0){
                    query = query + ' AND make_s:"'+equipmentValue+'"';
                }
                else{
                    query = query + ' AND make_s:*';
                }
                if(this.selectedModelModel!=null){
                    query = query + ' AND model_facet:"'+modelValue+'"';
                }
                if(source=='Left'){
                    query='manufacturer_s:"'+this.selectedManufacture+'" ';
                    if(this.selectedEquipment!=null && this.selectedEquipment.length > 0){
                        query = query + ' AND make_s:'+'"'+this.selectedEquipment+'"';
                    }
                    else{
                        query = query + ' AND make_s:*';
                    }
                    if(this.selectedModel!=null){
                        query = query + ' AND model_facet:"'+this.selectedModel+'"';
                    }
                }
            }
            if(this.selectedApplicationTypeModel==3 ){
                query='manufacturer_s:"'+this.selectedManufactureModel+'"';
                if(this.selectedMakerModel!=null && this.selectedMakerModel.length > 0){
                    query = query + ' AND make_s:"'+this.selectedMakerModel+'"';
                }else{
                    query = query + ' AND make_s:*';
                }
                if(this.selectedModelModel!=null){
                    query = query + ' AND model_facet:"'+this.selectedModelModel+'"';
                }
                if(source=='Left'){
                    query='manufacturer_s:"'+this.selectedManufacture+'"';
                    if(this.selectedMaker!='' && this.selectedMaker!=null ){
                        query = query + ' AND make_s:"'+this.selectedMaker+'"';
                    }
                    else{
                        query = query + ' AND make_s:*';
                    }
                    if(this.selectedModel!=null){
                        query = query + ' AND model_facet:"'+this.selectedModel+'"';
                    }
                }
            }
            query=query.replace(/[&]/g,'%26');
            let url=(window as any).searchURL+'?q='+query+'&fq=coreName_s:ApplicationData%20AND%20vehicleRef_s:'+this.selectedApplicationTypeModel+'&&sort=porder_si,porderNo_s,make_s asc&fl=description_s,applnNo_s,vin_si,model_s&wt=json&indent=true';
            if(source=="Left"){
                (document.querySelector("#preloader") as HTMLElement).style.display = 'block';
                (document.querySelector("#preloader") as HTMLElement).style.top = (window as any).$('section#g3_homePage').offset().top;
            }
            else if(source=="Model"){
                (document.querySelector("#preloader") as HTMLElement).style.display = 'block';
                (document.querySelector("#preloader") as HTMLElement).style.top = (window as any).$('.modal').offset().top;
            }
            this.http.get(url).subscribe(
                data => {
                    if(source == 'Model'){
                        if(data["response"]["docs"] !=null){
                            this.engineListModel = [];
                            for(let i=0;i<data["response"]["docs"].length;i++){
                                let engine = data["response"]["docs"][i];
                                let engineOption = '';

                                let option=[];
                                if(engine['description_s']!=null && engine['description_s'].length>0){
                                    engineOption = engine['description_s'];
                                }
                                if(engine['vin_si']!=null && engine['vin_si'].length>0){
                                    engineOption =engineOption+' VIN: '+ engine['vin_si'];
                                }
                                option["text"] = engineOption;

                                if(engine['applnNo_s']!=null && engine['applnNo_s'].length>0){
                                    option["id"] = engine['applnNo_s'];
                                }
                                this.engineListModel.push(option);
                                this.engineList = this.engineListModel;
                            }
                        }
                    }else{
                        if(data["response"]["docs"] !=null){
                            this.engineList = [];
                            for(let i=0;i<data["response"]["docs"].length;i++){
                                let engine = data["response"]["docs"][i];
                                let engineOption = '';
                                let option=[];
                                if(engine['description_s']!=null && engine['description_s'].length>0){
                                    engineOption = engine['description_s'];
                                }
                                if(engine['vin_si']!=null && engine['vin_si'].length>0){
                                    engineOption =engineOption+' VIN: '+ engine['vin_si'];
                                }
                                option["text"] = engineOption;
                                if(engine['applnNo_s']!=null && engine['applnNo_s'].length>0){
                                    option["id"] = engine['applnNo_s'];
                                }
                                this.engineList.push(option);

                            }
                        }
                        this.selectedEngin="";
                        console.log(this.engineList);
                    }
                    (document.querySelector("#preloader") as HTMLElement).style.display = 'none';
                }
            );
        }

        modelSubmit(){
            this.requestFromModalWindow=true;
            (window as any).$('#search-popup-modal-show').modal('hide');
           /* this.engineList = this.engineListModel;
            this.makerList = this.makerListModel;
            this.modelList = this.modelListModel;
            this.yearList = this.yearListModel;
            this.equipmentTypeList = this.equipmentTypeListModel;*/
           this.selectedApplicationType = this.selected;
            /*  this.selectedYear = this.selectedYearModel;
             this.selectedMaker = this.selectedMakerModel;
             this.selectedEquipment = this.selectedEquipmentModel;
             this.selectedModel = this.selectedModelModel;
             this.selectedEngin = this.selectedEnginModel;*/
            this.selectedYear=this.selectedYearModel;
            this.selectedMaker=this.selectedMakerModel;
            this.selectedModel=this.selectedModelModel;
            this.selectedEngin=this.selectedEnginModel;
            this.selectedEquipment=this.selectedEquipmentModel;
            this.selectedManufacture=this.selectedManufactureModel;
            if(this.selectedApplicationType=='Automotive Applications'){
                this.yearFlag=true;
                this.make=true;
                this.model=true;
                this.manufacturer=false;
                this.equipmentType=false;
                this.engine=true;
                this.selectionBreadCum =[];
                this.selectionBreadCum.push(new BreadCum('Application',this.selectedApplicationType));
                this.selectionBreadCum.push(new BreadCum('Year',this.selectedYear));
                if(this.selectedMaker!=null && this.selectedMaker.length>0){
                    this.selectionBreadCum.push(new BreadCum('Maker',this.selectedMaker));
                }
                this.selectionBreadCum.push(new BreadCum('Model',this.selectedModel));
                this.selectionBreadCum.push(new BreadCum('Engine',this.selectedEngin));
            }
            else if(this.selectedApplicationType=='Off-Highway Applications'){
                this.manufacturer=true;
                this.equipmentType=true;
                this.model=true;
                this.yearFlag=false;
                this.make=false;
                this.engine=true;
            }
            else if(this.selectedApplicationType=='Trucks & Buses Applications'){
                this.manufacturer=true;
                this.make=true;
                this.model=true;
                this.yearFlag=false;
                this.equipmentType=false;
                this.engine=true;
            }
            this.router.navigate([''],{queryParams:(this.params)});
            this.selectedYearModel='';
            this.selectedMakerModel='';
            this.selectedModelModel='';
            this.productPartResult();
        }

        productPartResult(){
            setTimeout(() => {
                this.url.setUrl((window as any).location.href);
                console.log((window as any).location.href);
            }, 100);
            (document.querySelector("#preloader") as HTMLElement).style.display = 'block';
            (document.querySelector("#preloader") as HTMLElement).style.top = (window as any).$('section#g3_homePage').offset().top;
            let url=(window as any).searchURL+'?q=applnNo_s:'+this.selectedAppId+'&fq=coreName_s%3AApplicationPartsData+AND+vehicleRef_s:'+this.selectedApplicationTypeModel+'&sort=seqNumber_si%2CfldNumber_si%2CbPartnumber_s+asc&fl=partPrompt_si%2CbPartnumber_s%2Cnotes_si&wt=json&indent=true'

            this.http.get(url).subscribe(
                data => {
                    let responseData = (data as any);
                    if(responseData.response.docs != null){
                        this.productPartResults = responseData.response.docs;
                        this.totalcount = responseData.response.numFound;
                        if(this.totalcount==0){
                            this.submitLostSales(this.totalcount);
                        }
                    }
                    (document.querySelector("#preloader") as HTMLElement).style.display = 'none';
                }
            );


        }

        checkUrl(partNumber){
            if(partNumber=='N/R' || partNumber=='N/S' || partNumber=="MT" || partNumber=="M.T." || partNumber=="CLN&R"){
              return false;
            }else{
                return true;
            }
        }

        submitLostSales( count){
            this.isSubmitted=false;
            if (count==0){
                this.lostSalesUrl = '/parker/baldwin/jsp/ECatalog/crossRefSearch/contactUs/captureLostSales.jsp?partNumber=';

                console.log(this.http.get(this.lostSalesUrl).subscribe(
                    data => {
                        console.log(data);
                        console.log(data['gid']);
                        this.groupId = data['gid'];
                    }
                ));
            }
        }

        submitContact() {
            // TODO: Use EventEmitter with form value
            if (this.partRequestForm.valid ) {
                console.log(this.partRequestForm.value);
                this.isSubmitted=true;
                this.lostSalesContactUrl = '/parker/baldwin/jsp/ECatalog/crossRefSearch/contactUs/crossRefContactUsForm.jsp?gid=' +this.groupId+ '&firstName=' +this.partRequestForm.value.firstName+ '&lastName='+this.partRequestForm.value.lastName+'&email='+this.partRequestForm.value.email+'&phone='+this.partRequestForm.value.phone+'&additionalInformation='+this.partRequestForm.value.additionalInformation;

                this.isSubmitted=true;
                try {
                    this.http.get(this.lostSalesContactUrl).subscribe();
                    this.partRequestForm.value.firstName='';
                    this.partRequestForm.value.lastName='';
                    this.partRequestForm.value.email='';
                    this.partRequestForm.value.phone='';
                    this.partRequestForm.value.additionalInformation='';
                }catch(e){}
            }
        }

    }
