import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserDTO } from '../dto/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  helper = new JwtHelperService();
  userDetails:any;
  user :any;

  TOKEN:any;
 
  authenticate(token:string) {

    sessionStorage.setItem('token', token);

    this.userDetails = this.helper.decodeToken(token);
    this.TOKEN=token;
    this.loadUser(this.userDetails.user);

  }
  loadUser(user:UserDTO) {
    this.user=user;
  }



  isLoggedIn():boolean {
    if(sessionStorage.getItem('token')!==null){
      return true;
    }else{
      return false;
    }
  }

  logout() {
    sessionStorage.removeItem('token');
  }

  getToken(){
    return sessionStorage.getItem('token');
  }

  getUser(){
    return this.user;
  }

}
