import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Organization } from 'src/app/dto/Organization';
import { OrganizationDTO } from 'src/app/dto/OrganizationDTO';
import { User } from 'src/app/dto/User';
import { AuthService } from 'src/app/service/auth.service';
import { OrganizationService } from 'src/app/service/organization.service';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.css']
})
export class CreateOrganizationComponent implements OnInit {

  form: FormGroup;
  organizationDTO:Organization | undefined;
 // organization_id: string ="";
  
  constructor(private organizationService: OrganizationService
    ,public fb:FormBuilder
    , private router: Router
    , private route:ActivatedRoute
    ,private auth: AuthService) { 
    //this.organization_id=route.snapshot.
    this.form = this.fb.group(
      {
        email: new FormControl("", [
          Validators.required,
          Validators.minLength(6),
          Validators.email
        ]),
        orgName: new FormControl("", [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]),
        description: new FormControl("", [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(180)
        ])
        
      },
      
    );



  }

  ngOnInit(): void {
  }


  async createOrganization(){
    this.organizationDTO = new Organization(
      this.f.orgName.value,
      new Date(),
      this.f.email.value,
      new User(this.auth.getUser().id),
      this.f.description.value
      );
     (await this.organizationService.createOrganization(this.organizationDTO)).subscribe((res) => {

      if(res){
        console.log(res);
        this.router.navigate(["/dashboard",this.auth.getUser().firstName]);
      }

    },
    (err) => {
      console.log(err);
    });
  }

  get f() { return this.form.controls; }

}
