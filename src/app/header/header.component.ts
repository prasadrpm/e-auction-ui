import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from '../login/login-service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;

  constructor(private dialog: MatDialog, private loginService: LoginService) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.loginService.AuthenticatedStatus$;
  }
  navigateToSignIn(){
    const dialogRef = this.dialog.open(LoginComponent, {width: '400px',height: '300px'});
    dialogRef.afterClosed().subscribe();
  }
}
