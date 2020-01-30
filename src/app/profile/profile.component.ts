import {Component, OnInit, Input, ViewChild} from '@angular/core';
import * as moment from 'jalali-moment';
import {DatePickerComponent} from 'ng2-jalali-date-picker';
import {
  DropzoneComponent, DropzoneDirective,
  DropzoneConfigInterface
} from 'ngx-dropzone-wrapper';
import {UtilService} from '../_services/util.service';
import {Globals} from '../globals';
import {Router} from '@angular/router';
import {MainService} from '../_services/main.service';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {

  constructor(private utilService: UtilService, private mainService: MainService, private router: Router, private globals: Globals) {
  }

  birthDate;
  currentDate;
  datePickerConfig;
  file;
  configUploader: DropzoneConfigInterface = {
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    'acceptedFiles': 'image/*',
    maxFilesize: 2
  };

  cardUploader: DropzoneConfigInterface = {
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    'acceptedFiles': 'image/*',
    maxFilesize: 2
  };
  opt = '';
  files: File[] = [];
  filesUpload2: File[] = [];
  email;
  fullName;
  userDetailInfo: any = {};
  toggleBtn = false;
  selectedGender;
  genderList: any = [
    {
      name: 'زن',
      id: 2,
    },
    {
      name: 'مرد',
      id: 1,
    }
  ];
  audienceList: any = [];
  selectedAudience;
  uploadFirst: any = {name: '', baseuploadFi: ''};
  uploadCard: any = {name: '', baseuploadFi: ''};

  ngOnInit() {

    this.getAreaInfo();
    this.getAudienceList();
    let currentDate = new Date();
    let str = moment(currentDate).format('jYYYY/jMM/jD');
    this.currentDate = str;

    // this.currentDate = '1380/01/01';
    //   var myDropzone = new Dropzone("#eduFile");

    //   myDropzone.on("maxfilesexceeded", function(file) {
    //     myDropzone.removeFile(file);
    // });


  }


  onSelect(event) {
    if (this.files.length > 0) {
      this.utilService.showNotify('تنها مجاز به آپلود یک فایل  در این قسمت  می باشید', 'warning');
      return;
    }
    else {
      $('.firstUploader').addClass('upladeFile');
      this.files.push(...event.addedFiles);
      // console.log(this.files);
      this.uploadFirst['name'] = this.files[0].name;
      this.utilService.getBase64(this.files[0]).then(data => {

        let base: any = data;
        let createdBase = base.split(',');
        this.uploadFirst['baseuploadFi'] = createdBase[1];

      });
    }

  }

  onRemove(event) {
    this.files = [];
    $('.firstUploader').removeClass('upladeFile');
    this.files.splice(this.files.indexOf(event), 1);
  }


  onSelectSecondUpload(event) {
    if (this.filesUpload2.length > 0) {
      this.utilService.showNotify('تنها مجاز به آپلود یک فایل  در این قسمت  می باشید', 'warning');
    return
    }
    else {
      $('.seconduploader').addClass('upladeFile');
      this.filesUpload2.push(...event.addedFiles);
      this.uploadCard['name'] = this.filesUpload2[0].name;
      this.utilService.getBase64(this.filesUpload2[0]).then(data => {

        let base: any = data;
        let createdBase = base.split(',');
        this.uploadCard['baseuploadFi'] = createdBase[1];

      });
    }

  }

  onRemoveSecondUpload(event) {
    this.filesUpload2 = [];
    $('.seconduploader').removeClass('upladeFile');
    // console.log(event);
    this.filesUpload2.splice(this.filesUpload2.indexOf(event), 1);
  }

  getSelectedDate() {
    if (this.birthDate !== undefined) {
      var date = this.birthDate.format('jYYYY/jMM/jD');
    }
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

  getAreaInfo() {

    this.mainService.getUserDetailArea().subscribe(
      data => {
        // console.log(data);
        this.userDetailInfo = data.data[0];
        if (this.userDetailInfo['fldFkRegionCo'] !== 0 && this.userDetailInfo['fldFkRegionCo'] !== null) {
          this.toggleBtn = true
        } else {
          this.toggleBtn = false;
        }
        this.email = this.userDetailInfo.fldEmail;
        this.fullName = this.userDetailInfo.fldName;
        this.fullName = this.userDetailInfo.fldName;
        this.selectedGender = this.genderList.filter(
          x => x['id'] == this.userDetailInfo['fldGender']
        )[0];
        this.selectedAudience = this.audienceList.filter(
          x => x['fldPkAudienceCo'] == this.userDetailInfo['fldFkAudienceCo']
        )[0];
        let date = this.userDetailInfo['fldBirthDay'].split(' ');
        let stringDate = date[0] + ' ' + date[1] + ' ' + date[2];
        let convertDate = new Date(stringDate);

        // this.birthDate = moment(convertDate.toLocaleDateString()).format('jYYYY/jMM/jD');
        this.currentDate = moment(convertDate.toLocaleDateString()).format('jYYYY/jMM/jD');
        let model: any = {};
        let modelCard: any = {};
        let fileUpload, fileCardUpload;
        if (this.userDetailInfo['fldCerificetePicAddress'] !== '') {
          model['name'] = this.userDetailInfo['fldCerificetePicAddress'];
          let type = this.userDetailInfo['fldCerificetePicAddress'].split('.');
          model['type'] = 'images/' + type[1];
          this.files.push(model);
          $('.firstUploader').addClass('upladeFile');
        }
        if (this.userDetailInfo['fldIDCardPicAddress'] !== '') {
          modelCard['name'] = this.userDetailInfo['fldIDCardPicAddress'];
          let type = this.userDetailInfo['fldIDCardPicAddress'].split('.');
          modelCard['type'] = 'images/' + type[1];
          this.filesUpload2.push(modelCard);
          $('.seconduploader').addClass('upladeFile');
        }
        setTimeout(() => {
          $('.previewAddress > img').attr('src', this.globals.url + 'Files/edu/' + this.userDetailInfo['fldCerificetePicAddress']);
          $('.previewCard > img').attr('src', this.globals.url + 'Files/card/' + this.userDetailInfo['fldIDCardPicAddress']);
        }, 500);
        // fldPkUserCo: 21262
        // fldUserGUID: "9c79f2bd-ed2e-4924-acba-fdb1ed467f29"
        // fldEmail: null
        // fldPassword: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92"
        // fldName: null
        // fldFkRegionCo: 0
        // fldFkCourseAudienceCo: null
        // fldPicGUID: null
        // fldBirthDay: null
        // fldFkVillageCo: 2401010001
        // fldGender: null
        // fldMobile: "09387868383"
        // fldMobileVerificationCode: "3521"
        // fldVerified: true
        // fldFkRoleCo: 5
      }, error => {

      }
    )

  }

  getAudienceList() {
    this.mainService.getAudienceList(-1).subscribe(
      data => {
        // console.log(data);
        this.audienceList = data.data;
        this.selectedAudience = data.data[0];
        // fldPkAudienceCo: 1, fldAudience: "ریاضی"
      },
      error => {

      }
    );
  }

  validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  saveUserInfo() {
    let date, gender, audience;

    if (this.email) {
      if (this.validateEmail(this.email) === false) {
        this.utilService.showNotify('لطفا ایمیل را در فرمت مناسب وارد نمایید', 'warning');
        return;
      }
    }
    if (this.uploadCard['name']) {
      let splitname = this.uploadCard.name.split('.');
      if (splitname[1].toLowerCase() !== 'png' && splitname[1].toLowerCase() !== 'jpg' &&
        splitname[1].toLowerCase() !== 'jpeg') {
        $('.seconduploader').removeClass('upladeFile');
        this.uploadCard = {};
        this.filesUpload2 = [];
        this.utilService.showNotify('تنها فایل با فرمت عکس میتوانید آپلود کنید', 'warning');
        return;
      }
    }
    if (this.uploadFirst['name']) {
      let splitname = this.uploadFirst.name.split('.');
      if (splitname[1].toLowerCase() !== 'png' && splitname[1].toLowerCase() !== 'jpg' &&
        splitname[1].toLowerCase() !== 'jpeg') {
        $('.seconduploader').removeClass('upladeFile');
        this.uploadFirst = {};
        this.files = [];
        this.utilService.showNotify('تنها فایل با فرمت عکس میتوانید آپلود کنید', 'warning');
        return;
      }
    }

    if (this.selectedAudience) {
      audience = this.selectedAudience.fldPkAudienceCo;
    }
    else {
      audience = null;
    }

    if (this.selectedGender) {
      gender = this.selectedGender.id
    }
    if (this.birthDate === undefined) {
      date = this.currentDate;
    } else {
      date = this.birthDate.format('jYYYY/jMM/jD');

    }
    let miladiDate: any = moment.from(date, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');

    if (this.uploadCard['baseuploadFi'] === undefined) {
      this.uploadCard['baseuploadFi'] = null;
    }

    if (this.uploadFirst['baseuploadFi'] === undefined) {
      this.uploadFirst['baseuploadFi'] = null;
    }

    this.mainService.saveUserInfo(
      this.email,
      this.fullName,
      gender,
      miladiDate,
      this.uploadCard['name'],
      this.uploadCard['baseuploadFi'],
      this.uploadFirst['name'],
      this.uploadFirst['baseuploadFi'],
      audience
    ).subscribe(
      data => {

        if (data.data[0].message === 'Succeed') {
          this.utilService.showNotify('اطلاعات با موفقیت به روز رسانی شد', 'success');
          this.birthDate = undefined;
          this.fullName = undefined;
          this.uploadCard['name'] = undefined;
          this.uploadCard['baseuploadFi'] = undefined;
          this.uploadFirst['name'] = undefined;
          this.uploadFirst['baseuploadFi'] = undefined;
          this.filesUpload2 = [];
          this.files = [];

          this.getAreaInfo();
        }
        else {
          this.utilService.showNotify(data.data[0].message, 'error');
        }


      },
      error => {

      }
    );




  }


}
