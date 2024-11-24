import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_services/alert/alert.service';
import { ChannelModel } from 'src/app/models/channel.model';
import { AuthService } from 'src/app/service/auth.service';
import { ChannelService } from 'src/app/service/channel/channel.service';
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
  constructor(
    private dialog: MatDialog,
    authService: AuthService,
    private channelService: ChannelService,
    private alertService: AlertService) {
    super(authService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
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
