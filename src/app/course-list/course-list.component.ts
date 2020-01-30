import { Component, OnInit } from '@angular/core';
import { MainService } from '../_services/main.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.mainService.getCourseList().subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    })
  }

}
