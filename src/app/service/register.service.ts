import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
      .post("http://localhost:8080/addUser", userDto , this.httpOptions)
      .pipe();
  }
}
