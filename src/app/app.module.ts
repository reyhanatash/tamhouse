 import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {jqxButtonModule} from "jqwidgets-ng/jqxbuttons";
import {jqxGridModule} from 'jqwidgets-ng/jqxgrid';
import {jqxTooltipModule} from 'jqwidgets-ng/jqxtooltip';
import {jqxSortableModule} from 'jqwidgets-ng/jqxsortable';
import {jqxScrollBarModule} from 'jqwidgets-ng/jqxscrollbar';
import {jqxMenuModule} from 'jqwidgets-ng/jqxmenu';
import {jqxListBoxModule} from 'jqwidgets-ng/jqxlistbox';
import {jqxComboBoxModule} from 'jqwidgets-ng/jqxcombobox';
import {jqxCheckBoxModule} from 'jqwidgets-ng/jqxcheckbox';


import {LoginComponent} from './login/login.component';
import {NavbarComponent} from './navbar/navbar.component';
import {ProfileComponent} from './profile/profile.component';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  DropzoneModule, DropzoneConfigInterface,
  DROPZONE_CONFIG
} from 'ngx-dropzone-wrapper';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {CourseListComponent} from './course-list/course-list.component';
import {MyCoursesComponent} from './my-courses/my-courses.component';
import {AdminCoursesComponent} from './admin-courses/admin-courses.component';
import {TeacherComponent} from './teacher/teacher.component';
import {CKEditorModule} from 'ng2-ckeditor';
import {DiscountCodeComponent} from './discount-code/discount-code.component';
import {CourseSessionComponent} from './course-session/course-session.component';
import {OnlyNumber} from './_directives/onlynumber.directive';
import {OnlyText} from './_directives/onlyText.directive';
import {OperatorComponent} from './operator/operator.component';
import {SignupComponent} from './signup/signup.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {UserCityComponent} from './user-city/user-city.component';
import {LiveComponent} from './live/live.component';
import {DynamicScriptLoaderService} from './_services/dynamic-script-loader.service';
import {CookieService} from 'ngx-cookie-service';
import {PackageComponent} from './package/package.component';
import {MainService} from "./_services/main.service";
import {Globals} from './globals';
import { HttpClientModule } from '@angular/common/http';
import { QuestionComponent } from './question/question.component';
import { SafePipe } from './_directives/safe.pipe';
import {FullTextSearchPipe} from './_directives/arrayFilter';
import {TruncatePipe} from './_directives/limitText';




const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  acceptedFiles: 'image/*',
  createImageThumbnails: true,
  maxFiles: 1
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ProfileComponent,
    CourseListComponent,
    MyCoursesComponent,
    AdminCoursesComponent,
    TeacherComponent,
    DiscountCodeComponent,
    CourseSessionComponent,
    OnlyNumber,
    OnlyText,
    OperatorComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UserCityComponent,
    LiveComponent,
    PackageComponent,
    QuestionComponent,
    SafePipe,
    FullTextSearchPipe,
    TruncatePipe




  ],
  imports: [
    BrowserModule,
    jqxButtonModule,
    jqxGridModule,
    jqxTooltipModule,
    jqxScrollBarModule,
    jqxSortableModule,
    jqxMenuModule,
    jqxListBoxModule,
    jqxComboBoxModule,
    jqxComboBoxModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    DpDatePickerModule,
    DropzoneModule,
    NgxDropzoneModule,
    CKEditorModule,
    HttpClientModule


  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
    DynamicScriptLoaderService,
    CookieService,
    MainService,
    Globals
  ],
  bootstrap: [AppComponent]

})
export class AppModule {
}
