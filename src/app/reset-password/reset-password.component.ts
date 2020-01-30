import {Component, OnInit} from '@angular/core';
import {MainService} from "../_services/main.service";
import {Router} from "@angular/router";
import {Globals} from "../globals";
declare var $;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private mainService: MainService, private router: Router, private globals: Globals) {
  }

  repassword;
  password;

  ngOnInit() {


  }

  resetPassword() {
    if (!this.repassword || !this.password) {
      this.showNotify('لطفا رمز عبور و تکرار آن را وارد نمایید', 'error');
      return
    }
    if (this.repassword !== this.password) {
      this.showNotify('رمز عبور و تکرار آن با هم یکی نیستند', 'error');
      return
    }
    // this.globals.registerPhoneNum
    this.mainService.resetPassword(this.globals.registerPhoneNum, this.password).subscribe(
      data => {
        if (data[0].message === "Succeed") {
          this.showNotify('رمز عبور شما با موفقیت تغییر کرد', 'success');
          this.router.navigate(['/'])
        }
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
