import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ShelterService} from "./service/shelter.service";
import {Shelter} from "./models/shelter.model";
import {ShelterItems} from "./models/shelter-items.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DateRange} from "./models/date-range";

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
  shelterId?: string;
  picketer?: any;
  form!: FormGroup;
  start?: string;
  end?: string;
  shelters?: Array<Shelter>;

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
          this.shelterSentData = sitems;
        })
        this.shelterService.shelterUpcomingItems(sid).subscribe(sitems =>{
          this.shelterUpcomingData = sitems;
        })
        this.shelterService.activeAnimalCount(sid).subscribe(count =>{
          this.activeAnimalCount = count;
        })
        }
      );

  }

  loadShelterSentItems(){
    this.shelterService.shelterSentItems(this.shelterId).subscribe(sitems =>{
      this.shelterSentData = sitems;
    })
  }

  loadShelterUpcomingItems(){
    this.shelterService.shelterUpcomingItems(this.shelterId).subscribe(sitems =>{
      this.shelterSentData = sitems;
    })
  }

  onSubmit(start: any, end: any){
   let dataRange: DateRange = {
     start: start?.toISOString().replace('Z',''),
     end: end?.toISOString().replace('Z','')
   }
   this.shelterService.shelterSentItemsByDate(this.shelterId, dataRange).subscribe( sitems => {
     this.shelterSentData=sitems;
   });
  }

  refreshData($event: any) {
    this.shelterId = $event.shelterId
    this.shelterService.shelter(this.shelterId).subscribe(sh =>{
      this.shelterData = sh;
    })
    this.shelterService.shelterSentItems(this.shelterId).subscribe(sitems =>{
      this.shelterSentData = sitems;
    })
    this.shelterService.shelterUpcomingItems(this.shelterId).subscribe(sitems =>{
      this.shelterUpcomingData = sitems;
    })
    this.shelterService.activeAnimalCount(this.shelterId).subscribe(count =>{
      this.activeAnimalCount = count;
    })
  }
}
