import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

interface BookingData {
  book_id: string;
  book_date: string;
  time_from: string;
  time_to: string;
  status: string;
  fm_id: string;
  fm_name: string;
  fm_price: string;
  site_id: string;
  domain: string;
  channel_id: string;
  name: string;
  label: string;
  contract: string;
}

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styles: [`
    .table { width: 100%; border-collapse: collapse; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
    .date-picker-form { margin-bottom: 20px; padding: 15px; background: #f5f5f5; }
    .date-picker-form .form-group { margin-right: 15px; display: inline-block; }
  `]
})
export class DynamicTableComponent implements OnInit {
  dateForm: FormGroup;
  dateRanges: { start: string }[] = [];
  rawData: BookingData[] = [];
  timeSlots = ['Sáng', 'Chiều', 'Tối'];

  constructor(private fb: FormBuilder) {
    this.dateForm = this.fb.group({
      startDate: ['2024-04-01'],
      endDate: ['2024-04-05']
    });
  }

  ngOnInit() {
    this.generateFakeData();
    this.updateDateRanges();

    // Subscribe to form changes
    this.dateForm.valueChanges.subscribe(() => {
      this.updateDateRanges();
    });
  }

  updateDateRanges() {
    const startDate = new Date(this.dateForm.get('startDate')?.value);
    const endDate = new Date(this.dateForm.get('endDate')?.value);
    
    this.dateRanges = [];
    let currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      this.dateRanges.push({
        start: `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}`
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  generateFakeData() {
    this.rawData = [
      {
        book_id: "139786",
        book_date: "2024-04-01",
        time_from: "09:30:00",
        time_to: "11:30:00",
        status: "4",
        fm_id: "16",
        fm_name: "Bài loại 3 STREAM 3 PC",
        fm_price: "8000000",
        site_id: "1",
        domain: "kenh14.vn",
        channel_id: "4",
        name: "Trần Thị Trâm Anh",
        label: "Bảo hiểm Hanwha Life",
        contract: "QC1290224"
      },
      // ... thêm fake data khác
    ];
  }

  getTimeSlotContent(dateStr: string, timeSlot: string): string {
    const booking = this.rawData.find(item => {
      const bookDate = new Date(item.book_date);
      const formattedDate = `${String(bookDate.getDate()).padStart(2, '0')}/${String(bookDate.getMonth() + 1).padStart(2, '0')}`;
      
      if (formattedDate !== dateStr) return false;

      const timeHour = parseInt(item.time_from.split(':')[0]);
      
      switch(timeSlot) {
        case 'Sáng':
          return timeHour >= 8 && timeHour < 12;
        case 'Chiều':
          return timeHour >= 12 && timeHour < 17;
        case 'Tối':
          return timeHour >= 17 || timeHour < 8;
        default:
          return false;
      }
    });

    return booking ? booking.domain : '';
  }
}
