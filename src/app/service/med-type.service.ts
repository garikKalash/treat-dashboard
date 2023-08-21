import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {MedSupplyDto} from "../models/med-supply.model";
import {environment} from "../../environments/environment";
import {MedSupplyTypeModel} from "../models/med-supply-type.model";
import {Injectable} from "@angular/core";
import {ShelterConfigs} from "../models/shelter-config.model";

@Injectable()
export class MedTypeService{
  constructor(private httpClient: HttpClient) {

  }

  types(): Observable<MedSupplyTypeModel[]> {
    return this.httpClient.get<MedSupplyTypeModel[]>(`${environment.apiUrl}/rest/med-supply-types`);
  }

  addType(typeName: string| undefined): Observable<string> {
    let data = {
      type: typeName
    }
    return this.httpClient.post<string>(`${environment.apiUrl}/rest/med-supply-types`,
      data,
      {responseType:'text' as 'json'})
  }
}
