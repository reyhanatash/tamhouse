import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Globals } from "../globals";
import { MainService } from "../_services/main.service";
import { UtilService } from '../_services/util.service';
declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  phoneNumber;
  password;

  constructor(private cookieService: CookieService, private router: Router,
    private mainService: MainService, private globals: Globals,private utilService:UtilService) {
  }


  ngOnInit() {
  }

  login() {
    //if login currect set coockie

    if (!this.phoneNumber || !this.password) {
      this.utilService.showNotify('لطفا شماره همراه و رمز عبور را وارد نمایید', 'error');
      return
    }
    this.mainService.login(this.phoneNumber, this.password).subscribe(
      data => {

        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
          this.cookieService.set('secret', data.secret);
          this.router.navigate(['/courses']);
        }
      },
      error => {
        if (error.error['error'] === 'invalid_grant') {
          this.utilService.showNotify('نام کاربری یا رمز عبور اشتباه است', 'error');
          return
        }

      }
    )
  }



}
