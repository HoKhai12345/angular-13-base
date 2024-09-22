import { AfterViewInit, Component, OnInit } from '@angular/core';
import { offset } from '@popperjs/core';
import { ChannelModel } from 'src/app/models/channel.model';
import { ChannelService } from 'src/app/service/channel/channel.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit, AfterViewInit {
  limit = 4;
  offset = 0;
  listChannel: ChannelModel[] = [];
  constructor(private channelService: ChannelService) { }
 

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getData();
  }

  getData(): void {
    const option = {
      limit: this.limit,
      offset: this.offset
    }
    this.channelService.getList(option).subscribe((result) => {
        console.log("********", result.data);
        if (result?.status === 1) {
            this.listChannel = result.data
        }
    });
  };

}
