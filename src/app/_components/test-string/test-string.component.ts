import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {VisualizeService} from "../../_services/visualize/visualize.service";

@Component({
  selector: 'app-test-string',
  templateUrl: './test-string.component.html',
  styleUrls: ['./test-string.component.css']
})
export class TestStringComponent implements OnInit, OnDestroy {
  isVisible = false;
  private sub: Subscription | undefined;

  constructor(private visualizeService: VisualizeService) { }

  ngOnInit(): void {
    this.sub = this.visualizeService.visualize$.subscribe(type => {
      this.isVisible = type === 'string';
      if (this.isVisible) {
        console.log('String Component Visible');
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
