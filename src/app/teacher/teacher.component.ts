import { Component, OnInit } from '@angular/core';
import {
  DropzoneComponent, DropzoneDirective,
  DropzoneConfigInterface
} from 'ngx-dropzone-wrapper';

declare var $: any;
declare var ckeditor: any;

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  teacherResume;
  teacherEdu;
  Compilations;
  teachHistory;
  config;
  aparatCode;
  aparatId;
  fullName;
  
  files: File[] = [];

  configUploader: DropzoneConfigInterface = {
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    'acceptedFiles': 'image/*',
    maxFilesize: 2
  };

  constructor() { }

  ngOnInit() {
    this.config = {
      width: '500px',
      allowedContent: true,
      toolbarGroups: [
        {name: 'document', groups: ['mode', 'document', 'doctools']},
        {name: 'clipboard', groups: ['clipboard', 'undo', 'Cut', 'Copy', 'Paste', 'PasteText']},
        {name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing']},
        {name: 'forms', groups: ['forms']},
        '/',
        {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
        {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']},
        {name: 'insert', groups: ['insert']},
        '/',
        {name: 'styles', groups: ['styles']},
        {name: 'colors', groups: ['colors']},
        {name: 'tools', groups: ['tools']},
        {name: 'others', groups: ['others']},
        {name: 'about', groups: ['about']}
      ],
      removeButtons: 'Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,' +
      'PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,' +
      'Button,ImageButton,HiddenField,Strike,Subscript,Superscript,CopyFormatting,RemoveFormat,Outdent,' +
      'Indent,CreateDiv,Blockquote,BidiLtr,BidiRtl,Language,Unlink,Anchor,Image,Flash,Table,HorizontalRule,' +
      'Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About',
      removePlugins: 'elementspath,forms,links,insert',
      resize_enabled: false,
      extraPlugins: 'font,divarea,placeholder',
      contentsCss: ['body {font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif;}'],
      autoParagraph: false,
      enterMode: 2
    };
  }

  showNewTeacher() {
    ($('#myModal')as any).modal('show');
  }

  onSelectSecondUpload(event) {
    if (this.files.length > 0) {
     this.showWarning();
    }
    else {
      $('#card').css('display', 'none');
      console.log(event);
      this.files.push(...event.addedFiles);
    }

  }

  onRemoveSecondUpload(event) {
    this.files = [];
    $('#card').css('display', 'block');
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }


  showWarning()
  {
    ($ as any).notify({
      // options
      icon: 'glyphicon glyphicon-warning-sign',
      message: 'تنها مجاز به آپلود یک فایل  در این قسمت  می باشید',
    }, {
      // settings
      element: 'body',
      position: null,
      type: "warning",
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
