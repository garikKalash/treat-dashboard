import {PackageItem} from "./package-item.model";

export class ShelterPackage {
  startDate? : string;
  arrivedDate? : string;
  updatedDate? : Date;
  status? : string;
  items? : PackageItem[];
  totalAmount? : number;
  additionalTaxes? : number;
  orderId? : string;
}
