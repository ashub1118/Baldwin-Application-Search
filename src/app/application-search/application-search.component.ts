import { Component, OnInit } from '@angular/core';
import {Select2OptionData} from "ng-select2";
import {BreadCum} from "../bread-cum";
function checkApplicationType(event){
    console.log("function called");
}
@Component({
  selector: 'app-application-search',
  templateUrl: './application-search.component.html',
  styleUrls: ['./application-search.component.css']
})
export class ApplicationSearchComponent implements OnInit {
    yearFlag: boolean=true;
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
  constructor() {   }
    public applicationType: Array<Select2OptionData>;
    public value: string[];
    public current: string;

  ngOnInit() {
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
  }

    changeYear(e){
        this.selectionBreadCum.push(new BreadCum('Year',e.value));
    }

    changeManufacture(e){
        this.selectionBreadCum.push(new BreadCum('Manufacture',e.value));
    }

    changeMaker(e){
        this.selectionBreadCum.push(new BreadCum('Maker',e.value));
    }

    changeEquipment(e){
        this.selectionBreadCum.push(new BreadCum('Equipment',e.value));
    }

    changeModel(e){
        this.selectionBreadCum.push(new BreadCum('Model',e.value));
    }

    changeEngine(e){
        this.selectionBreadCum.push(new BreadCum('Engine',e.value));
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
        }
        else if(this.selected=='Off-Highway Applications'){
            this.manufacturer=true;
            this.equipmentType=true;
            this.model=true;
            this.yearFlag=false;
            this.make=false;
        }
        else if(this.selected=='Trucks & Buses Applications'){
            this.manufacturer=true;
            this.make=true;
            this.model=true;
            this.yearFlag=false;
            this.equipmentType=false;
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

        for(let i=0;i<this.selectionBreadCum.length;i++){
            let type=this.selectionBreadCum[i].type;
            switch(type) {
                case 'Application':
                    this.selectedApplicationType = this.selectionBreadCum[i].value;
                    break;
                case 'Year':
                    this.selectedYear = this.selectionBreadCum[i].value;
                    break;
                case 'Maker':
                    this.selectedMaker = this.selectionBreadCum[i].value;
                    break;
                case 'Model':
                    this.selectedModel = this.selectionBreadCum[i].value;
                    break;
                case 'Equipment':
                    this.selectedEquipment = this.selectionBreadCum[i].value;
                    break;
                case 'Engine':
                    this.selectedEngin = this.selectionBreadCum[i].value;
                    break;
            }
        }
    }
}
