import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
//   user = {
//     email: '',
//     password: ''
//  };
  constructor(private router: Router, private authService: AuthService) { }
username: string;
password: string;
  ngOnInit() {
  }
  // login() : void {
  //   if(this.username == "admin" && this.password == "admin"){
  //    this.router.navigate(["dashboard"]);
  //     alert("Success Login");
  //   }else {
  //     alert("Invalid credentials");
  //   }
  // }
  signIn() {
    this.authService.signInRegular(this.username, this.password)
       .then((res) => {
          console.log(res);
    
          this.router.navigate(['dashboard']);
          alert("Success Login");
       })
       .catch((err) => console.log('error: ' + err));
 }
}
