import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Shelter} from "../models/shelter.model";
import {Observable} from "rxjs";
import {ShelterItems} from "../models/shelter-items.model";
import {DateRange} from "../models/date-range";
import {ReportView} from "../models/report-view.model";
import {Comment} from "../models/comment.model";
import {PackageItem} from "../models/package-item.model";
import {ShelterPackage} from "../models/shelter-package.model";

@Injectable()
export class ShelterService {
  constructor(private httpClient: HttpClient) {

  }

  shelters(){
    return new Array<Shelter>(
      {orgId: "CA2963",name : "HDBnQ"},
      {orgId: "IN14",name : "Pet Refuge"},
      {orgId: "PA109",name : "Antietam Humane Society"},
      {orgId: "TX115",name : "Special Pals Shelter"});
  }

  shelter(id?: string): Observable<Shelter> {
    return this.httpClient.get<Shelter>(`${environment.apiUrl}/rest/shelter/${id}`);
  }

  shelterSentItems(id?: string): Observable<ReportView> {
    return this.httpClient.get<ReportView>(`${environment.apiUrl}/rest/shelter/${id}/report-details`);
  }

  shelterSentItemsByDate(id?: string, dataRange?: DateRange): Observable<ReportView> {
    console.log(id);
    let start = '';
    if(dataRange?.start){
      let startDate = dataRange?.start.toLocaleDateString();
      let partTimes = startDate.split('/');
      start = partTimes[2] +'-'+(partTimes[0].length == 1 ? ('0' + partTimes[0]) : partTimes[0])+'-'+(partTimes[1].length == 1 ? ('0' + partTimes[1]) : partTimes[1])+'T00:00:00.000'
    }
    let end = '';
    if(dataRange?.end){
      let endDate = dataRange?.end.toLocaleDateString();
      let partTimes = endDate.split('/');
      end = partTimes[2] +'-'+(partTimes[0].length == 1 ? ('0' + partTimes[0]) : partTimes[0])+'-'+(partTimes[1].length == 1 ? ('0' + partTimes[1]) : partTimes[1])+'T23:59:59.000'

    }
    return this.httpClient.get<ReportView>(`${environment.apiUrl}/rest/shelter/${id}/report-details?from=${start}&to=${end}`);
  }

  packages(id?: string, dataRange?: DateRange): Observable<ShelterPackage[]> {
    console.log(id);
    let start = '';
    if(dataRange?.start){
      let startDate = dataRange?.start.toLocaleDateString();
      let partTimes = startDate.split('/');
      start = partTimes[2] +'-'+(partTimes[0].length == 1 ? ('0' + partTimes[0]) : partTimes[0])+'-'+(partTimes[1].length == 1 ? ('0' + partTimes[1]) : partTimes[1])+'T00:00:00.000'
    }
    let end = '';
    if(dataRange?.end){
      let endDate = dataRange?.end.toLocaleDateString();
      let partTimes = endDate.split('/');
      end = partTimes[2] +'-'+(partTimes[0].length == 1 ? ('0' + partTimes[0]) : partTimes[0])+'-'+(partTimes[1].length == 1 ? ('0' + partTimes[1]) : partTimes[1])+'T23:59:59.000'

    }
    return this.httpClient.get<ShelterPackage[]>(`${environment.apiUrl}/rest/shelter/${id}/chewy-packages?from=${start}&to=${end}`);
  }

  updateComments(id?: string, comments? : Comment[]): Observable<any>{
    return this.httpClient.put<any>(`${environment.apiUrl}/rest/shelter/${id}/comments`, comments);
  }
}
