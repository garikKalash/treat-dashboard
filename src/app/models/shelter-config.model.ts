import {MedSupplyDto} from "./med-supply.model";
import {AdultCounter} from "./adult-counter.model";

export class ShelterConfigs {
  medSupply?: MedSupplyDto;
  countForAdult: AdultCounter = new AdultCounter();
  countForYoung?: number;

  orgId?: string;
}
