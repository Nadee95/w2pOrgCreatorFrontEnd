import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(private http: HttpClient) {}

  async register(userDto: any) {
    console.log(userDto);
    return this.http
      .post(environment.API_HOST+"addUser", userDto , this.httpOptions)
      .pipe();
  }
}
