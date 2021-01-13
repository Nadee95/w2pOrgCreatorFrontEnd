import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationDTO } from 'src/app/dto/OrganizationDTO';
import { AuthService } from 'src/app/service/auth.service';
import { OrganizationService } from 'src/app/service/organization.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  count=0;
  name= "";
  organizations: OrganizationDTO[] =[];

  constructor(private router: Router ,private route: ActivatedRoute, private auth: AuthService,private orgService:OrganizationService) { }

  ngOnInit(): void {
    this.name=this.route.snapshot.params.name;
    this.getMyOrganizations();
  }

  getName(): string {
    return this.name;
  }


  //get All Organizations

  async getMyOrganizations() {
     let user=this.auth.getUser();
    if (user) {
     (await this.orgService.getOrgnizations(user.id)).subscribe((data: any)=> {
       if(data) {
         this.organizations = data;
         console.log(data)
       }
     },(err:any)=> {
       console.log(err);
     });
    }
      
  }

  createOrganization(){
    this.router.navigate(['create-organization']);
  }
  updateOrganization(oid:string){
    console.log(oid);
  }
  deleteOrganization(oid:string){
    console.log(oid);
  }

}
