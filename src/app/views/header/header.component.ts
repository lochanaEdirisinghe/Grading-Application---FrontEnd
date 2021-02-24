import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {TokenStorageService} from "../../services/token-storage.service";
import {SharedServiceService} from "../../services/shared-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  showStudentView = false;
  showTeacherView = false;
  username: string;

  clickEventSubscription: Subscription;

  constructor(private tokenStorageService: TokenStorageService, private sharedService: SharedServiceService, private router:Router) {
    this.clickEventSubscription=this.sharedService.getClickEvent().subscribe(()=>{
      this.ngOnInit()
    })
  }
  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showStudentView = this.roles.includes('STUDENT');
      this.showTeacherView = this.roles.includes('TEACHER');

      this.username = user.username;
    }
  }
  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  navigate(){
    if(this.roles.includes('STUDENT')){
      this.router.navigate( ['/student'], {
        queryParams: {userName: this.username}
      } );
    }else if(this.roles.includes('TEACHER')){
      this.router.navigate( ['/teacher'],{
        queryParams: {userName: this.username}
      } );
    }
  }

}
