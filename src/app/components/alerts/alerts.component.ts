import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { AlertService } from 'src/app/_services/alert/alert.service';

interface Alert {
  type: string,
  text: string
}

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})



export class AlertsComponent implements OnInit, OnChanges {
  alertSubject: Alert | null = null;
  private timeoutId: any = null; // Biến để lưu ID của setTimeout

  constructor(private alertService: AlertService) { }
  ngOnInit(): void {
    this.alertService.getSubject().subscribe((result: Alert | null) => {
          this.alertSubject = result;
          if(result) {
            if (this.timeoutId) {
              clearTimeout(this.timeoutId);
            }
    
            this.timeoutId = setTimeout(() => {
              this.closeAlert();
              this.timeoutId = null; // Xóa ID sau khi hoàn thành
            }, 2000);
          }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
 
  closeAlert() {
    this.alertService.clear();
  }
 

}
