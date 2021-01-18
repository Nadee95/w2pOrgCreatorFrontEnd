import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OrganizationDTO } from 'src/app/dto/OrganizationDTO';
import { OrgWithMembers } from 'src/app/dto/OrgWithMembers';
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
  organizations: OrgWithMembers[] =[];
  toggle=false;
  constructor(private router: Router 
    ,private route: ActivatedRoute
    , private auth: AuthService,private orgService:OrganizationService) { 

      
    }

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
  updateOrganization(oid:any){
    console.log(oid);
    this.router.navigate(['update-organization', oid]);
  }
  async deleteOrganization(oid:string, organizationName:string){
    console.log(oid);

   if( window.confirm("Are you sure you want to delete " +organizationName+ " organization? \nthis will delete your members also.")){

    (await this.orgService.deleteOrganization(oid)).subscribe((res:any)=>{
      if(res==-1){
        console.log("successfully deleted");

        this.getMyOrganizations();
        
      }
    },(err:any)=>{
      console.log(err);
    });
   }

    
  }

}
