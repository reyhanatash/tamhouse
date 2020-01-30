import {Injectable} from '@angular/core';

@Injectable()
export class Globals {
  public static signalRCon: any;

  constructor() {
  }

  registerPhoneNum;

   url = 'http://103.215.223.62:555/';
 // url = 'http://localhost:27916/';


  selectedCourseID;
  selectedSessionId;
  filterstringcomparisonoperators = ['بدون مقدار', 'دارای مقدار', 'حاوی', 'حاوی(match case)',
    'حاوی نباشد', 'حاوی نباشد(match case)', 'شروع با', 'شروع با(match case)',
    'پایان با', 'پایان با(match case)', 'مساوی', 'مساوی(match case)', 'خالی', 'not null'];
  filternumericcomparisonoperators = ['مساوی', 'نامساوی', 'کوچکتر از', 'کوچکتر مساوی', 'بزرگتر از', 'بزرگتر مساوی', 'خالی', 'not null'];
  filterdatecomparisonoperators = ['مساوی', 'نامساوی', 'کوچکتر از', 'کوچکتر مساوی', 'بزرگتر از', 'بزرگتر مساوی', 'خالی', 'not null'];
  filterbooleancomparisonoperators = ['مساوی', 'نامساوی'];
  localizationobj: any = {
    'sortascendingstring': 'مرتب سازی صعودی',
    'sortdescendingstring': 'مرتب سازی نزولی',
    'sortremovestring': 'حذف مرتب سازی',
    'filterString': 'اعمال',
    'filterClearString': 'لغو',
    'filtershowrowstring': 'نمایش رکوردهایی که :',
    'filterorconditionstring': 'یا',
    'filterandconditionstring': 'و',
    'emptydatastring': 'داده ای موجود نیست',
    'pagergotopagestring': 'برو به صفحه:',
    'pagershowrowsstring': 'نمایش ردیف های:',
    'pagerrangestring': ' از ',
    'pagerpreviousbuttonstring': 'قبلی',
    'pagernextbuttonstring': 'بعدی',
    'groupsheaderstring': 'جهت گروه بندی یک ستون را بکشید و اینجا رها کنید',
    'groupbystring': ' گروه بندی با این ستون',
    'groupremovestring': 'حذف از گروه بندی',
    'filterstringcomparisonoperators': this.filterstringcomparisonoperators,
    'filternumericcomparisonoperators': this.filternumericcomparisonoperators,
    'filterdatecomparisonoperators': this.filterdatecomparisonoperators,
    'filterbooleancomparisonoperators': this.filterbooleancomparisonoperators,
  };


}



