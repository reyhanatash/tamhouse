import {Component, OnInit} from '@angular/core';
import {MainService} from '../_services/main.service';
import {Globals} from '../globals';
import {Router} from '@angular/router';
import {UtilService} from '../_services/util.service';
import swal from "sweetalert2";
import * as moment from 'jalali-moment';

declare var $: any;

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {

  constructor(private mainService: MainService, private globals: Globals,
              private router: Router, private utilService: UtilService) {
  }

  packTypeList: any = [];
  systemTypeList: any = [];
  courseList: any = [];
  audienceList: any = [];
  TargetList: any = [];
  selectedPackType;
  description;
  title;
  selectedSystemType;
  selectedCourses;
  selectedAudiences;
  selectedTargets;
  discPercent;
  packageList: any = [];
  filterMode = false;

  ngOnInit() {

    this.getPackageList();


    ($('#audiences')as any).select2({
      placeholder: 'رشته تحصیلی خود را انتخاب کنید ...',
      allowClear: true,
      dir: 'rtl',
      width: '100%'
    });

    ($('#targetStage')as any).select2({
      placeholder: 'پایه ها ...',
      allowClear: true,
      dir: 'rtl',
      width: '100%'
    });


    ($('#courses')as any).select2({
      placeholder: 'دوره ها ...',
      allowClear: true,
      dir: 'rtl',
      width: '100%'
    });

  }

  showNewPackage() {
    ($('#myModal')as any).modal('show');
  }

  getPackageList() {
    this.mainService.getPackageList().subscribe(
      data => {

        this.packageList = data.data;

        var source =
          {
            localdata: this.packageList,
            datafields:
              [
                {name: 'fldTitle', type: 'string'},
                {name: 'fldPkPackageCo', type: 'number'},
                {name: 'fldDescription', type: 'string'},
                {name: 'fldStartDateTime', type: 'date'},
                {name: 'fldIsActive', type: 'boolean'},
                {name: 'fldDeleted', type: 'boolean'},
                {name: 'fldPublishDate', type: 'date'},
                {name: 'fldDiscountPercentage', type: 'string'},
                {name: 'fldIsOffered', type: 'boolean'},
                {name: 'fldIndex', type: 'number'},
                {name: 'fldFkStageCo', type: 'number'}
              ],
            datatype: 'array'
          };
        let mythis = this;
        var DateRenderer = function (row, datafield, value) {
          var datarow = ($('#packageList') as any).jqxGrid('getrowdata', row);
          if (datarow['fldStartDateTime'] !== null) {
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
        var dataAdapter = new $.jqx.dataAdapter(source);
        ($('#packageList') as any).jqxGrid(
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
                text: 'کد بسته',
                datafield: 'fldPkPackageCo',
                width: '10%',
                cellsalign: 'center',
                align: 'center',

              },
              {
                text: 'نام بسته',
                datafield: 'fldTitle',
                width: '35%',
                cellsalign: 'center',
                align: 'center',

              },
              {
                text: 'تاریخ',
                datafield: 'fldStartDateTime',
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
                    var paginginfo = ($('#packageList')as any).jqxGrid('getpaginginformation');
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

                    var rows = ($('#packageList') as any).jqxGrid('getrows');
                    if (rows.length !== mythis.courseList.length) {
                      mythis.filterMode = true;
                    }
                    if (mythis.filterMode === true) {
                      var rows = ($('#packageList') as any).jqxGrid('getrows');
                      var index = rows.findIndex(x => x.boundindex === row.bounddata.boundindex);
                      var selectedRow = rows[index];
                      datarow = ($('#packageList') as any).jqxGrid('getrowdata', selectedRow.dataindex);
                      Id = datarow.FldPkCourseCo;
                      mythis.filterMode = false;
                    }
                    else {
                      datarow = ($('#packageList') as any).jqxGrid('getrowdata', rowid);
                      Id = datarow.FldPkCourseCo;
                    }


                    // var index = rows.findIndex(x => x.visibleindex === rowid);
                    // mythis.filterMode = false;

                  });
                  button1.click(function (event) {
                    var paginginfo = ($('#packageList')as any).jqxGrid('getpaginginformation');
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

                    var rows = ($('#packageList') as any).jqxGrid('getrows');
                    if (rows.length !== mythis.courseList.length) {
                      mythis.filterMode = true;
                    }
                    if (mythis.filterMode === true) {
                      var rows = ($('#packageList') as any).jqxGrid('getrows');
                      var index = rows.findIndex(x => x.boundindex === row.bounddata.boundindex);
                      var selectedRow = rows[index];
                      datarow = ($('#packageList') as any).jqxGrid('getrowdata', selectedRow.dataindex);
                      Id = datarow.fldPkPackageCo;
                      mythis.filterMode = false;
                    }
                    else {
                      datarow = ($('#packageList') as any).jqxGrid('getrowdata', rowid);
                      Id = datarow.fldPkPackageCo;
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
                      title: 'آیا از حذف این بسته مطمئن هستید ؟',
                      text: 'دوره ' + courseName + ' حذف خواهد شد ',
                      type: 'warning',
                      showCancelButton: true,
                      confirmButtonText: 'بله انجام بده',
                      cancelButtonText: 'منصرف شدم',
                      reverseButtons: true
                    }).then((result) => {
                      if (result.value) {
                        mythis.mainService.deletePackage(Id).subscribe(data => {

                            if (data.data[0].message === 'Succeed') {
                              // alertify.success(data[0].message);
                              swalWithBootstrapButtons.fire('موفق',
                                'حذف با موفقیت انجام شد',
                                'success'
                              );
                              mythis.getPackageList();

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

      }
    );
  }


}
