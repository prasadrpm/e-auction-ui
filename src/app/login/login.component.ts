import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from './login-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isAuthenticated: false;
  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('')
  });
  constructor(private loginService: LoginService,
    public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
  }

  get UserName(){
    return this.loginForm.get('userName')?.value;
  }
  get Password(){
    return this.loginForm.get('password')?.value;
  }
  login() {
    this.loginService.login({'userName' : this.UserName,
                              'password': this.Password}).subscribe(
                                res => this.dialogRef.close()
                              );
          
  }

}
