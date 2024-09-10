import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-site-navbar',
  templateUrl: './site-navbar.component.html',
  styleUrls: ['./site-navbar.component.css']
})
export class SiteNavbarComponent {
  constructor(
    private route: ActivatedRoute
  ) {

  }
}
