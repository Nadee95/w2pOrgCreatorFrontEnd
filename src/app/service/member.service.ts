import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MemberDTO } from '../dto/MemberDTo';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) {


   }

   async addMember(member: MemberDTO) {

   return this.http.post(environment.API_HOST+"member/addMember",member);
     
   }

}
