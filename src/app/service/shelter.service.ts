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
import {ShelterConfigs} from "../models/shelter-config.model";

@Injectable()
export class ShelterService {
  constructor(private httpClient: HttpClient) {

  }

  shelters(): Observable<Shelter[]> {
    return this.httpClient.get<Shelter[]>(`${environment.apiUrl}/rest/shelter`);
  }

  shelterConfigs(id?: string): Observable<ShelterConfigs[]> {
    return this.httpClient.get<ShelterConfigs[]>(`${environment.apiUrl}/rest/shelter/med-supplies/list/${id}`);
  }

  shelter(id?: string): Observable<Shelter> {
    return this.httpClient.get<Shelter>(`${environment.apiUrl}/rest/shelter/${id}`);
  }

  create(newShelter: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/rest/subscribe`, newShelter);
  }

  shelterSentItems(id?: string): Observable<ReportView> {
    return this.httpClient.get<ReportView>(`https://dashboard-v1-0-0-dot-dogapp-67827.appspot.com/rest/shelter/${id}/report-details`);
  }
  changeAvailability(id: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/rest/shelter/${id}/change-availability`,{});
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
    return this.httpClient.get<ReportView>(`https://dashboard-v1-0-0-dot-dogapp-67827.appspot.com/rest/shelter/${id}/report-details?from=${start}&to=${end}`);
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
    return this.httpClient.get<ShelterPackage[]>(`https://dashboard-v1-0-0-dot-dogapp-67827.appspot.com/rest/shelter/${id}/chewy-packages?from=${start}&to=${end}`);
  }

  updateComments(id?: string, comments? : Comment[]): Observable<any>{
    return this.httpClient.put<any>(`${environment.apiUrl}/rest/shelter/${id}/comments`, comments);
  }
}
