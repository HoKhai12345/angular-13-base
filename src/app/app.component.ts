import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-18';

constructor(private store: Store<{auth: { showLoginPopup: boolean }}>) {

}
  ngOnInit(): void {
  }
}
