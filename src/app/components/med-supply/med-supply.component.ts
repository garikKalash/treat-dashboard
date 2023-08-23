import { Component, OnInit } from '@angular/core';
import {Shelter} from "../../models/shelter.model";
import {ShelterService} from "../../service/shelter.service";
import {ShelterConfigs} from "../../models/shelter-config.model";
import {MedSupplyDto} from "../../models/med-supply.model";
import {MedicalSuppliesService} from "../../service/medical-supplies.service";
import {MedSupplyTypeModel} from "../../models/med-supply-type.model";
import {MedTypeService} from "../../service/med-type.service";

@Component({
  selector: 'app-med-supply',
  templateUrl: './med-supply.component.html',
  styleUrls: ['./med-supply.component.css']
})
export class MedSupplyComponent implements OnInit {
  shelters : Shelter[] = [];
  shelterConfigs: ShelterConfigs[] = [];
  selectedShelter: Shelter | undefined;

  newMedSupplyToShelter: ShelterConfigs = new ShelterConfigs();
  newMedSupply: MedSupplyDto = new MedSupplyDto();

  medSupplies: MedSupplyDto[] = [];
  medTypes: MedSupplyTypeModel[] = [];

  newTypeName: string | undefined;

  errorContent: string | undefined;

  isAdmin: boolean = false;


  constructor(private shelterService: ShelterService,
              private medSupplyService: MedicalSuppliesService,
              private medTypeService: MedTypeService) {
    let pass = localStorage.getItem("treat_app_admin");
    if(pass === 'j$wtAE=7kNGB') {
      this.isAdmin = true;
    }

  }

  ngOnInit(): void {
    this.shelterService.shelters().subscribe(res=>{
      this.shelters = res;
      this.selectedShelter = this.shelters[0];
      this.shelterService.shelterConfigs(this.selectedShelter.orgId).subscribe(r=>{
        this.shelterConfigs = r;
      })
    })
    this.medSupplyService.supplies().subscribe(r=>{this.medSupplies = r});
    this.medTypeService.types().subscribe(r=>{this.medTypes = r});
  }

  onChangeShelter(): void{
    this.shelterConfigs = [];
    this.shelterService.shelterConfigs(this.selectedShelter?.orgId).subscribe(r=>{
      this.shelterConfigs = r;
    })
  }

  addNewMedicalSupply():void{
    if(!this.validateNewMedSupply()) {
      this.errorContent = "Invalid data please correct the data before the submit";
      return;
    }
    this.errorContent = undefined;
    this.medSupplyService.addMedicalSupply(this.newMedSupply).subscribe(r=>{
      this.newMedSupply.supplyId = r;
      let copyMedSupply = new MedSupplyDto();
      copyMedSupply.supplyId = r;
      copyMedSupply.name = this.newMedSupply.name;
      copyMedSupply.logoUrl = this.newMedSupply.logoUrl;
      copyMedSupply.kibbles = this.newMedSupply.kibbles;
      copyMedSupply.medSupplyType = new MedSupplyTypeModel();
      copyMedSupply.medSupplyType.name = this.newMedSupply?.medSupplyType?.name;
      copyMedSupply.medSupplyType.id = this.newMedSupply?.medSupplyType?.id;
      this.medSupplies.push(copyMedSupply);
      this.newMedSupply = new MedSupplyDto();
    })
  }

  validateNewMedSupply(): boolean{
    return this.newMedSupply.medSupplyType !== undefined
      && this.newMedSupply.logoUrl !== undefined
      && this.newMedSupply.name !== undefined
      && this.newMedSupply.kibbles !== undefined;
  }

  addNewMedicalSupplyIntoShelter():void{
    if(!this.newMedSupplyToShelter.countForYoung
      || !this.newMedSupplyToShelter.countForAdult
      || !this.newMedSupplyToShelter.medSupply
    ) {
      this.errorContent = "Invalid data please correct the data before the submit";
    }
    this.errorContent = undefined;
    this.newMedSupplyToShelter.orgId = this.selectedShelter?.orgId;
    this.medSupplyService.addMedicalSupplyToShelter(this.newMedSupplyToShelter).subscribe(r=>{
      this.shelterConfigs.push(this.newMedSupplyToShelter);
    })
  }

  addNewSupplyType():void{
    if(!this.newTypeName) {
      this.errorContent = "Invalid data please correct the data before the submit";
    }
    this.errorContent = undefined;
    this.medTypeService.addType(this.newTypeName).subscribe(r=>{
      this.newMedSupply.supplyId = r;
      let copyMedSupply = new MedSupplyTypeModel();
      copyMedSupply.name = this.newTypeName;
      copyMedSupply.id = r;
      this.medTypes.push(copyMedSupply);
      this.newTypeName = undefined;
    })
  }

}
