import { Component, OnInit } from '@angular/core';
import {ShelterService} from "../../service/shelter.service";
import {Shelter} from "../../models/shelter.model";
import {NewShelterDialogComponent} from "../new-shelter-dialog/new-shelter-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-shelter-settings',
  templateUrl: './shelter-settings.component.html',
  styleUrls: ['./shelter-settings.component.css']
})
export class ShelterSettingsComponent implements OnInit {

  selectedShelter: Shelter | undefined;
  shelters: Shelter[] = [];
  newName: string | undefined;
  contact: string | undefined;


  constructor(private shelterService: ShelterService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.shelterService.shelters().subscribe(res=>{
      this.shelters = res;
      this.selectedShelter = this.shelters[0];
    })
  }

  changeAvailability(){
    this.shelterService.changeAvailability(this.selectedShelter?.orgId).subscribe(res => {
      if(this.selectedShelter)
        this.selectedShelter.availableInSystem = !this.selectedShelter.availableInSystem;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewShelterDialogComponent, {
      data: {name: this.newName, contact: this.contact},
      height: "40%" ,
      width: "50%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.contact = result;
    });
  }

}
