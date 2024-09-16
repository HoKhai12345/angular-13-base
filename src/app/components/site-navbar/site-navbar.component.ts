import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Global } from 'src/app/global';

@Component({
  selector: 'app-site-navbar',
  templateUrl: './site-navbar.component.html',
  styleUrls: ['./site-navbar.component.css']
})
export class SiteNavbarComponent implements OnInit {
  listHeader = Global.listHeader;
  currentPath: string | undefined;
  constructor(
    private route: ActivatedRoute, private router: Router
  ) {

    this.getCurrentPath();
  }

  ngOnInit() {
  }

  getCurrentPath() {
        this.currentPath = this.router.url;
        this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            this.currentPath = event.urlAfterRedirects.replace(/^\/|\/$/g, '');;
          }
        });
  }
}
