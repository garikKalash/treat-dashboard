import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Shelter} from "../models/shelter.model";
import {Observable} from "rxjs";
import {ShelterItems} from "../models/shelter-items.model";
import {DateRange} from "../models/date-range";

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

  shelterUpcomingItems(id?: string): Observable<ShelterItems> {
    return this.httpClient.get<ShelterItems>(`${environment.apiUrl}/rest/shelter/${id}/upcoming-items`);
  }

  shelterSentItems(id?: string): Observable<ShelterItems> {
    return this.httpClient.get<ShelterItems>(`${environment.apiUrl}/rest/shelter/${id}/sent-items`);
  }

  activeAnimalCount(id?: string): Observable<number> {
    return this.httpClient.get<number>(`${environment.apiUrl}/rest/shelter/${id}/animals-active`);
  }

  shelterSentItemsByDate(id?: string, dataRange?: DateRange): Observable<ShelterItems> {
    console.log(id);
    let start = dataRange?.start ? dataRange.start : '';
    let end = dataRange?.end ? dataRange.end : '';
    return this.httpClient.get<ShelterItems>(`${environment.apiUrl}/rest/shelter/PA109/sent-items?from=${start}&to=${end}`);
  }
}
