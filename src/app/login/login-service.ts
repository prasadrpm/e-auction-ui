import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginComponent } from './login.component';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly url = '/user';
  private userInfo$ = new BehaviorSubject<UserInfo>(new UserInfo());
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient, private dialog: MatDialog, 
    private route: Router) { }

  get AuthenticatedStatus$(): Observable<boolean> {
    return this.isAuthenticated;
  }

  getUserInfo$(): Observable<UserInfo>{
    return this.userInfo$;
  }

  login(user: any): Observable<any>{
    return this.httpClient.post<any>(this.url + "/login", user, {observe: 'response'}).pipe(
      map( res => {
        if(res.status === 200){ 
          console.log('Response --->' + res.body);
          this.userInfo$.next(res.body);
          this.isAuthenticated.next(true);
          this.route.navigate(['home'])
        }
      })
    );
  }
  launchLoginDialog(){
    const dialogRef = this.dialog.open(LoginComponent, {width: '400px',height: '300px'});
    dialogRef.afterClosed().subscribe( res => 
      this.route.navigate(['home'])
    );
  }

  singout(){
    this.isAuthenticated.next(false);
    this.userInfo$.next({userName : "", token: ""});
  }
}

export class UserInfo {
  token: string;
  userName? : string;
}