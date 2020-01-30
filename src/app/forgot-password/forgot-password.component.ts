import {Component, OnInit} from '@angular/core';
import {Globals} from "../globals";
import {MainService} from "../_services/main.service";
import {Router} from "@angular/router";

declare var $;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private mainService: MainService, private router: Router, private globals: Globals) {
  }

  code;
  phoneNumber;
  storePhoneNum;

  ngOnInit() {
    // $('#sendAgain').on('click',function () {
    //   alert('clickecddddd')
    // })
  }


  changePass() {
    if (!this.phoneNumber) {
      this.showNotify('لطفا شماره همراه را وارد نمایید', 'error');
      return
    }

    this.mainService.forgetPassword(this.phoneNumber).subscribe(
      data => {
        console.log(data);
        if (data[0].message === "Succeed") {
          this.storePhoneNum = this.phoneNumber;
          this.showNotify('کد برای شما ارسال شد', 'success');
          this.phoneNumber = undefined;
          $('.sendCode').removeClass('showHide');
          $('.sendPhone').addClass('showHide');
          let display = document.querySelector('#time');
          $('#sendAgain').attr('disabled', 'disabled');
          var fiveMinutes = 60 * 2;
          display = document.querySelector('#timer');
          // this.startTimer(fiveMinutes, display);

        }
        // console.log(data)

      },
      error => {

      }
    )
  }

  verifyCode() {
    if (!this.code) {

      this.showNotify('لطفا کد ارسالی را وارد نمایید', 'error');
      return
    }

    this.mainService.sendVerifyCode(this.storePhoneNum, this.code).subscribe(
      data => {
        if (data[0].message === "Succeed") {
          this.globals.registerPhoneNum = this.storePhoneNum;
          this.router.navigate(['/resetPassword']);

        }
        else if (data[0].message === "Duplicated") {

          this.showNotify('کد وارد شده نادرست است', 'error');

          return
        }
        // console.log(data)

      },
      error => {

      }
    )
  }


  // startTimer(duration: any, display) {
  //   var timer: any = duration, minutes:any, seconds:any;
  //   let refreshId:any = setInterval(function () {
  //     minutes = parseInt(timer / 60, 10)
  //     seconds = parseInt(timer % 60, 10);
  //
  //     minutes = minutes < 10 ? "0" + minutes : minutes;
  //     seconds = seconds < 10 ? "0" + seconds : seconds;
  //
  //     display.textContent = minutes + ":" + seconds;
  //
  //     if (--timer < 0) {
  //       timer = 0;
  //       $('#sendAgain').prop("disabled", false);
  //       $('#sendAgain').css('background-color', 'white !important');
  //       clearInterval(refreshId);
  //
  //       return;
  //     }
  //   }, 1000);
  //
  // }


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
