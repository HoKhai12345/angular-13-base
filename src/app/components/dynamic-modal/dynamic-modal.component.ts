import {Component, EventEmitter, Injectable, Input, OnInit, Output} from '@angular/core';
@Component({
  selector: 'app-dynamic-modal',
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.css']
})
export class DynamicModalComponent implements OnInit {
  @Input() title!: string; // Tiêu đề modal
  @Input() childComponent!: any; // Component động được nhúng
  @Input() childInjector!: any; // Injector truyền dữ liệu vào childComponent
  @Output() close = new EventEmitter<void>(); // Sự kiện đóng modal
  @Output() saveChanges = new EventEmitter<void>(); // Sự kiện lưu
  @Output() save = new EventEmitter<any>(); // Modal emit khi component con emit


  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit();
  }

  // save() {
  //   this.saveChanges.emit();
  // }

}
