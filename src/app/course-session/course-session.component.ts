import {Component, OnInit} from '@angular/core';
import * as moment from 'jalali-moment';
import {MainService} from '../_services/main.service';
import {Globals} from '../globals';
import {Router} from '@angular/router';
import swal from "sweetalert2";

declare var $: any;

@Component({
  selector: 'app-course-session',
  templateUrl: './course-session.component.html',
  styleUrls: ['./course-session.component.css']
})
export class CourseSessionComponent implements OnInit {

  constructor(private mainService: MainService, private globals: Globals, private router: Router) {
  }

  sessionStartDate;
  sessionEndDate;
  currentDate;
  coursePublishDate;
  hasFile;
  sessionName;
  selectedBasicSession;
  selectedExamType;

  basicSessionList: any = [];
  examTypeList: any = [];
  fileUrl;
  examTime;
  repeatCount;
  questionCount;
  isFree;

  examDesc;
  examScore;
  minScore;
  datePickerConfig;
  selectedSessionType;

  sessionList: any = [
    {
      name: 'کلاس',
      id: 1
    },
    {
      name: 'آزمون/تکلیف',
      id: 2
    }
  ];

  sesssionList: any = [];
  filterMode = false;

  ngOnInit() {

    this.getCourseSessionList();
    let currentDate = new Date();
    let str = moment(currentDate).format('jYYYY/jMM/jD');
    this.currentDate = moment(str, 'YYYY/MM/DD')
      .locale('fa')
      .format('YYYY/MM/DD');


    ($('#audienceIds')as any).select2({
      placeholder: 'جلسه پایه ...',
      dir: 'rtl',
      allowClear: true,
      width: '100%'
    });
  }


  getSelectedDate() {
    if (this.sessionStartDate !== undefined) {
      var date = this.sessionStartDate.format('jYYYY/jMM/jD');
    }
  }

  getSelectedEDate() {
    if (this.sessionEndDate !== undefined) {
      var date = this.sessionEndDate.format('jYYYY/jMM/jD');
    }
  }

  showNewSession() {
    ($('#myModal')as any).modal('show');
  }

  getCourseSessionList() {
    this.globals.selectedCourseID = localStorage.getItem('courseId');
    if (this.globals.selectedCourseID !== undefined) {
      let id = this.globals.selectedCourseID;
      this.mainService.getSessionCourseList(id).subscribe(
        data => {


          this.sesssionList = data.data;
          console.log(this.sesssionList);
          var DateRenderer = function (row, datafield, value) {
            // var datarow = ($('#courseSessionList') as any).jqxGrid('getrowdata', row);
            if (value !== "") {
              let date = moment(value).locale('fa').format('YYYY/MM/DD');
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
          // fldPkCourseStepCo: 202
          // fldDeleted: false
          // fldTitle: "جلسه صفر ادبیات (تحلیل ساختاری ادبیات در کنکور)"
          // fldKeyword: null
          // fldFkCourseCo: 111171
          // fldType: 1
          // fldIsFree: true
          // fldIndex: 0
          // fldRate: 0
          // fldRateCount: 0
          // fldEndDateTime: "2019-08-21T23:15:00"
          // fldStartDateTime: "2019-08-21T20:45:00"
          // fldHasFile: true
          // fldFileUrl: "https://tamland.ir/wp-content/uploads/2019/12/Adabiat_S0_Tamland.pdf"
          // fldIsEnded: false
          // fldIsStarted: false
          // fldPreRollSkipTime: null
          // fldPreRollSource: null
          // fldVideoSource: null
          // fldFkBaseCourseStepCo: null
          // fldCustomCourseTitle: null
          // fldCustomTitle: null
          // fldStreamId: "KQuLM"
          var endStart = function (row, datafield, value) {
            if (value !== null) {
              if (value === true) {
                return (
                  '<p style="text-align: center;margin-top: 10px;margin-bottom: 0px">بله</p>'
                );
              } else {
                return (
                  '<p style="text-align: center;margin-top: 10px;margin-bottom: 0px">خیر</p>'
                );
              }


            }
          }


          var source =
            {
              localdata: this.sesssionList,
              datafields:
                [
                  {name: 'fldPkCourseStepCo', type: 'number'},
                  {name: 'FldDeleted', type: 'boolean'},
                  {name: 'FldHasFile', type: 'boolean'},
                  {name: 'FldIsEnded', type: 'boolean'},
                  {name: 'FldIsStarted', type: 'boolean'},
                  {name: 'fldTitle', type: 'string'},
                  {name: 'FldKeyword', type: 'number'},
                  {name: 'FldFkCourseCo', type: 'number'},
                  {name: 'FldFileUrl', type: 'string'},
                  {name: 'FldPreRollSkipTime', type: 'string'},
                  {name: 'FldPreRollSource', type: 'string'},
                  {name: 'FldVideoSource', type: 'string'},
                  {name: 'FldFkBaseCourseStepCo', type: 'number'},
                  {name: 'FldCustomCourseTitle', type: 'string'},
                  {name: 'FldCustomTitle', type: 'string'},
                  {name: 'FldStreamId', type: 'string'},
                  {name: 'fldEndDateTime', type: 'date'},
                  {name: 'fldStartDateTime', type: 'date'},
                  {name: 'FldStepCount', type: 'number'},
                  {name: 'FldType', type: 'number'},
                  {name: 'FldIsFree', type: 'number'},
                  {name: 'FldIndex', type: 'number'},
                  {name: 'FldRate', type: 'number'},
                  {name: 'FldRateCount', type: 'number'}


                ],
              datatype: 'array'
            };
          let mythis = this;

          var dataAdapter = new $.jqx.dataAdapter(source);
          ($('#courseSessionList') as any).jqxGrid(
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
                  text: 'شناسه',
                  datafield: 'fldPkCourseStepCo',
                  width: '7%',
                  cellsalign: 'center',
                  align: 'center',

                },

                {
                  text: 'عنوان',
                  datafield: 'fldTitle',
                  width: '28%',
                  cellsalign: 'center',
                  align: 'center',

                },
                {
                  text: ' زمان شروع',
                  datafield: 'fldStartDateTime',
                  width: '10%',
                  align: 'center',
                  cellsalign: 'center',
                  cellsrenderer: DateRenderer

                },
                {
                  text: ' زمان پایان',
                  datafield: 'fldEndDateTime',
                  width: '10%',
                  align: 'center',
                  cellsalign: 'center',
                  cellsrenderer: DateRenderer

                },
                {
                  text: 'اولویت',
                  datafield: 'FldIndex',
                  width: '8%',
                  columntype: 'custom',
                  align: 'center',
                  cellsalign: 'center',
                  sortable: false,
                },
                {
                  text: 'مرحله مجانی ؟',
                  datafield: 'FldIsFree',
                  width: '10%',
                  columntype: 'custom',
                  align: 'center',
                  sortable: false,
                  cellsrenderer: endStart
                },
                {
                  text: 'ایجاد سوال',
                  datafield: 'createQuestion',
                  width: '10%',
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
                      '    background-color: #17a2b8;margin-left: 15px;\n' +
                      '    color: white;">ایجاد سوال</button>');
                    $(htmlElement).append(button);

                    button.click(function (event) {
                      var paginginfo = ($('#courseSessionList')as any).jqxGrid('getpaginginformation');
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

                      var rows = ($('#courseSessionList') as any).jqxGrid('getrows');
                      if (rows.length !== mythis.sesssionList.length) {
                        mythis.filterMode = true;
                      }
                      if (mythis.filterMode === true) {
                        var rows = ($('#courseSessionList') as any).jqxGrid('getrows');
                        var index = rows.findIndex(x => x.boundindex === row.bounddata.boundindex);
                        var selectedRow = rows[index];
                        datarow = ($('#courseSessionList') as any).jqxGrid('getrowdata', selectedRow.dataindex);
                        Id = datarow.FldPkCourseStepCo;
                        mythis.filterMode = false;
                      }
                      else {
                        datarow = ($('#courseSessionList') as any).jqxGrid('getrowdata', rowid);
                        Id = datarow.FldPkCourseStepCo;
                      }


                      mythis.globals.selectedSessionId = Id;
                      localStorage.setItem('sessionID', mythis.globals.selectedSessionId);
                      mythis.router.navigate(['/question']);

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
                      var paginginfo = ($('#courseSessionList')as any).jqxGrid('getpaginginformation');
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

                      var rows = ($('#courseSessionList') as any).jqxGrid('getrows');
                      if (rows.length !== mythis.sesssionList.length) {
                        mythis.filterMode = true;
                      }
                      if (mythis.filterMode === true) {
                        var rows = ($('#courseSessionList') as any).jqxGrid('getrows');
                        var index = rows.findIndex(x => x.boundindex === row.bounddata.boundindex);
                        var selectedRow = rows[index];
                        datarow = ($('#courseSessionList') as any).jqxGrid('getrowdata', selectedRow.dataindex);
                        Id = datarow.FldPkCourseCo;
                        mythis.filterMode = false;
                      }
                      else {
                        datarow = ($('#courseSessionList') as any).jqxGrid('getrowdata', rowid);
                        Id = datarow.FldPkCourseCo;
                      }


                      // var index = rows.findIndex(x => x.visibleindex === rowid);
                      // mythis.filterMode = false;

                    });
                    button1.click(function (event) {
                      var paginginfo = ($('#courseSessionList')as any).jqxGrid('getpaginginformation');
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

                      var rows = ($('#courseSessionList') as any).jqxGrid('getrows');
                      if (rows.length !== mythis.sesssionList.length) {
                        mythis.filterMode = true;
                      }
                      if (mythis.filterMode === true) {
                        var rows = ($('#courseSessionList') as any).jqxGrid('getrows');
                        var index = rows.findIndex(x => x.boundindex === row.bounddata.boundindex);
                        var selectedRow = rows[index];
                        datarow = ($('#courseSessionList') as any).jqxGrid('getrowdata', selectedRow.dataindex);
                        Id = datarow.fldPkCourseStepCo;
                        mythis.filterMode = false;
                      }
                      else {
                        datarow = ($('#courseSessionList') as any).jqxGrid('getrowdata', rowid);
                        Id = datarow.fldPkCourseStepCo;
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
                        title: 'آیا از حذف این جلسه مطمئن هستید ؟',
                        text: '' + courseName + ' حذف خواهد شد ',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'بله انجام بده',
                        cancelButtonText: 'منصرف شدم',
                        reverseButtons: true
                      }).then((result) => {
                        if (result.value) {
                          mythis.mainService.deleteCourseSession(Id).subscribe(data => {

                              if (data.data[0].message === 'Succeed') {
                                // alertify.success(data[0].message);
                                swalWithBootstrapButtons.fire('موفق',
                                  'حذف با موفقیت انجام شد',
                                  'success'
                                );
                                mythis.getCourseSessionList();

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
          ($('#courseSessionList') as any).jqxGrid('localizestrings', this.globals.localizationobj);

        },
        error => {

        }
      )
    }


  }

}
