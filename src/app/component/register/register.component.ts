import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/service/must-match.service';
import { RegisterService } from 'src/app/service/register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(public fb:FormBuilder,private registerService:RegisterService, private router: Router) {

    this.form = this.fb.group(
      {
        email: new FormControl("", [
          Validators.required,
          Validators.minLength(6),
          Validators.email
        ]),
        firstName: new FormControl("", [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]),
        lastName: new FormControl("", [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]),
        phone: new FormControl("", [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]),
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(12)
        ]),
        confirmPassword: new FormControl("", [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50)
        ])
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );

   }

  ngOnInit(): void {
  }

  async register(){
   (await this.registerService.register(this.form.value)).subscribe((res)=>{
      console.log(res)//
     // this.router.navigate(["/login"]);
    },
    err => {
      
      console.log(err.error.message)
    }
    
    );
  }

}
