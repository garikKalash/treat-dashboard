import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ShelterService} from "./service/shelter.service";
import {Shelter} from "./models/shelter.model";
import {ShelterItems} from "./models/shelter-items.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DateRange} from "./models/date-range";
import {Comment} from "./models/comment.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'treat-dashboard';
  shelterData?: Shelter;
  shelterSentData?: ShelterItems;
  shelterUpcomingData?: ShelterItems;
  activeAnimalCount?: number;
  usersUsedShelter?: number;
  shelterId?: string;
  form!: FormGroup;
  start?: string;
  end?: string;
  shelters?: Array<Shelter>;

  lastSync?:string;

  newComment?: string;

  showComments: boolean = false;

  serverError?: string;

  constructor(private route: ActivatedRoute,
              private shelterService: ShelterService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      dateRange : new FormGroup({
        start: new FormControl(),
        end: new FormControl()
      })
    });
    this.shelters = this.shelterService.shelters();
    this.route.queryParams
      .subscribe(params => {
          console.log(params);
        // @ts-ignore
        const sid = params.shelter_id ? params.shelter_id : this.shelters[0].orgId;
        // @ts-ignore
          this.shelterService.shelter(sid).subscribe(sh =>{
            this.shelterData = sh;
            this.shelterId = sid;
          })
        this.shelterService.shelterSentItems(sid).subscribe(sitems =>{
          this.shelterSentData = sitems.shelterTreats;
          this.activeAnimalCount = sitems.importedAnimals;
          this.shelterUpcomingData = sitems.upcomingTreats;
          this.usersUsedShelter = sitems.users;
          this.lastSync = sitems.lastSync?.usersTime;
        })
        }
      );

  }

  onSubmit(start: any, end: any){
   let dataRange: DateRange = {
     start: start?.toISOString().replace('Z',''),
     end: end?.toISOString().replace('Z','')
   }
   this.shelterService.shelterSentItemsByDate(this.shelterId, dataRange).subscribe( sitems => {
     this.serverError = undefined;
     this.shelterSentData = sitems.shelterTreats;
     this.activeAnimalCount = sitems.importedAnimals;
     this.shelterUpcomingData = sitems.upcomingTreats;
     this.usersUsedShelter = sitems.users;
     this.lastSync = sitems.lastSync?.usersTime;
   }, error => {
     this.serverError = error.error.message;
   });
  }

  refreshData($event: any) {
    this.shelterId = $event.shelterId
    this.serverError = undefined;
    this.shelterService.shelter(this.shelterId).subscribe(sh =>{
      this.shelterData = sh;
    })
    this.shelterService.shelterSentItems(this.shelterId).subscribe(sitems =>{
      this.shelterSentData = sitems.shelterTreats;
      this.activeAnimalCount = sitems.importedAnimals;
      this.shelterUpcomingData = sitems.upcomingTreats;
      this.usersUsedShelter = sitems.users;
      this.lastSync = sitems.lastSync?.usersTime;
    }, error => {
      this.serverError = error.error.message;
    })
  }

  saveComments(){
    this.serverError = undefined;
    if(this.newComment){
      let comment = {comment: this.newComment}
      this.shelterData?.comments?.push(comment);
    }
    this.shelterService.updateComments(this.shelterData?.orgId, this.shelterData?.comments).subscribe(res=>{
      console.log('Comments are saved')
      this.shelterService.shelter(this.shelterId).subscribe(sh =>{
        this.shelterData = sh;
      })
      if(this.newComment){
        this.newComment = undefined;
      }
    })
  }
}
