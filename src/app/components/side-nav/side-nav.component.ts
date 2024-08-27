import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/enums/app.enums';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  public navigationRoutes = AppRoutes;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  public navigateToRoute(newRoute: string) {
    this.router.navigateByUrl(newRoute);
  }

}
