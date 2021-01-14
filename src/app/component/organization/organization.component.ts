import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/dto/Member';
import { MemberDTO } from 'src/app/dto/MemberDTo';
import { AuthService } from 'src/app/service/auth.service';
import { MemberService } from 'src/app/service/member.service';
import { OrganizationService } from 'src/app/service/organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  @Input('members') members: Member[]=[];

  @Input('oid') organizationId: string="";

  toggle=false;
  alertMesssage="";
  view=false;
  form: FormGroup;
  constructor(private memberService: MemberService
    ,public fb:FormBuilder
    , private router: Router
    ,private auth: AuthService) { 
    this.form = this.fb.group(
      {
        email: new FormControl("", [
          Validators.required,
          Validators.minLength(6),
          Validators.email
        ]),
        name: new FormControl("", [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ])
        
      },
      
    );



  }

  ngOnInit(): void {
  }

  async inviteMember(){ 
    console.log(this.f.name.value);
    (await this.memberService.addMember(new MemberDTO(this.f.name.value, this.f.email.value,{orgId:this.organizationId}))).subscribe((res:any)=>{
      if(res){
        console.log(res);
        
        if(window.confirm("The invitation was successfully sent to"+ this.f.name.value)){
          this.f.email.setValue("");
          this.f.name.setValue("");
          const name=this.auth.getUser().firstName;
          this.router.navigate(["/dashboard",name]);
      }
        }
        
    },(err:any)=>{
      console.log(err);
    });
  }

  get f() { return this.form.controls; }

  getColor(status:string){

    if(status=="ACCEPTED"){
      return "green";
    }else if(status=="REJECTED"){
      return "red";
    }else{
      return "blue";
    }

  }
}
