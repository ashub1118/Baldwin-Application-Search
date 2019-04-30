import { Component, OnInit } from '@angular/core';
import {Select2OptionData} from "ng-select2";
import {BreadCum} from "../bread-cum";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-application-search',
  templateUrl: './application-search.component.html',
  styleUrls: ['./application-search.component.css']
})
export class ApplicationSearchComponent implements OnInit {

    yearFlag: boolean=true;
    yearFlagModel: boolean = true;
    manufacturerFlagModel: boolean = false;
    makeFlagModel: boolean = true;
    modelFlagModel: boolean = true;
    equipmentTypeFlagModel: boolean = false;
    engineFlagModel: boolean = true;
    make: boolean=true;
    yearList = [];
    model: boolean=true;
    selectedYear;
    manufactureList = [];
    makerList = [];
    selectedMaker;
    modelList =[];
    selectedModel;
    engineList = [];
    selectedEngin;
    equipmentTypeList = [];
    selectedEquipment;
    selectionBreadCum = [];
    selectedApplicationType;
    placeHolderApplication;
    public manufacturer: boolean=false;
    public equipmentType: boolean=false;
    public engine: boolean=false;
    public selected: string;
    selectedManufacture;
    placeHolderYear;
    placeHolderManufacture;
    placeHolderMaker;
    placeHolderModel;
    placeHolderEngine;
    placeHolderEquipment;
    applicationTypeModel= [];
    yearListModel = [];
    manufactureListModel = [];
    makerListModel = [];
    equipmentTypeListModel = [];
    modelListModel = [];
    engineListModel = [];
    http: HttpClient;
  constructor(http: HttpClient) {  this.http = http; }
    public applicationType: Array<Select2OptionData>;
    public value: string[];
    public current: string;

  ngOnInit() {
      this.getYearList();
      this.placeHolderApplication = 'Select An Application';
      this.placeHolderYear = 'Select Year';
      this.placeHolderManufacture = 'Select Manufacture';
      this.placeHolderMaker = 'Select Maker';
      this.placeHolderModel = 'Select Model';
      this.placeHolderEngine = 'Select Engine';
      this.placeHolderEquipment = 'Select Model';
      this.applicationType = [
          {
              id:'',
              text:''
          },
          {
              id: 'Automative Applications',
              text: 'Automative Applications'
          },
          {
              id: 'Off-Highway Applications',
              text: 'Off-Highway Applications'
          },
          {
              id: 'Trucks & Buses Applications',
              text: 'Trucks & Buses Applications'
          }
      ];

      this.yearList =[
          {
              id:'',
              text:''
          },
          {
              id:1989,
              text:1989
          },
          {
              id:1990,
              text:1990
          },
          {
              id:1991,
              text:1991
          }

      ];

      this.manufactureList =[
          {
              id:'',
              text:''
          },

          {
              id:'ABG',
              text:'ABG'
          },
          {
              id:'ACDELCO',
              text:'ACDELCO'
          },
          {
              id:'ACME DYNAMICS',
              text:'ACME DYNAMICS'
          }

      ];
      this.makerList =[
          {
              id:'',
              text:''
          },
          {
              id:'BMW',
              text:'BMW'
          },
          {
              id:'BUELL',
              text:'BUELL'
          },
          {
              id:'BUICK',
              text:'BUICK'
          }

      ];

      this.modelList =[
          {
              id:'',
              text:''
          },
          {
              id:'230i',
              text:'230i'
          },
          {
              id:'230i xDrive',
              text:'230i xDrive'
          },
          {
              id:'C650gt',
              text:'C650gt'
          }

      ];
      this.engineList =[
          {
              id:'',
              text:''
          },
          {
              id:'F700gs',
              text:'F700gs'
          },
          {
              id:'F700gs',
              text:'F700gs'
          },
          {
              id:'C650gt',
              text:'C650gt'
          }

      ];
      this.equipmentTypeList =[
          {
              id:'',
              text:''
          },
          {
              id:'F700gs',
              text:'F700gs'
          },
          {
              id:'F700gs',
              text:'F700gs'
          },
          {
              id:'C650gt',
              text:'C650gt'
          }

      ]

      this.value = ['Automative Applications'];

      this.current = this.value.join(' | ');

      (window as any).$('#search-popup-modal-show').modal({
          backdrop: 'static',
          keyboard: false
      });

      this.applicationTypeModel = this.applicationType;
  }

    changeYear(e){
        this.selectionBreadCum.push(new BreadCum('Year',e.value));
    }

    changeYearModel(e){

    }
    changeManufacture(e){
        this.selectionBreadCum.push(new BreadCum('Manufacture',e.value));
    }

    changeManufactureModel(e){

    }
    changeMaker(e){
        this.selectionBreadCum.push(new BreadCum('Maker',e.value));
    }
    changeMakerModel(e){

    }
    changeEquipment(e){
        this.selectionBreadCum.push(new BreadCum('Equipment',e.value));
    }
    changeEquipmentModel(e){

    }
    changeModel(e){
        this.selectionBreadCum.push(new BreadCum('Model',e.value));
    }
    changeModelModel(e){

    }
    changeEngine(e){
        this.selectionBreadCum.push(new BreadCum('Engine',e.value));
    }
    changeEngineModel(e){

    }


    public changeApplicationTypeModel(e: any): void {

        this.selectionBreadCum = [];

        this.selectionBreadCum.push(new BreadCum('Application',e.value));
        this.selected = e.value;
        if(this.selected=='Automative Applications'){
            this.yearFlagModel=true;
            this.makeFlagModel=true;
            this.modelFlagModel=true;
            this.manufacturerFlagModel=false;
            this.equipmentTypeFlagModel=false;
            this.engineFlagModel=true;
        }
        else if(this.selected=='Off-Highway Applications'){
            this.manufacturerFlagModel=true;
            this.equipmentTypeFlagModel=true;
            this.modelFlagModel=true;
            this.yearFlagModel=false;
            this.makeFlagModel=false;
            this.engineFlagModel=true;
        }
        else if(this.selected=='Trucks & Buses Applications'){
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

        this.selectionBreadCum = [];

        this.selectionBreadCum.push(new BreadCum('Application',e.value));
        this.selected = e.value;
        if(this.selected=='Automative Applications'){
            this.yearFlag=true;
            this.make=true;
            this.model=true;
            this.manufacturer=false;
            this.equipmentType=false;
            this.engine=true;
        }
        else if(this.selected=='Off-Highway Applications'){
            this.manufacturer=true;
            this.equipmentType=true;
            this.model=true;
            this.yearFlag=false;
            this.make=false;
            this.engine=true;
        }
        else if(this.selected=='Trucks & Buses Applications'){
            this.manufacturer=true;
            this.make=true;
            this.model=true;
            this.yearFlag=false;
            this.equipmentType=false;
            this.engine=true;
        }
        (window as any).selectBoxCss();
    }
    removeBreadcum(selectedremoveBreacum: BreadCum){
        let i=0;
        for(let i=0;i<this.selectionBreadCum.length;i++){
            if(this.selectionBreadCum[i]==selectedremoveBreacum){
                this.selectionBreadCum.length = i;
            }
        }

        this.selectedApplicationType='';
        this.selectedYear='';
        this.selectedMaker='';
        this.selectedEngin='';
        this.selectedModel='';
        this.selectedEquipment='';


    }

    getYearList(){
        let url=(window as any).searchURL+'?q=NOT%20year_s:""&fq=coreName_s:ApplicationData%20AND%20vehicleRef_s:1&rows=0&wt=json&indent=true&facet=true&facet.field=year_s&facet.limit=-1&facet.mincount=1'
        console.log(url);
        this.http.get(url).subscribe(
            data => {
                console.log(data);
            }
        );
    }
}
