import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit, OnChanges {

  activeAlert = false;
  showPopup$ = this.store.select((state) => {
    console.log("+++++++++", state, state.auth.activeAlert);
    return state.auth.activeAlert;
});

  constructor( private store: Store<{auth: { showLoginPopup: boolean, activeAlert: boolean }}>) { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log("showPopup$", this.showPopup$);
  }
 
 

}
