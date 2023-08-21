import {MedSupplyDto} from "./med-supply.model";

export class ShelterConfigs {
  medSupply?: MedSupplyDto;
  countForAdult?: number;
  countForYoung?: number;

  orgId?: string;
}
