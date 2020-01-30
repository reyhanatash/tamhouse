import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CourseListComponent } from './course-list/course-list.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { TeacherComponent } from './teacher/teacher.component';
import { DiscountCodeComponent } from './discount-code/discount-code.component';
import { CourseSessionComponent } from './course-session/course-session.component';
import { OperatorComponent } from './operator/operator.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserCityComponent } from './user-city/user-city.component';
import { LiveComponent } from './live/live.component';
import { PackageComponent } from './package/package.component';
import {QuestionComponent} from "./question/question.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  // {path: 'school', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent},
  {path: 'courses', component: CourseListComponent},
  {path: 'myCourse', component: MyCoursesComponent},
  {path: 'adminCourse', component: AdminCoursesComponent},
  {path: 'teachers', component: TeacherComponent},
  {path: 'discount-code', component: DiscountCodeComponent},
  {path: 'courseSession', component: CourseSessionComponent},
  {path: 'operator', component: OperatorComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'forgotPassword', component: ForgotPasswordComponent},
  {path: 'resetPassword', component: ResetPasswordComponent},
  {path: 'userCity', component: UserCityComponent},
  { path: 'live', component: LiveComponent },
  { path: 'packages', component: PackageComponent},
  { path: 'question', component: QuestionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
