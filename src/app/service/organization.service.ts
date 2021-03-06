import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json"})
  };

  constructor(private http: HttpClient) { }


  async getOrgnizations(id: string) {
    return this.http.get(environment.API_HOST+"organization/getAllOrganizations/"+id);
  }

  async createOrganization(org:any){
   return this.http.post(environment.API_HOST+"organization/addOrganization",org);
  }
  async deleteOrganization(oid:string){
    return this.http.delete(environment.API_HOST+"organization/deleteOrganization/"+oid);
  }

  async getOrgnization(oid:string) {
    return this.http.get(environment.API_HOST+"organization/getOrganizationById/"+oid);
  }

  async updateOrganization(org:any){
    return this.http.put(environment.API_HOST+"organization/updateOrganization",org);
   }
}
