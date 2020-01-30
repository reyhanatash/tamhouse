import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd, NavigationStart, NavigationError } from "@angular/router";
import { UtilService } from '../_services/util.service';
import { CookieService } from 'ngx-cookie-service';

declare var $: any;

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  userMenu = ['/courses', '/myCourse', '/live', '/profile'];
  isAdmin = false;
  constructor(private router: Router, private utilService: UtilService, private cookieService: CookieService) {
  }

  ngOnInit() {
    this.isAdmin = this.utilService.checkUserType() === 1 ? true : false;
    $("#sidebar").css("display", "block !important");

    $(".text-dark").on("click", function () {
      $(".text-dark").removeClass("active");
      $(this).addClass("active");
    });

    // this.router.events.subscribe(val => {
    //   var route: any = val;

    //   if (route.url === "/" || route.url === "/operator" ||
    //    route.url === "/signup" || route.url === "/forgotPassword" ||
    //    route.url === "/resetPassword") {
    //     $("#sidebar").addClass("d-none");
    //     $("#sidebar-admin").addClass("d-none");
    //     $("#sidebar").removeClass("d-block");
    //     $("#sidebar-admin").removeClass("d-block");

    //     $("#nav").addClass("d-none");
    //     $("#nav").removeClass("d-block");
    //     $("#nav").removeClass("d-flex");
    //   } else {
    //     if (route.url !== undefined) {
    //       $("#nav").removeClass("d-none");
    //       $("#nav").addClass("d-block");
    //       $("#nav").addClass("d-flex");
    //     }
    //   }
    //   if (route.url === "/profile" || route.url === "/myCourse" || 
    //       route.url === "/live") {
    //     // let token = localStorage.getItem('token');
    //     // if (token) {

    //     $("#sidebar-admin").removeClass("d-block");
    //     $("#sidebar").addClass("d-block");
    //     $("#sidebar-admin").addClass("d-none");
    //     $("#nav").addClass("d-block");
    //     $("#nav").addClass("d-flex");
    //   } else {
    //     if (route.url !== undefined) {
    //       if (route.url === "/" || route.url === "/operator" ||
    //        route.url === "/signup" || route.url === "/forgotPassword" ||
    //        route.url === "/resetPassword") {
    //         $("#sidebar-admin").addClass("d-none");
    //         $("#sidebar").removeClass("d-block");
    //         $("#sidebar").addClass("d-none");
    //         $("#sidebar-admin").removeClass("d-block");
    //       } else {

    //         $("#sidebar-admin").addClass("d-block");
    //         $("#sidebar").removeClass("d-block");
    //         $("#sidebar").addClass("d-none");
    //         $("#sidebar-admin").removeClass("d-none");
    //       }
    //     }
    //   }
    // });
  }

  onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    let currentUrl = this.router.url + "?";

    this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false;
      this.router.navigate([this.router.url]);
    });
  }
  logOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/']);
  }
  seeUserMenu() {
    if (!this.isAdmin) {
      return true
    }
    let url = location.hash.replace('#', '').split('?')[0];
    if (this.userMenu.includes(url)) {
      return true;
    }
    return false;
  }
}
