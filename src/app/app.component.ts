import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, Routes} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  startTab: string;
  knownRoutes: Routes | undefined;
  currentPath: string;
  activeLink!: string;

  constructor(
    private _router: Router,
    private _location: Location,
    private _ar: ActivatedRoute
  ) {
    this.startTab = 'main';
    this.currentPath = this.startTab;
    this._router.navigateByUrl(this.startTab);
  }

  ngOnInit(): void {
    // @ts-ignore
    this.knownRoutes = this._router.config.filter(qq => {
      // @ts-ignore
      if (qq.data.isTab) {
        return true;
      }
    });
    this._router.events.subscribe(_e => {
      if (_e instanceof NavigationEnd) {
        this.currentPath = _e.urlAfterRedirects;
      }
    });
  }

}
