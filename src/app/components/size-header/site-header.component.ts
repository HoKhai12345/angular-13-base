import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent {
  title = 'Main Layout';
  constructor(private authService: AuthService) {

  }

  signOut() {
    this.authService.logout();
  }
}
