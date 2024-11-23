import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_services/alert/alert.service';
import { ChannelModel } from 'src/app/models/channel.model';
import { AuthService } from 'src/app/service/auth.service';
import { ChannelService } from 'src/app/service/channel/channel.service';
import {Global} from "../../global";
import {TestService} from "../../_services/test/test.service";
import {Subject} from "rxjs";
import {HeaderModel} from "../../models/header.model";
import {MatDialog} from "@angular/material/dialog";
import {UserInfoDialogComponent} from "../dialog/user-info/user-info.component";
import {BaseComponent} from "../base-component/base-component.component";

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent extends BaseComponent implements OnInit {
  title = 'Main Layout';
  channelItem: ChannelModel[] = [];
  subject: any;
  listHeader = Global.listHeader;
  header: HeaderModel[] | undefined = Global.listHeader;
  constructor(
    private dialog: MatDialog,
    authService: AuthService,
    private testService: TestService,
    private channelService: ChannelService,
    private alertService: AlertService) {
    super(authService);
    this.testService.headerItems$.subscribe(headerItems => {
      this.header = this.testService.getHeader();
    })
  }

  override ngOnInit(): void {
    super.ngOnInit();
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

  openInfoUser() {
    console.log("_________", this.infoUser);
    const dialogRef = this.dialog.open(UserInfoDialogComponent, {
      width: '500px',
      data: { info: this.infoUser },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Kết quả sau khi đóng dialog:', result);
    });
  }

  signOut() {
    this.authService.logout();
  }
}
