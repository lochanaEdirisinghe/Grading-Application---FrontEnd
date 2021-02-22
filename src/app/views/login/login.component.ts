import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  token;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      resp => {
        if(resp.code != 500 && resp.data!=null ){
          this.token=resp.data.jwt;
          this.tokenStorage.saveToken(resp.data.jwt);
          this.tokenStorage.saveUser(resp.data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.reloadPage();

        }else {
          this.isLoginFailed = true;
          this.errorMessage = "Incorrect username or password";
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  navigate(){
    if (this.roles[0] == 'STUDENT') {
      console.log(this.tokenStorage.getUser().username)
      this.router.navigate( ['/student'], {
        queryParams: {userName: this.tokenStorage.getUser().username}
      } );
    } else if (this.roles[0] == 'TEACHER') {
      this.router.navigate( ['/teacher'],{
        queryParams: {userName: this.tokenStorage.getUser().username}
      } );
    }
  }

  reloadPage() {
    window.location.reload();
  }

}
