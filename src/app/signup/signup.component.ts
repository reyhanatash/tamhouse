import {Component, OnInit} from '@angular/core';
import {MainService} from "../_services/main.service";
import {Router, ActivatedRoute} from '@angular/router';
import {Globals} from '../globals';
declare var $;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private mainService: MainService, private router: Router, private globals: Globals) {
  }


  phoneNumber;
  code;
  showPhoneNum;

  ngOnInit() {
  }


  signUp() {

    if (!this.phoneNumber) {
      this.showNotify('لطفا شماره همراه را وارد نمایید', 'error');
      return
    }

    this.mainService.signup(this.phoneNumber).subscribe(
      data => {
        console.log(data);
        if (data[0].message === "Succeed") {
          this.showNotify('کد عضویت برای شما ارسال شد', 'success');
          this.showPhoneNum = this.phoneNumber;
          this.phoneNumber = undefined;
          $('#verifyCode').removeClass('showHide');
          $('#signupPhone').addClass('showHide')

        }
        // console.log(data)

      },
      error => {

      }
    )

  }

  correctPhoneNum() {
    $('#verifyCode').addClass('showHide');
    $('#signupPhone').removeClass('showHide')
  }


  sendVerifyCodeRegister() {
    if (!this.code) {

      this.showNotify('لطفا کد ارسالی را وارد نمایید', 'error');
      return
    }

    this.mainService.sendVerifyCode(this.showPhoneNum, this.code).subscribe(
      data => {
        if (data[0].message === "Succeed") {
          this.showNotify('عضویت شما با موفقیت انجام شد', 'success');
          this.globals.registerPhoneNum = this.showPhoneNum;
          this.router.navigate(['/resetPassword']);

        }
        else if (data[0].message === "Duplicated") {

          this.showNotify('این شماره قبلا در سیستم ذخیره شده است', 'error');

          return
        }
        else {

          this.showNotify('کد وارد شده نادرست است', 'error');

          return
        }
        // console.log(data)

      },
      error => {

      }
    )


  }

  showNotify(message, type) {
    ($ as any).notify({
      // options
      icon: 'glyphicon glyphicon-warning-sign',
      message: message,
    }, {
      // settings
      element: 'body',
      position: null,
      type: type,
      allow_dismiss: true,
      newest_on_top: false,
      showProgressbar: false,
      placement: {
        from: "top",
        align: "right"
      },
      offset: 20,
      spacing: 10,
      z_index: 1031,
      delay: 5000,
      timer: 1000,
      url_target: '_blank',
      mouse_over: null,
      animate: {
        enter: 'animated fadeInDown',
        exit: 'animated fadeOutUp'
      },
      onShow: null,
      onShown: null,
      onClose: null,
      onClosed: null,
      icon_type: 'class',
      template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
      '<button type="button" aria-hidden="true" class="close" data-notify="dismiss" style="font-size: 13px">×</button>' +
      '<span data-notify="icon"></span> ' +
      '<span data-notify="title">{1}</span> ' +
      '<span data-notify="message" style="font-size: 11px">{2}</span>' +
      '<div class="progress" data-notify="progressbar">' +
      '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
      '</div>' +
      '<a href="{3}" target="{4}" data-notify="url"></a>' +
      '</div>'
    });
  }

}
