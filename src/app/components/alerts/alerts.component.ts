import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  showPopup$ = this.store.select((state) => {
    state.auth.showLoginPopup
});

  constructor( private store: Store<{auth: { showLoginPopup: boolean }}>) { }

  ngOnInit(): void {
  console.log("showPopup$", this.showPopup$);
  }
 
 

}
