import { Component, NgZone, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';


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
    :LoginService) {

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

  }

  alert(){
    if(this.form.invalid){
      this.alertMessage="Invalid Details "+ this.form.errors;
    }
  }

  async onFormSubmit() {
    (await this.loginService.login(this.form.value)).subscribe(
      (      res: any) => {
        console.log(res);
        this.router.navigate(["/"]);
        // this.zone.run(() => {
        //  // this.form.reset();
        //    //can add query params
        // });
      },
      (      error: { message: any; }) => {
       
        window.alert(error.message);
      }
    );
    console.log(this.form.value);
  }

  get f() { return this.form.controls; }

}
