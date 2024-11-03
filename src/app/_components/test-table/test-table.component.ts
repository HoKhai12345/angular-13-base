import {Component, OnDestroy, OnInit} from '@angular/core';
import {VisualizeService} from "../../_services/visualize/visualize.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.css']
})
export class TestTableComponent implements OnInit, OnDestroy {
  isVisible = false;
  private sub: Subscription | undefined;

  constructor(private visualizeService: VisualizeService) { }

  ngOnInit(): void {
    this.sub = this.visualizeService.visualize$.subscribe(type => {
      this.isVisible = type === 'table';
      if (this.isVisible) {
        console.log('Table Component Visible');
      }
    });
  }
  reloadData() {
    console.log('Reloading Table Data');
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
