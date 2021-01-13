import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json"})
  };


  constructor(private http: HttpClient, private auth: AuthService) { }


  async login(credentials: any) {
    return this.http.post(
      environment.API_HOST+"authenticate",
      credentials
      ,this.httpOptions
    );
  }

}
