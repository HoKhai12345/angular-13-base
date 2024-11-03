import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_services/alert/alert.service';
import { ChannelModel } from 'src/app/models/channel.model';
import { AuthService } from 'src/app/service/auth.service';
import { ChannelService } from 'src/app/service/channel/channel.service';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {
  title = 'Main Layout';
  channelItem: ChannelModel[] = [];
  subject: any;
  constructor(private authService: AuthService, private channelService: ChannelService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.channelService.channelItems$.subscribe((items) => {
        this.channelItem = items
    })
    this.alertService.getSubject().subscribe((result) => {
        console.log("result", result);
        this.subject = result;
    })
  }

  signOut() {
    this.authService.logout();
  }
}
