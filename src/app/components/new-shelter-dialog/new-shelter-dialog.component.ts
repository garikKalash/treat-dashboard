import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NewShelter} from "../../models/new-dialog.model";
import {ShelterService} from "../../service/shelter.service";

@Component({
  selector: 'app-new-shelter-dialog',
  templateUrl: './new-shelter-dialog.component.html',
  styleUrls: ['./new-shelter-dialog.component.css']
})
export class NewShelterDialogComponent {
  error: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<NewShelterDialogComponent>,
    public shelterService: ShelterService,
    @Inject(MAT_DIALOG_DATA) public data: NewShelter,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(){
    this.error = undefined;
    let data = {
      shelter: this.data.name,
      animal_type: 'Dog',
      contact: this.data.contact,
      minimumSupportedVersion: this.data.minimumSupportedVersion
    }

    this.shelterService.create(data).subscribe(()=>{
       window.location.reload();
    },
        (er) => {
      this.error = er.error.message;
    });
  }
}
