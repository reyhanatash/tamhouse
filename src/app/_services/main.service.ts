import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Globals} from '../globals';
import * as sha256 from 'sha256/lib/sha256.js';

@Injectable()
export class MainService {

  constructor(private http: HttpClient, private global: Globals) {
  }

  signup(Mobile: string) {
    const uri = this.global.url + 'api/user/signup';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const data = {
      Mobile: Mobile,
    };

    return this.http.post<any>(uri, data, httpOptions).pipe(map(result => {
      return result;
    }));

  }


  sendVerifyCode(Mobile: string,
                 VerificationCode: string) {
    const uri = this.global.url + 'api/user/verifyCode';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const data = {
      Mobile: Mobile,
      VerificationCode: VerificationCode
    };

    return this.http.post<any>(uri, data, httpOptions).pipe(map(result => {
      return result;
    }));

  }

  resetPassword(Mobile: string, NewPassword: string) {
    const uri = this.global.url + 'api/user/resetPassword';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let hashPass = sha256(NewPassword);
    const data = {
      Mobile: Mobile,
      NewPassword: hashPass
    };

    return this.http.post<any>(uri, data, httpOptions).pipe(map(result => {
      return result;
    }));

  }


  forgetPassword(Mobile: string) {
    const uri = this.global.url + 'api/user/forgotPassword';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const data = {
      Mobile: Mobile,
    };

    return this.http.post<any>(uri, data, httpOptions).pipe(map(result => {
      return result;
    }));

  }

  login(UserName: string,
        Password: string) {
    const uri = this.global.url + 'token';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-global.urlencoded'
      })
    };
    const pass = sha256(Password);
    const data = 'UserName=' + UserName + '&Password=' + pass + '&grant_type=password';
    return this.http.post<any>(uri, data, httpOptions);

  }

  getCourseList() {
    let token = localStorage.getItem('token');
    const uri = this.global.url + 'api/course/load';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get<any>(uri, httpOptions).pipe(map(result => {
      return result;
    }));

  }

  getSessionCourseList(CourseId: number) {
    let token = localStorage.getItem('token');
    const uri = this.global.url + 'api/course/sessionLoad';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    const data = {
      CourseId: CourseId,
    };
    return this.http.post<any>(uri, data, httpOptions).pipe(map(result => {
      return result;
    }));

  }

  getStateList(StateId: number) {
    let token = localStorage.getItem('token');
    const uri = this.global.url + 'api/course/loadStates';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    const data = {
      StateId: StateId
    };
    return this.http.post<any>(uri, data, httpOptions).pipe(map(result => {
      return result;
    }));

  }

  getCityList(StateId: number, CityId: number) {
    let token = localStorage.getItem('token');
    const uri = this.global.url + 'api/course/loadCity';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    const data = {
      StateId: StateId,
      CityId: CityId
    };
    return this.http.post<any>(uri, data, httpOptions).pipe(map(result => {
      return result;
    }));

  }

  getVillageList(CityId: number, VillageId: number) {
    let token = localStorage.getItem('token');
    const uri = this.global.url + 'api/course/loadVillage';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    const data = {
      CityId: CityId,
      VillageId: VillageId
    };
    return this.http.post<any>(uri, data, httpOptions).pipe(map(result => {
      return result;
    }));

  }

  getMyCourseList() {
    let token = localStorage.getItem('token');
    const uri = this.global.url + 'api/course/loadUserCourse';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.get<any>(uri, httpOptions).pipe(map(result => {
      return result;
    }));

  }

  getUserDetailArea() {
    let token = localStorage.getItem('token');
    const uri = this.global.url + 'api/user/loadInfo';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.get<any>(uri, httpOptions).pipe(map(result => {
      return result;
    }));

  }

  saveUserInfo(Email: string,
               FullName: string,
               Gender: number,
               BirthDate: Date,
               CardFileName: string,
               CardImage: string,
               EduFileName: string,
               EduImage: string, AudienceId: number) {
    let token = localStorage.getItem('token');
    const uri = this.global.url + 'api/user/saveInfo';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    const data = {
      Email: Email,
      FullName: FullName,
      Gender: Gender,
      BirthDate: BirthDate,
      CardFileName: CardFileName,
      CardImage: CardImage,
      EduFileName: EduFileName,
      EduImage: EduImage,
      AudienceId: AudienceId
    };
    return this.http.post<any>(uri, data, httpOptions).pipe(map(result => {
      return result;
    }));

  }

  getAudienceList(AudienceId: number) {
    let token = localStorage.getItem('token');
    const uri = this.global.url + 'api/user/loadAudience';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    const data = {
      AudienceId: AudienceId,
    };
    return this.http.post<any>(uri, data, httpOptions).pipe(map(result => {
      return result;
    }));

  }

  getTeacherList(TeacherId: number) {
    let token = localStorage.getItem('token');
    const uri = this.global.url + 'api/course/loadTeacher';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    const data = {
      TeacherId: TeacherId,
    };

    return this.http.post<any>(uri, data, httpOptions).pipe(map(result => {
      return result;
    }));
  }

  getStream() {
    let token = localStorage.getItem('token');
    const uri = this.global.url + 'api/course/getStream';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.get(uri, httpOptions).pipe(map(result => {
      return result;
    }));

  }

  //save Test in DataBase
  SaveTest(obj) {
    const uri = this.global.url + 'api/course/SaveTest';
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return this.http.post(uri, obj, httpOptions).toPromise();
  }

  //user Answer the Test
  AnswerTest(obj) {
    const uri = this.global.url + 'api/course/testAnswer';
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return this.http.post(uri, obj, httpOptions);
  }

  getTestResult(id) {
    const uri = this.global.url + 'api/course/getTestResult/' + id;
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return this.http.get(uri, httpOptions);
  }

  deleteCourse(CourseId: number) {
    let token = localStorage.getItem('token');
    const uri = this.global.url + 'api/course/delete';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    const data = {
      CourseId: CourseId,
    };

    return this.http.post<any>(uri, data, httpOptions).pipe(map(result => {
      return result;
    }));
  }

  getPackageList() {
    let token = localStorage.getItem('token');
    const uri = this.global.url + 'api/course/loadPackage';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    const data = {
      PackageId: -1,
    };

    return this.http.post<any>(uri, data, httpOptions).pipe(map(result => {
      return result;
    }));
  }

  deletePackage(PackageId: number) {
    let token = localStorage.getItem('token');
    const uri = this.global.url + 'api/course/deletePackage';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    const data = {
      PackageId: PackageId,
    };

    return this.http.post<any>(uri, data, httpOptions).pipe(map(result => {
      return result;
    }));
  }


  deleteCourseSession(CourseStepId: number) {
    let token = localStorage.getItem('token');
    const uri = this.global.url + 'api/course/deleteSession';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    const data = {
      CourseStepId: CourseStepId,
    };

    return this.http.post<any>(uri, data, httpOptions).pipe(map(result => {
      return result;
    }));
  }

  getStageList(StageId: number) {
    let token = localStorage.getItem('token');
    const uri = this.global.url + 'api/course/loadStage';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    const data = {
      StageId: StageId,
    };

    return this.http.post<any>(uri, data, httpOptions).pipe(map(result => {
      return result;
    }));
  }
}
