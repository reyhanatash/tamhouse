import {Component, OnInit} from '@angular/core';
import {UtilService} from '../_services/util.service';
import {Router} from '@angular/router';
import {Globals} from '../globals';
import {MainService} from '../_services/main.service';

declare var $: any;

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  constructor(private utilService: UtilService, private mainService: MainService, private router: Router, private globals: Globals) {
  }

  courseList: any = []

  ngOnInit() {
    this.getMyCourseList();
  }


  getMyCourseList() {

    this.mainService.getMyCourseList().subscribe(
      data => {

        this.courseList = data.data;
        console.log(this.courseList)

      },
      error => {

      }
    );

    setTimeout(() => {
      var source =
        {
          localdata: this.courseList,
          datafields:
            [
              {name: 'FLD_AMOUNT_GROUP_HOURS', type: 'string'},
              {name: 'FLD_AMOUNT_OF_COURSE_MATERIAL', type: 'string'},
              {name: 'FLD_BOW_NUMBER', type: 'number'},
              {name: 'FLD_BSN_NUMBER', type: 'string'},
              {name: 'FLD_CONTACT_NUMBER', type: 'string'},
              {name: 'FLD_FK_STUDENT_GROUP', type: 'number'},
              {name: 'FLD_HOURLY_RATE', type: 'string'},
              {name: 'FLD_PARTICIPATED_HOURS', type: 'string'},
              {name: 'FLD_PARTICIPATED_HOURS_ONA', type: 'string'},
              {name: 'FLD_PK_STUDENT_AGGREMENT', type: 'number'},
              {name: 'FLD_REGISTRATION_END_DATE', type: 'date'},
              {name: 'FLD_REGISTRATION_START_DATE', type: 'date'},
              {name: 'FLD_TOTAL_AMOUNT', type: 'string'},
              {name: 'FLD_TYPE_OF_CHANGE', type: 'number'},
              {name: 'FLD_TYPE_OF_COURESE', type: 'number'},
              {name: 'FLD_GROUP_NAME', type: 'string'},
              {name: 'FLD_STUDENT_NAME', type: 'string'},
              {name: 'FLD_COURSE_NAME', type: 'string'},
              {name: 'CHANGE_NAME', type: 'string'},
              {name: 'FLD_AMOUNT_GROUP_HOURS', type: 'string'},
              {name: 'FLD_AMOUNT_OF_COURSE_MATERIAL', type: 'string'}


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
          autoheight: true,
          columnsresize: true,
          rtl: true,
          pagesizeoptions: ['10', '20', '50', '100'],
          columns: [
            {
              text: '#', sortable: false, filterable: false, editable: false,
              groupable: false, draggable: false, resizable: false,
              datafield: '', columntype: 'number', width: '5%',
              cellsrenderer: function (row, column, value) {
                return '<div style=\'margin:4px;color: #111010;text-align: center\'>' + (value + 1) + '</div>';
              }
            },
            {
              text: 'نام دوره',
              datafield: 'FLD_CONTACT_NUMBER',
              width: '35%',
              cellsalign: 'right'

            },
            {
              text: 'نام دوره',
              datafield: 'FLD_STUDENT_NAME',
              width: '20%',
              cellsalign: 'right'

            },
            {
              text: 'تاریخ شروع درس',
              datafield: 'FLD_GROUP_NAME',
              width: '25%',
              cellsalign: 'right'

            },
            {
              text: 'بیشتر',
              datafield: 'FLD_COURSE_NAME',
              width: '15%',
              cellsalign: 'right'

            },


          ]
        });
    }, 500);

  }

}
