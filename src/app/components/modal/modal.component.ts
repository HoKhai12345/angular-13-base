import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, AfterContentInit  {
  @Input() title: string = '';
  @Input() modalId: string = '';
  @Output() onClose = new EventEmitter<void>();
  @ContentChild('exampleModal') modalContent!: ElementRef;
  @Output() save = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    if (this.modalContent) {
      this.modalContent.nativeElement.style.backgroundColor = 'lightblue';
      console.log('Modal content initialized:', this.modalContent.nativeElement.textContent);
    } else {
      console.warn('No modal content provided.');
    }
  }

  close(): void {
    this.onClose.emit();
  }

  saveData() {
    this.save.emit();
  }
}
