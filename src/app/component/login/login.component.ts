import { Component, NgZone, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { LoginService } from 'src/app/service/login.service';
import { DashboardComponent } from '../dashboard/dashboard.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  invalidLogin: boolean = false;
  alertMessage = "Use valid credentials!";
  
  
 

  constructor( public fb:FormBuilder,private zone: NgZone,private router: Router, private loginService
    :LoginService,private auth:AuthService) {

    this.form = this.fb.group({
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(4)
      ])
    });
   }

  ngOnInit(): void {
    this.f.email.setValue("hashan@mail.com");//for testing
    this.f.password.setValue("123456");
  }

  alert(){
    if(this.form.invalid){
      this.alertMessage="Invalid Details "+ this.form.errors;
    }
  }

  async onFormSubmit() {
    (await this.loginService.login(this.form.value)).subscribe(
      ( res: any) => {
        this.auth.authenticate(res.jwt);
       const name=this.auth.getUser().firstName;

       this.router.navigate(["/dashboard",name]);
        // this.zone.run(() => {
        //  // this.form.reset();
        //    //can add query params
        // });
      },
      (      error: any) => {
       
        window.alert(error.error.message);
        console.log(error.error.message);
      }
    );
    
  }

  get f() { return this.form.controls; }

}
