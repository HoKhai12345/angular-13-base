import { AfterViewInit, Component, OnInit } from '@angular/core';
import { offset } from '@popperjs/core';
import { AlertService } from 'src/app/_services/alert/alert.service';
import { ChannelModel } from 'src/app/models/channel.model';
import { ChannelService } from 'src/app/service/channel/channel.service';
import {VisualizeService} from "../../_services/visualize/visualize.service";
import {debounceTime, delay, distinctUntilChanged, filter, map, of, reduce, scan, Subscription, switchMap} from "rxjs";
import {FormControl} from "@angular/forms";
import {SearchService} from "../../_services/search/search.service";
import {TestService} from "../../_services/test/test.service";
import {HeaderModel} from "../../models/header.model";

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit, AfterViewInit {
  limit = 4;
  offset = 0;
  listChannel: ChannelModel[] = [];
  viewTable: boolean = false;
  isSubmitted = false;
  ticketPrice = 10000 ;

  listVisualizeType = [
    {
    id: 1,
    name: "string",
    },
    {
      id: 2,
      name: "column",
    },
    {
      id: 3,
      name: "table",
    },
  ];
  searchControl = new FormControl();
  searchResults: string[] = [];
  private subscription!: Subscription;
  listHeader: HeaderModel[] | undefined;

  constructor(private searchService: SearchService, private testService: TestService , private channelService: ChannelService, private alertService: AlertService, private visualizeService: VisualizeService) { }


  ngOnInit(): void {
    this.getHeader();
    const fakeApiCall = (userId: number) => of(`User Data for ${userId}`).pipe(delay(1000));

    of(1, 2, 3).pipe(
      switchMap(userId => fakeApiCall(userId))
    ).subscribe(result => console.log("___________", result));
    of(1,2,3,4,5,6,7,8,9,10).pipe(
      filter(num => num % 2 === 0),
      map(num => num * num)
    ).subscribe(num => console.log(num))

    const values = of('số 1', 'số 2', 'số 3', 'số 4', 'số 5');
    // values.pipe(
    //   scan((acc, curr) => acc + curr, 2)
    // ).subscribe(val => console.log(`Tổng từng bước: ${val}`));

    values.pipe(
      reduce((acc, curr) => {
        console.log('acc', acc);
        console.log("curr", curr);
        return acc + curr
      }, 'test')
    ).subscribe(val => console.log(`Tổng cuối: ${val}`));

    this.subscription = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      switchMap(query => this.searchService.search(query)),
    distinctUntilChanged(),
  ).subscribe((results) => {
          return this.searchResults = results;
    });

  }

  ngAfterViewInit(): void {
    this.getData();
  }

  selectVisualize(type: string) {
    this.visualizeService.setVisualize(type);
  }

  getData(): void {
    const option = {
      limit: this.limit,
      offset: this.offset
    }
    this.channelService.getList(option).subscribe((result) => {
        if (result?.status === 1) {
            this.listChannel = result.data
        }
    });
  };

  addChannelState(item: ChannelModel) {
      this.channelService.addChannelItem(item);
      this.alertService.success("Test channel thành công");
  }

  changeView() {
      this.viewTable = !this.viewTable
  }

  handleSubmit() {
    // Mô phỏng việc submit thành công (gọi API thực tế ở đây nếu cần)
    this.simulateFileUpload().then(() => {
      this.isSubmitted = true;
    });
    this.ticketPrice += 1;
  }

  simulateFileUpload(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1000); // Giả lập thời gian tải lên 1 giây
    });
  }

  getHeader() {
    this.listHeader = this.testService.getHeader();
  }

  addHeader(header: HeaderModel) {
      this.testService.addHeader(header);
  }

}
