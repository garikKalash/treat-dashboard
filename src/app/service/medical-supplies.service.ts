import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Shelter} from "../models/shelter.model";
import {environment} from "../../environments/environment";
import {MedSupplyDto} from "../models/med-supply.model";
import {ShelterConfigs} from "../models/shelter-config.model";

@Injectable()
export class MedicalSuppliesService{
  constructor(private httpClient: HttpClient) {

  }

  supplies(): Observable<MedSupplyDto[]> {
    return this.httpClient.get<MedSupplyDto[]>(`${environment.apiUrl}/rest/med-supplies`);
  }

  addMedicalSupplyToShelter(medSupplyToShelter: ShelterConfigs): Observable<any> {
    let data = {
      countForAdult: medSupplyToShelter.countForAdult,
      countForYoung: medSupplyToShelter.countForYoung,
      medSupplyId: medSupplyToShelter.medSupply?.supplyId
    }
    return this.httpClient.put<any>(`${environment.apiUrl}/rest/shelter/med-supplies/upsert/${medSupplyToShelter.orgId}`, data)
  }

  addMedicalSupply(medSupplyToShelter: MedSupplyDto): Observable<string> {
    let data = {
      typeId: medSupplyToShelter.medSupplyType?.id,
      kibbles: medSupplyToShelter.kibbles,
      logoUrl: medSupplyToShelter.logoUrl,
      name: medSupplyToShelter.name
    }
    return this.httpClient.put<string>(`${environment.apiUrl}/rest/med-supplies`, data, {responseType:'text' as 'json'})
  }

}
