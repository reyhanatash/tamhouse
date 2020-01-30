import { Component, OnInit } from '@angular/core';
import * as moment from 'jalali-moment';


declare var $: any;

@Component({
  selector: 'app-discount-code',
  templateUrl: './discount-code.component.html',
  styleUrls: ['./discount-code.component.css']
})
export class DiscountCodeComponent implements OnInit {

  
  constructor() { }
  datePickerConfig;
  activateDate;
  expireDate;
  currentDate;
  disPercent;
  count;
  prefix;
  codeName;
  selectedAudiences: any = [];
  audienceList: any = [];
  phoneNumber;
  codeLength;
  
  selectedPackages: any = [];
  packageList: any = [];

  ngOnInit() {

    let currentDate = new Date();
    let str = moment(currentDate).format("jYYYY/jMM/jD");
    this.currentDate = moment(str, "YYYY/MM/DD")
      .locale("fa")
      .format("YYYY/MM/DD");

      ($('#audienceIds')as any).select2({
        placeholder: 'کلاس ...',
        allowClear: true,
        dir: "rtl",
        width: '100%'
      });
      ($('#packageIds')as any).select2({
        placeholder: 'بسته ...',
        allowClear: true,
        dir: "rtl",
        width: '100%'
      });

  }

  getSelectedDate() {
    if (this.activateDate !== undefined) {
      var date = this.activateDate.format("jYYYY/jMM/jD");
    }
  }
  
  getESelectedDate() {
    if (this.expireDate !== undefined) {
      var date = this.expireDate.format("jYYYY/jMM/jD");
    }
  }

  showNewCode() {
    ($('#myModal')as any).modal('show');
  }

}
