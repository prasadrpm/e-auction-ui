import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpStatusCode } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, filter, flatMap, map, switchMap, tap } from 'rxjs/operators';
import { LoginService, UserInfo } from './login-service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginService) { }


  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    let isValid = false;
    let userInfo: UserInfo;
    if (httpRequest.url === '/user/login') {
       return httpHandler.handle(httpRequest);
    } else {
      return this.loginService.getUserInfo$().pipe(
        switchMap(
          res => {
            userInfo = res;
            console.log('httpRequest.url  ---- ' + httpRequest.url);
              if (userInfo.token) {
                const updatedReq = httpRequest.clone({ setHeaders: { Authorization: 'Bearer ' + userInfo.token } });
                return httpHandler.handle(updatedReq);
              } else {
                return httpHandler.handle(httpRequest).pipe(
                  map((event: HttpEvent<any>) => { return event}),
                  catchError((httpErrorResponse: HttpErrorResponse,
                    _: Observable<HttpEvent<any>>) => {
                      if(httpErrorResponse.status === HttpStatusCode.Unauthorized) {
                        this.loginService.launchLoginDialog();
                      }
                      return throwError(httpErrorResponse);
                    })
                );
              }
          })
      );
    } 
    
  }
}
