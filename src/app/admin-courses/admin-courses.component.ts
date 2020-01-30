import {Component, OnInit} from '@angular/core';
import * as moment from 'jalali-moment';
import {
  DropzoneComponent, DropzoneDirective,
  DropzoneConfigInterface
} from 'ngx-dropzone-wrapper';
import {MainService} from '../_services/main.service';
import {Globals} from '../globals';
import {Router} from '@angular/router';
import {UtilService} from '../_services/util.service';
import swal from 'sweetalert2';

declare var $;

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.css']
})
export class AdminCoursesComponent implements OnInit {

  constructor(private mainService: MainService, private globals: Globals,
              private router: Router, private utilService: UtilService) {
  }

  courseStartDate;
  currentDate;
  coursePublishDate;

  selectedTeachers: any = [];
  selectedAudiences: any = [];
  selectedTargets: any = [];
  audienceList: any = [];
  teacherList: any = [];
  targetList: any = [];
  files: File[] = [];
  courseTitle;
  courseDescEn;
  courseDesc;
  courseStartDesc;
  selectedCourseType;
  selectedSystemLevel;
  price;
  priceRegion1;
  priceRegion2;
  priceRegion3;
  index;
  isActive;
  filterMode = false;
  datePickerConfig;

  configUploader: DropzoneConfigInterface = {
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    'acceptedFiles': 'image/*',
    maxFilesize: 2
  };

  systemLevelList = [
    {
      name: 'قدیم',
      id: 1,
    },
    {
      name: 'جدید',
      id: 2,
    },
    {
      name: 'قدیم و جدید',
      id: 3,
    }
  ];
  courseTypeList = [
    {
      name: 'سالانه',
      id: 1,
    },
    {
      name: 'فوق العاده',
      id: 2,
    },
    {
      name: 'آزمون دوره',
      id: 3,
    }
  ]


  courseList: any = [];
  uploadFile: any = {};
  stageList: any = {}

  ngOnInit() {
    this.getCourseList();
    this.getAudienceList();
    this.getTeacherList();
    this.getStageList();
    let currentDate = new Date();
    let str = moment(currentDate).format('jYYYY/jMM/jD');
    this.currentDate = str;
    // moment(str, 'YYYY/MM/DD')
    //   .locale('fa')
    //   .format('YYYY/MM/DD');


    ($('#audienceIds')as any).select2({
      placeholder: 'رشته تحصیلی خود را انتخاب کنید ...',
      allowClear: true,
      dir: 'rtl',
      width: '100%'
    });

    ($('#teachers')as any).select2({
      placeholder: 'مدرسین  ...',
      allowClear: true,
      dir: 'rtl',
      width: '100%'
    });

    ($('#targetCourseStageIds')as any).select2({
      placeholder: 'پایه ها ...',
      allowClear: true,
      dir: 'rtl',
      width: '100%'
    });
  }

  showNewCourse() {
    ($('#myModal')as any).modal('show');
  }

  getSelectedStartDate() {
    if (this.courseStartDate !== undefined) {
      var date = this.courseStartDate.format('jYYYY/jMM/jD');
    }
  }

  getSelectedPublishDate() {
    if (this.coursePublishDate !== undefined) {
      var datepublsh = this.coursePublishDate.format('jYYYY/jMM/jD');
    }
  }

  onRemove(event) {
    this.files = [];
    $('.selectedCourseFile').removeClass('upladeFile');
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSelect(event) {
    if (this.files.length > 0) {
      this.utilService.showNotify('تنها مجاز به آپلود یک فایل  در این قسمت  می باشید', 'warning');
    }
    else {
      $('.selectedCourseFile').addClass('upladeFile');
      // console.log(event);
      this.files.push(...event.addedFiles);
      let splitname = this.files[0].name.split('.');
      this.uploadFile['name'] = this.files[0].name;
      this.utilService.getBase64(this.files[0]).then(data => {

        this.uploadFile['baseuploadFi'] = data;

      });
      setTimeout(() => {
        console.log(this.uploadFile['baseuploadFi']);
      }, 1000);
    }

  }

  getAudienceList() {
    this.mainService.getAudienceList(-1).subscribe(
      data => {
        this.audienceList = data.data;
      },
      error => {

      }
    );
  }

  getTeacherList() {
    this.mainService.getTeacherList(-1).subscribe(
      data => {
        this.teacherList = data.data;
        console.log(this.teacherList);
      },
    );
  }

  getCourseList() {
    this.mainService.getCourseList().subscribe(data => {

        this.courseList = data.data;
        // console.log(this.courseList);
        var DateRenderer = function (row, datafield, value) {
          var datarow = ($('#courseList') as any).jqxGrid('getrowdata', row);
          if (datarow['FldStartDateTime'] !== null) {
            let date = moment(datarow['FldStartDateTime']).locale('fa').format('YYYY/MM/DD');
            // var m = moment(date);
            // m.locale('fa');
            // let shamsi =m.format("YYYY/MM/DD");
            return (
              '<p style="text-align: center;margin-top: 10px;margin-bottom: 0px">' + date + '</p>'
            );
          }
          else {
          }


        };

        var activeCourse = function (row, datafield, value) {
          if (value === true) {
            return (
              '<p style="text-align: center;margin-top: 10px;margin-bottom: 0px">بله</p>'
            );
          }
          else if (value === false) {
            return (
              '<p style="text-align: center;margin-top: 10px;margin-bottom: 0px">خیر</p>'
            );
          }


        };
        var source =
          {
            localdata: this.courseList,
            datafields:
              [
                {name: 'fldTitle', type: 'string'},
                {name: 'fldDescription', type: 'string'},
                {name: 'fldPkCourseCo', type: 'number'},
                {name: 'fldKeyword', type: 'number'},
                {name: 'fldPriceRegion1', type: 'string'},
                {name: 'fldPriceRegion2', type: 'string'},
                {name: 'fldPriceRegion3', type: 'string'},
                {name: 'fldStartDateTime', type: 'date'},
                {name: 'fldStepCount', type: 'number'},
                {name: 'fldCourseStartDescription', type: 'string'},
                {name: 'fldFullName', type: 'string'},
                {name: 'fldType', type: 'number'},
                {name: 'fldSystem', type: 'number'},
                {name: 'fldIndex', type: 'number'},
                {name: 'fldStepCount', type: 'number'},
                {name: 'fldIsOffered', type: 'boolean'},
                {name: 'fldDeleted', type: 'boolean'},
                {name: 'fldGuid', type: 'string'},
                {name: 'fldIsActive', type: 'boolean'},
                {name: 'fldPublishDate', type: 'date'},
                {name: 'fldPrice', type: 'string'},
                {name: 'fldCourseStartDescription', type: 'string'},
                {name: 'fldFkTeacherCo', type: 'number'},
                {name: 'fldFullName', type: 'string'},


              ],
            datatype: 'array'
          };
        let mythis = this;

        var dataAdapter = new $.jqx.dataAdapter(source);
        ($('#courseList') as any).jqxGrid(
          {
            width: '100%',
            source: dataAdapter,
            altrows: true,
            theme: 'material',
            pageable: true,
            sortable: true,
            autoheight: true,
            columnsresize: true,
            rtl: true,
            pagesizeoptions: ['10', '20', '50', '100'],
            columns: [
              {
                text: 'کد دوره',
                datafield: 'fldPkCourseCo',
                width: '10%',
                cellsalign: 'center',
                align: 'center',

              },
              {
                text: 'نام دوره',
                datafield: 'fldTitle',
                width: '35%',
                cellsalign: 'center',
                align: 'center',

              },
              {
                text: 'تاریخ',
                datafield: 'FldStartDateTime',
                width: '8%',
                align: 'center',
                cellsalign: 'center',
                cellsrenderer: DateRenderer

              },
              {
                text: 'فعال ؟',
                datafield: 'fldIsActive',
                width: '8%',
                align: 'center',
                cellsalign: 'center',
                cellsrenderer: activeCourse

              },
              {
                text: 'قیمت ',
                datafield: 'fldPrice',
                width: '8%',
                align: 'center',
                cellsalign: 'center'

              },
              {
                text: 'جلسات',
                datafield: 'session',
                width: '15%',
                columntype: 'custom',
                align: 'center',
                sortable: false,
                filterable: false,
                createwidget: function (row, column, value, htmlElement) {
                  var button = $('<div style="border:none;text-align:center">' +
                    '<button class="btn" style="text-align: center;\n' +
                    '    font-size: 12px !important;\n' +
                    '    border: 1px solid #7ac2de;\n' +
                    '    padding: 4px;\n' +
                    '    margin-top: 5px;\n' +
                    '    background-color: #17a2b8;\n' +
                    '    color: white;">مدیریت جلسات</button></div>');
                  $(htmlElement).append(button);
                  button.click(function (event) {
                    var paginginfo = ($('#courseList')as any).jqxGrid('getpaginginformation');
                    var pagenum = paginginfo.pagenum;
                    var pagesize = paginginfo.pagesize;
                    var rowid;
                    var Id;
                    var datarow;
                    if (pagenum > 0) {
                      rowid = row.bounddata.uid + pagesize * pagenum;
                    } else {
                      rowid = row.bounddata.uid;
                    }

                    var rows = ($('#courseList') as any).jqxGrid('getrows');
                    if (rows.length !== mythis.courseList.length) {
                      mythis.filterMode = true;
                    }
                    if (mythis.filterMode === true) {
                      var rows = ($('#courseList') as any).jqxGrid('getrows');
                      var index = rows.findIndex(x => x.boundindex === row.bounddata.boundindex);
                      var selectedRow = rows[index];
                      datarow = ($('#courseList') as any).jqxGrid('getrowdata', selectedRow.dataindex);
                      Id = datarow.fldPkCourseCo;
                      mythis.filterMode = false;
                    }
                    else {
                      datarow = ($('#courseList') as any).jqxGrid('getrowdata', rowid);
                      Id = datarow.fldPkCourseCo;
                    }

                    mythis.globals.selectedCourseID = Id;
                    localStorage.setItem('courseId', mythis.globals.selectedCourseID);
                    mythis.router.navigate(['/courseSession']);

                    // var index = rows.findIndex(x => x.visibleindex === rowid);
                    // mythis.filterMode = false;

                  });
                },
                initwidget: function (row, column, value, htmlElement) {
                }
              },
              {
                text: 'تغییرات',
                datafield: 'edit',
                width: '20%',
                columntype: 'custom',
                align: 'center',
                sortable: false,
                filterable: false,
                createwidget: function (row, column, value, htmlElement) {
                  var button = $(
                    '<button class="btn" style="text-align: center;\n' +
                    '    font-size: 12px !important;\n' +
                    '    border: 1px solid #e2e2e2;\n' +
                    '    padding: 4px 12px;\n' +
                    '    margin-top: 5px;\n' +
                    '    background-color: #ebebeb;\n' +
                    '    color: black;">تغییر<i class="fa fa-pencil" style="    padding-left: 5px;\n' +
                    '    color: #908787;"></i></button>');
                  var button1 = $(
                    '<button class="btn" style="text-align: center;\n' +
                    '    font-size: 12px !important;\n' +
                    '    border: 1px solid #e2e2e2;\n' +
                    '    padding: 4px 12px;\n' +
                    '    margin-top: 5px;\n' +
                    '    background-color: #ebebeb;\n' +
                    '    color: black;margin-left: 55px;\n' +
                    '    margin-right: 10px;">حذف<i class="fa fa-close" style="    padding-left: 5px;\n' +
                    '    color: #908787;"></i></button>');
                  $(htmlElement).append(button1);
                  $(htmlElement).append(button);

                  button.click(function (event) {
                    alert('button');
                    var paginginfo = ($('#courseList')as any).jqxGrid('getpaginginformation');
                    var pagenum = paginginfo.pagenum;
                    var pagesize = paginginfo.pagesize;
                    var rowid;
                    var Id;
                    var datarow;
                    if (pagenum > 0) {
                      rowid = row.bounddata.uid + pagesize * pagenum;
                    } else {
                      rowid = row.bounddata.uid;
                    }

                    var rows = ($('#courseList') as any).jqxGrid('getrows');
                    if (rows.length !== mythis.courseList.length) {
                      mythis.filterMode = true;
                    }
                    if (mythis.filterMode === true) {
                      var rows = ($('#courseList') as any).jqxGrid('getrows');
                      var index = rows.findIndex(x => x.boundindex === row.bounddata.boundindex);
                      var selectedRow = rows[index];
                      datarow = ($('#courseList') as any).jqxGrid('getrowdata', selectedRow.dataindex);
                      Id = datarow.FldPkCourseCo;
                      mythis.filterMode = false;
                    }
                    else {
                      datarow = ($('#courseList') as any).jqxGrid('getrowdata', rowid);
                      Id = datarow.FldPkCourseCo;
                    }


                    // var index = rows.findIndex(x => x.visibleindex === rowid);
                    // mythis.filterMode = false;

                  });
                  button1.click(function (event) {
                    var paginginfo = ($('#courseList')as any).jqxGrid('getpaginginformation');
                    var pagenum = paginginfo.pagenum;
                    var pagesize = paginginfo.pagesize;
                    var rowid;
                    var Id;
                    var datarow;
                    if (pagenum > 0) {
                      rowid = row.bounddata.uid + pagesize * pagenum;
                    } else {
                      rowid = row.bounddata.uid;
                    }

                    var rows = ($('#courseList') as any).jqxGrid('getrows');
                    if (rows.length !== mythis.courseList.length) {
                      mythis.filterMode = true;
                    }
                    if (mythis.filterMode === true) {
                      var rows = ($('#courseList') as any).jqxGrid('getrows');
                      var index = rows.findIndex(x => x.boundindex === row.bounddata.boundindex);
                      var selectedRow = rows[index];
                      datarow = ($('#courseList') as any).jqxGrid('getrowdata', selectedRow.dataindex);
                      Id = datarow.fldPkCourseCo;
                      mythis.filterMode = false;
                    }
                    else {
                      datarow = ($('#courseList') as any).jqxGrid('getrowdata', rowid);
                      Id = datarow.fldPkCourseCo;
                    }
                    let courseName = datarow.fldTitle;
                    const swalWithBootstrapButtons: any = (swal as any).mixin({
                      customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                      },
                      buttonsStyling: false,
                    });
                    swalWithBootstrapButtons.fire({
                      title: 'آیا از حذف این دوره مطمئن هستید ؟',
                      text: 'دوره ' + courseName + ' حذف خواهد شد ',
                      type: 'warning',
                      showCancelButton: true,
                      confirmButtonText: 'بله انجام بده',
                      cancelButtonText: 'منصرف شدم',
                      reverseButtons: true
                    }).then((result) => {
                      if (result.value) {
                        mythis.mainService.deleteCourse(Id).subscribe(data => {

                            if (data.data[0].message === 'Succeed') {
                              // alertify.success(data[0].message);
                              swalWithBootstrapButtons.fire('موفق',
                                'حذف با موفقیت انجام شد',
                                'success'
                              );
                              mythis.getCourseList();

                            }
                            else {
                              swalWithBootstrapButtons.fire(
                                'ناموفق',
                                data.data[0].message,
                                'error'
                              );
                            }


                          },
                          error => {
                            // let msg = alertify.error('error');
                            // msg.delay(1);
                          }
                        );

                      } else if (
                        // Read more about handling dismissals
                      result.dismiss === (swal as any).DismissReason.cancel
                      ) {
                        swalWithBootstrapButtons.fire(
                          'انصراف',
                          'از ادامه عملیات صرف نظر کردید',
                          'error'
                        );
                      }
                    });

                    // var index = rows.findIndex(x => x.visibleindex === rowid);
                    // mythis.filterMode = false;

                  });
                },
                initwidget: function (row, column, value, htmlElement) {
                }
              },
            ]
          });


      },
      error => {

      });
  }

  getStageList() {
    this.mainService.getStageList(1).subscribe(
      data => {
        this.stageList = data.data;
        console.log(this.stageList);
      },
    );
  }


  saveNewCourse() {

    if (!this.courseTitle || !this.courseDesc || !this.courseDescEn || !this.courseStartDesc ||
      !this.price || !this.priceRegion1 || !this.priceRegion2 || !this.priceRegion3 || this.index) {
      this.utilService.showNotify('لطفا همه فیلد های فرم را پر کنید', 'warning');
      return;
    }
    let dateCourse, publishDate, CourseType, systemLevel, isActive;
    let audienceList: any = [];
    let audienceJson = '';
    if (this.courseStartDate === undefined) {
      dateCourse = this.currentDate;
    } else {
      dateCourse = this.courseStartDate.format('jYYYY/jMM/jD');
    }
    let miladiCourseStartDate: any = moment.from(dateCourse, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');
    if (this.coursePublishDate === undefined) {
      dateCourse = this.currentDate;
    } else {
      dateCourse = this.coursePublishDate.format('jYYYY/jMM/jD');
    }
    let miladiCoursePublishDate: any = moment.from(publishDate, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');
    var items: any = ($('#audienceIds')as any).select2('data');

    if (items.length === 0) {
      this.utilService.showNotify('لطفا رشته تحصیلی را انتخاب نمایید', 'warning');
      return;

    }
    if (this.selectedCourseType === undefined) {
      this.utilService.showNotify('لطفا نوع دوره را انتخاب نمایید', 'warning');
      return;
    }
    else {
      CourseType = this.selectedCourseType.id;
    }
    if (this.selectedSystemLevel === undefined) {
      this.utilService.showNotify('لطفا نوع سیستم آموزشی  را انتخاب نمایید', 'warning');
      return;
    }
    else {
      systemLevel = this.selectedSystemLevel.id;
    }
    var itemsTeacher: any = ($('#teachers')as any).select2('data');

    if (itemsTeacher.length === 0) {
      this.utilService.showNotify('لطفا حداقل یک معلم را انتخاب نمایید', 'warning');
      return;

    }

    if (this.isActive === true) {
      isActive = 0;
    } else {
      isActive = 1;
    }
    for (var i = 0; i < items.length; i++) {
      let splitStr = items[i].id.split(':');
      let sss = splitStr[1].trim();
      var myStr = sss.replace(/"/g, '');
      var strwithOut = myStr.replace(/'/g, '');
      let atId = parseInt(strwithOut);
      audienceList.push(atId);
    }
    for (var i = 0; i < audienceList.length; i++) {
      audienceJson += audienceList[i];
      if (i !== audienceList.length - 1) {
        audienceJson += ',';
      }
    }
  }


}
