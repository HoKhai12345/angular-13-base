import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() label: string = 'Button';
  @Input() type: string = 'button';  // Loại nút: submit, button, reset
  @Input() disabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
