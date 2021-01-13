import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(private auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler){

    let token = this.auth.getToken();
    let user = this.auth.getUser();

    if(token && user){
      request = request.clone({
        setHeaders:{
          Authorization:"Bearer "+token
          ,"Content-Type": "application/json"
        }
      })
    }

    return next.handle(request);

  }

}
