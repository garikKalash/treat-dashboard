import {ShelterItems} from "./shelter-items.model";
import {LastSync} from "./last-sync.model";

export class ReportView {
  shelterTreats?: ShelterItems;
  upcomingTreats? : ShelterItems;
  visitors? : number;
  users? : number;
  importedAnimals? : number;
  lastSync? : LastSync;
  deepLinkCount? : number;
}
