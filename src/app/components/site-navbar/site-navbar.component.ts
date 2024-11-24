import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Global } from 'src/app/global';
import {BaseComponent} from "../base-component/base-component.component";
import {AuthService} from "../../service/auth.service";
import {ROLES} from "../../shared/global/global.constants";

@Component({
  selector: 'app-site-navbar',
  templateUrl: './site-navbar.component.html',
  styleUrls: ['./site-navbar.component.css']
})
export class SiteNavbarComponent extends BaseComponent implements OnInit {
  listHeader = Global.listHeaders;
  currentPath: string | undefined;
  constructor(
    private route: ActivatedRoute, private router: Router, authService: AuthService
  ) {
    super(authService);
    this.getCurrentPath();
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  getCurrentPath() {
        this.currentPath = this.router.url;
        this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            this.currentPath = event.urlAfterRedirects.replace(/^\/|\/$/g, '');;
          }
        });
  }

  checkActiveAdmin() {
    return this.isAdminActive()
  }

  isAdminActive(): boolean {
    return this.listHeader?.admin?.some(item => '/' + this.currentPath === item?.link);
  }

  checkAdmin(path: string): boolean {
    const prefixPathAdmin = path.split('/')[0] ?? null;
    if (prefixPathAdmin === ROLES.ADMIN.NAME.toLowerCase()) {
      return this.infoUser?.role?.id === ROLES.ADMIN.ID
    } else {
      return true;
    }
  }

}
