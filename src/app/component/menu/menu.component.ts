import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/dto/UserDTO';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  //isUserLoggedIn = false;

  name:any;

  constructor(public auth: AuthService,private router:Router) {
    //this.name=this.auth.getUser().firstName;
   }

  ngOnInit(): void {
  }

  logout(){
    this.auth.logout();
  }

  navigateToDashboard(){
    this.router.navigate(['dashboard',this.auth.getUser().firstName]);
  }

  getNavUrl(){
    if(this.auth.getUser().firstName){
      return "dashboard/"+this.auth.getUser().firstName;
    }
    return "/login";
  }

}
