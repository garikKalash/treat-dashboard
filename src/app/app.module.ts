import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ShelterService} from "./service/shelter.service";
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatInputModule} from "@angular/material/input";
import {MatTabsModule} from "@angular/material/tabs";
import {MatListModule} from "@angular/material/list";
import {MatPaginatorModule} from "@angular/material/paginator";
import { MedSupplyComponent } from './components/med-supply/med-supply.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { ShelterDataComponent } from './components/shelter-data/shelter-data.component';
import {Location} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MedicalSuppliesService} from "./service/medical-supplies.service";
import {MedTypeService} from "./service/med-type.service";
import { ShelterSettingsComponent } from './components/shelter-settings/shelter-settings.component';
import {NewShelterDialogComponent} from "./components/new-shelter-dialog/new-shelter-dialog.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MedSupplyComponent,
    ShelterDataComponent,
    ShelterSettingsComponent,
    NewShelterDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatExpansionModule,
    MatInputModule,
    MatTabsModule,
    MatListModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatToolbarModule,
    MatCardModule,
    MatSlideToggleModule,
    MatDialogModule
  ],
  providers: [ShelterService, MedicalSuppliesService, MedTypeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
