import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Shelter} from "../models/shelter.model";
import {Observable} from "rxjs";
import {ShelterItems} from "../models/shelter-items.model";
import {DateRange} from "../models/date-range";
import {ReportView} from "../models/report-view.model";
import {Comment} from "../models/comment.model";

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
    let start = dataRange?.start ? dataRange.start : '';
    let end = dataRange?.end ? dataRange.end : '';
    return this.httpClient.get<ReportView>(`${environment.apiUrl}/rest/shelter/${id}/report-details?from=${start}&to=${end}`);
  }

  updateComments(id?: string, comments? : Comment[]): Observable<any>{
    return this.httpClient.put<any>(`${environment.apiUrl}/rest/shelter/${id}/comments`, comments);
  }
}
