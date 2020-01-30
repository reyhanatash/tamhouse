import {Component, OnInit} from '@angular/core';

declare var $;

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor() {

    this.model.selectedFirstQ = 'وضعیت پاسخ را انتخاب کنید';
    this.model.selectedFirstQ = 'وضعیت پاسخ را انتخاب کنید';
    this.model.selectedFirstQ = 'وضعیت پاسخ را انتخاب کنید';
    this.model.selectedFirstQ = 'وضعیت پاسخ را انتخاب کنید';

  }


  model: any = {};
  files: any = [];
  questionSate = [
    {
      name: 'گزینه غلط',
      val: 0,
    },
    {
      name: 'گزینه صحیح',
      val: 1,
    },

  ]
  moreQuestion: any = [];
  counter = 1;

  ngOnInit() {
  }

  showNewQuestion() {
    ($('#myModal')as any).modal('show');
  }

  onSelect(event) {
    if (this.files.length > 0) {
      this.showWarning('تنها مجاز به آپلود یک فایل  در این قسمت  می باشید', 'warning');
    }
    else {
      $('#edu').css('display', 'none');
      // console.log(event);
      this.files.push(...event.addedFiles);
    }

  }

  onRemove(event) {
    this.files = [];
    $('#edu').css('display', 'block');
    // console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }


  questionHasFile() {
    if (this.model.hasPic === true) {
      $('.imgBox').css('display', 'block')
    } else {
      $('.imgBox').css('display', 'none')
    }
  }


  addMoreQuestion() {

    if (this.counter === 4) {
      this.showWarning(' شما حداکثر 4 پاسخ  برای یک سوال میتوانید ثبت کنید', 'error');
    }
    else {

      if (this.counter === 2) {
        this.moreQuestion[0].answerState = 'وضعیت پاسخ را انتخاب کنید';
      }
      else if (this.counter === 3) {
        this.moreQuestion[1].answerState = 'وضعیت پاسخ را انتخاب کنید';
      }
      else if (this.counter === 4) {
        this.moreQuestion[2].answerState = 'وضعیت پاسخ را انتخاب کنید';
      }
      this.moreQuestion.push({});
      var index = this.counter - 1;

      this.counter++;
      console.log(this.moreQuestion);
      // console.log(this.serviceStaff, this.counter);
      // console.log(this.serviceStaff);
    }


  }

  removeAnswer(i) {
    this.moreQuestion.splice(i, 1);
    this.counter = this.counter - 1;
    console.log(this.moreQuestion)
  }

  showWarning(message, type) {
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
