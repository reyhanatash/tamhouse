import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
declare const $: any;
@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private cookieService: CookieService) { }
  checkUserType() {
    let secret = this.cookieService.get('secret');
    if (!secret) {
      return -1
    }
    if (secret == "8592737698") {
      return 1
    }
    if (secret == "4842591949") {
      return 2
    }
    else {
      return 3
    }
  }
  findIp() {
    return new Promise((resolve, reject) => {
      $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
        resolve(data.ip);
      });
    })

  }
  Guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
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

  getBase64(file) {
    if (!file) {
      return new Promise((resolve, reject) => {
        resolve('');
      });
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  }
}
