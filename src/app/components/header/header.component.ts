import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ShelterService} from "../../service/shelter.service";
import {Shelter} from "../../models/shelter.model";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  activeLink: string = 'main';
  isAdmin: boolean = false;

  constructor() {
    let pass = localStorage.getItem("treat_app_admin");
    if(pass === 'j$wtAE=7kNGB') {
      this.isAdmin = true;
    }
  }


}
