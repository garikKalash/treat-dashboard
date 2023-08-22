import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MedSupplyComponent} from "./components/med-supply/med-supply.component";
import {ShelterDataComponent} from "./components/shelter-data/shelter-data.component";
import {ShelterSettingsComponent} from "./components/shelter-settings/shelter-settings.component";

const routes: Routes = [
  {
    path: "main",
    component: ShelterDataComponent
  },
  {
    path: "medical-supply",
    component: MedSupplyComponent,
    data: {
      isTab: true,
      tabName: "This is the Second one",
      tabHint: "This is a hint"
    }
  },
  {
    path: "shelter-settings",
    component: ShelterSettingsComponent,
    data: {
      isTab: true,
      tabName: "This is the Second one",
      tabHint: "This is a hint"
    }
  },
  {
    path: "",
    redirectTo: "main",
    pathMatch: "full",
    data: { isTab: false }
  },
  { path: "**", redirectTo: "", data: { isTab: false } }
];



@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
