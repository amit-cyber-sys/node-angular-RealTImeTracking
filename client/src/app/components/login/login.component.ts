import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/http.service';
import { MatSnackBar } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;

  constructor(
    private httpService: HttpService,
    public snackBar: MatSnackBar,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Enter your Email ID' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  getPasswordErrorMessage() {
    return this.email.hasError('required') ? 'Enter your Password' :
      '';
  }

  showToastMessage(message, icon) {
    this.snackBar.open(message, icon, {
      duration: 2000
    });
  }

  login() {
    console.log("Login : ", this.email.value);
    const option = {
      url: 'login',
      body: {
        email: this.email.value,
        password: this.password.value
      }
    };
    this.spinnerService.show();
     this.httpService.httpPostWithoutToken(option).subscribe((response: any) => {
      localStorage.setItem('token', response.token);
      localStorage.setItem('userType', response.data.type);
      let token = localStorage.getItem("token");
      console.log("token on login--74",token);   
      this.spinnerService.hide();
    
      this.router.navigate(['tracker']);
      this.showToastMessage(response.message, '');
      
      console.log(response);
    },
      err => {
        this.showToastMessage('Unauthorized', '');
       
      });
  }


}
