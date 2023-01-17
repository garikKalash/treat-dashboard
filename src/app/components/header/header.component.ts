import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ShelterService} from "../../service/shelter.service";
import {Shelter} from "../../models/shelter.model";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  shelterId?: string;
  shelters?: Array<Shelter>;

  @Output() refresh= new EventEmitter();

  constructor(private shelterService: ShelterService) { }

  ngOnInit(): void {
    this.shelters = this.shelterService.shelters();
  }

  refreshData() {
    this.refresh.emit({"shelterId": this.shelterId});
  }
}
