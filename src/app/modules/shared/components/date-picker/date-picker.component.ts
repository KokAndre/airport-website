import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class DatePickerComponent implements OnInit {
  public datePickerStartDate;
  public minDate;
  public maxDate;

  // @Input() hideInput = true;
  @Input() label = 'Date';
  // @Input() minDateText = '';
  // @Input() maxDateText = '';
  // @Input() selectedDate = '';
  @Input() startDate = '';

  @Output() public dateChangedEmit: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    if (this.startDate) {
      this.datePickerStartDate = moment(this.startDate);
    } else {
      this.datePickerStartDate = moment(new Date());
    }

    
    this.minDate = moment(new Date());
    // this.maxDate = moment(this.maxDateText);
  }

  public valueChanged(newDate: any) {
    const valueToEmit = moment(this.startDate).format('YYYY-MM-DD');
    this.dateChangedEmit.emit(valueToEmit);
  }

}
