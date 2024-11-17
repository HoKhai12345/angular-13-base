import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_services/alert/alert.service';
import { ChannelModel } from 'src/app/models/channel.model';
import { AuthService } from 'src/app/service/auth.service';
import { ChannelService } from 'src/app/service/channel/channel.service';
import {Global} from "../../global";
import {TestService} from "../../_services/test/test.service";
import {Subject} from "rxjs";
import {HeaderModel} from "../../models/header.model";

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {
  title = 'Main Layout';
  channelItem: ChannelModel[] = [];
  subject: any;
  listHeader = Global.listHeader;
  header: HeaderModel[] | undefined = Global.listHeader;
  constructor(private authService: AuthService, private testService: TestService, private channelService: ChannelService, private alertService: AlertService) {
    this.testService.headerItems$.subscribe(headerItems => {
      console.log("headerItems", headerItems);
      this.header = this.testService.getHeader();
    })
  }

  ngOnInit(): void {
    this.testService.setHeader(this.listHeader);
    this.header = this.testService.getHeader();
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
