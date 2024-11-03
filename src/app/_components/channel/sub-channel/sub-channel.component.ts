import { AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sub-channel',
  templateUrl: './sub-channel.component.html',
  styleUrls: ['./sub-channel.component.css']
})
export class SubChannelComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked, OnDestroy {


  @Input() ticketPrice: number = 100000; // Giá mỗi vé
  ticketCount: number = 1;               // Số lượng vé
  totalPrice: number = 0;                 // Tổng tiền

  ngOnInit() {
    console.log('ngOnInit: Khởi tạo dữ liệu ban đầu.');
    this.calculateTotal(); // Khởi tạo tổng tiền ngay khi component được load
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges: Có sự thay đổi ở Input:', changes);
    if (changes['ticketPrice']) {
      this.calculateTotal(); // Cập nhật tổng tiền nếu giá vé thay đổi
    }
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit: View con đã được khởi tạo.');
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked: Đảm bảo tổng tiền luôn chính xác.');
    this.checkTotal(); // Đảm bảo tổng tiền hiển thị đúng sau mỗi lần view cập nhật
  }

  ngOnDestroy() {
    console.log('ngOnDestroy: Dọn dẹp tài nguyên khi component bị hủy.');
  }

  calculateTotal() {
    this.totalPrice = this.ticketPrice * this.ticketCount;
  }

  checkTotal() {
    // Đảm bảo tổng tiền được hiển thị chính xác (chỉ ví dụ, thêm log kiểm tra)
    if (this.totalPrice !== this.ticketPrice * this.ticketCount) {
      console.warn('Tổng tiền không khớp, tính lại.');
      this.calculateTotal();
    }
  }

}
