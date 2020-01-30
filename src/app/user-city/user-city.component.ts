import {Component, OnInit} from '@angular/core';
import {Globals} from "../globals";
import {Router} from "@angular/router";
import {MainService} from "../_services/main.service";

declare var $;

@Component({
  selector: 'app-user-city',
  templateUrl: './user-city.component.html',
  styleUrls: ['./user-city.component.css']
})
export class UserCityComponent implements OnInit {

  constructor(private mainService: MainService, private router: Router, private globals: Globals) {
  }

  provinceList: any = [];
  cityList: any = [];
  villageList: any = [];
  selectedProvince;
  selectedCity;
  selectedVillage;

  ngOnInit() {

    this.getStateList();

    ($('#userProvince')as any).select2({
      placeholder: 'استان را انتخاب کنید...',
      allowClear: true,
      dir: "rtl",
      width: '100%'
    });

    ($('#userCity')as any).select2({
      placeholder: 'شهرستان را انتخاب کنید...',
      allowClear: true,
      dir: "rtl",
      width: '100%'
    });

    ($('#userVillage')as any).select2({
      placeholder: 'شهر/دهستان را انتخاب کنید...',
      allowClear: true,
      dir: "rtl",
      width: '100%'
    });

    $('#userProvince').on('change', (e) => {
      this.selectedProvince = ($('#userProvince')as any).select2('val');
      this.getCityList();
    });
    $('#userCity').on('change', (e) => {
      this.selectedCity = ($('#userCity')as any).select2('val');
      this.getVillageList()
    });
    $('#userVillage').on('change', (e) => {
      this.selectedVillage = ($('#userVillage')as any).select2('val');
      // console.log(this.model.docType);
    });

  }


  getStateList() {
    this.mainService.getStateList(-1).subscribe(
      data => {

        this.provinceList = data.data;
        // fldPkStateCo: 1, fldState: "مرکزي"

      },
      error => {

      }
    )
  }


  getCityList() {
    this.mainService.getCityList(this.selectedProvince, -1).subscribe(
      data => {
        console.log(data);
        this.cityList = data.data;

      },
      error => {

      }
    )
  }

  getVillageList() {
    this.mainService.getVillageList(this.selectedCity, -1).subscribe(
      data => {
        // console.log(data)
        this.villageList = data.Data;

      },
      error => {

      }
    )
  }

}
