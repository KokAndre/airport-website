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
  public displayHeaderAsSolid = false;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  public navigateToRoute(newRoute: string) {
    this.router.navigateByUrl(newRoute);
  }

  public setHeaderColour(event: any) {
    console.log('Scroll Event: ', event.srcElement.scrollTop);
    
    if(event?.srcElement?.scrollTop > 10) {
      this.displayHeaderAsSolid = true;
    } else {
      this.displayHeaderAsSolid = false;
    }
  }

}
