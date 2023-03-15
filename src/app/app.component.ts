import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ShelterService} from "./service/shelter.service";
import {Shelter} from "./models/shelter.model";
import {ShelterItems} from "./models/shelter-items.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DateRange} from "./models/date-range";
import {Comment} from "./models/comment.model";
import {ShelterPackage} from "./models/shelter-package.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "rxjs";

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
  deeplinkCount?: number;
  usersUsedShelter?: number;
  shelterId?: string;
  form!: FormGroup;
  start?: string;
  end?: string;
  shelters?: Array<Shelter>;
  shelterPackages?: Array<ShelterPackage>;
  showedPackages?: Observable<any>;
  @ViewChild('paginator') paginator?: MatPaginator;
  lastSync?:string;
  newComment?: string;
  showComments: boolean = false;
  serverError?: string;

  noPassedShelter?: boolean = true;

  deliveredMeals?: number = 0;
  deliveredTreats?: number = 0;

  packagePageIndex?: number = 0;
  dataSourceWithPageSize?: MatTableDataSource<ShelterPackage>;


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
        if(params.shelter_id){
          this.noPassedShelter = false;
          // @ts-ignore
          this.shelterId = params.shelter_id;
          this.shelterService.shelter(this.shelterId).subscribe(sh =>{
            this.shelterData = sh;
            this.noPassedShelter = false;
          }, error => {
            this.noPassedShelter = true;
          })
          this.shelterService.shelterSentItems(this.shelterId).subscribe(sitems =>{
            this.shelterSentData = sitems.shelterTreats;
            if(this.shelterSentData){
              if(this.shelterSentData.treats){
                this.shelterSentData.treats = Math.round(this.shelterSentData.treats);
              }
              if(this.shelterSentData.meals){
                this.shelterSentData.meals = Math.round(this.shelterSentData.meals);
              }
              if(this.shelterSentData.toys){
                this.shelterSentData.toys = Math.round(this.shelterSentData.toys);
              }
              if(this.shelterSentData.foodGrains){
                this.shelterSentData.foodGrains = Math.round(this.shelterSentData.foodGrains);
              }
            }
            this.activeAnimalCount = sitems.importedAnimals;
            this.shelterUpcomingData = sitems.upcomingTreats;
            this.usersUsedShelter = sitems.users;
            this.lastSync = sitems.lastSync?.usersTime;
            this.deeplinkCount = sitems.deepLinkCount;
          })
          this.shelterService.packages(this.shelterId).subscribe(packages => {
            this.deliveredMeals = 0;
            this.deliveredTreats = 0;
            this.shelterPackages = packages;
            for(const p of this.shelterPackages){
              // @ts-ignore
              for(let pi of p.items ) {
                if(pi.name && pi.quantity && pi.name.includes('Kibble')){
                  const weightPart = pi.name.split(',')[1].trim().split('-')[0];
                  const weight = +weightPart;
                  pi.meals =  Math.round(5.33 * weight * pi.quantity);
                  // @ts-ignore
                  if(p.status == 'ARRIVED')
                  this.deliveredMeals = this.deliveredMeals + pi.meals;
                }
                if(pi.name && pi.quantity && pi.name.includes('Treats')){
                  const weightPart = pi.name.split(',')[1].trim().split('-')[0];
                  const weight = +weightPart;
                  pi.treats = Math.round((272/15) * weight * pi.quantity);
                  // @ts-ignore
                  if(p.status == 'ARRIVED')
                  this.deliveredTreats = this.deliveredTreats + pi.treats;
                }
              }
            }

            this.dataSourceWithPageSize = new MatTableDataSource(this.shelterPackages);
            // @ts-ignore
            this.dataSourceWithPageSize.paginator = this.paginator;
            this.showedPackages = this.dataSourceWithPageSize.connect()
          })
        }
        }
      );

  }

  onSubmit(start: any, end: any){
   let dataRange: DateRange = {
     start: start,
     end: end
   }
   this.shelterService.shelterSentItemsByDate(this.shelterId, dataRange).subscribe( sitems => {
     this.serverError = undefined;
     this.shelterSentData = sitems.shelterTreats;
     if(this.shelterSentData){
       if(this.shelterSentData.treats){
         this.shelterSentData.treats = Math.round(this.shelterSentData.treats);
       }
       if(this.shelterSentData.meals){
         this.shelterSentData.meals = Math.round(this.shelterSentData.meals);
       }
       if(this.shelterSentData.toys){
         this.shelterSentData.toys = Math.round(this.shelterSentData.toys);
       }
       if(this.shelterSentData.foodGrains){
         this.shelterSentData.foodGrains = Math.round(this.shelterSentData.foodGrains);
       }
     }
     this.activeAnimalCount = sitems.importedAnimals;
     this.shelterUpcomingData = sitems.upcomingTreats;
     this.usersUsedShelter = sitems.users;
     this.lastSync = sitems.lastSync?.usersTime;
     this.deeplinkCount = sitems.deepLinkCount;
   }, error => {
     this.serverError = error.error.message;
   });
    this.shelterService.packages(this.shelterId, dataRange).subscribe(packages => {
      this.shelterPackages = packages;
      this.deliveredMeals = 0;
      this.deliveredTreats = 0;
      for(const p of this.shelterPackages){
        // @ts-ignore
        for(let pi of p.items ) {
          if(pi.name && pi.quantity && pi.name.includes('Kibble')){
            const weightPart = pi.name.split(',')[1].trim().split('-')[0];
            const weight = +weightPart;
            pi.meals =  Math.round(5.33 * weight * pi.quantity);
            // @ts-ignore
            if(p.status == 'ARRIVED')
            this.deliveredMeals = this.deliveredMeals + pi.meals;
          }
          if(pi.name && pi.quantity && pi.name.includes('Treats')){
            const weightPart = pi.name.split(',')[1].trim().split('-')[0];
            const weight = +weightPart;
            pi.treats = Math.round((272/15) * weight * pi.quantity);
            // @ts-ignore
            if(p.status == 'ARRIVED')
            this.deliveredTreats = this.deliveredTreats + pi.treats;
          }
        }
      }
      this.dataSourceWithPageSize = new MatTableDataSource(this.shelterPackages);
      // @ts-ignore
      this.dataSourceWithPageSize.paginator = this.paginator;
      this.showedPackages = this.dataSourceWithPageSize.connect()

    })
  }

  saveComments() {
    this.serverError = undefined;
    if (this.newComment) {
      let comment = {comment: this.newComment}
      this.shelterData?.comments?.push(comment);
    }
    this.shelterService.updateComments(this.shelterData?.orgId, this.shelterData?.comments).subscribe(res => {
      console.log('Comments are saved')
      this.shelterService.shelter(this.shelterId).subscribe(sh => {
        this.shelterData = sh;
      })
      if (this.newComment) {
        this.newComment = undefined;
      }
    })
  }

  getDate(seconds? : number){
    if(seconds)
    return new Date(seconds * 1000);

    return new Date();
  }
}
