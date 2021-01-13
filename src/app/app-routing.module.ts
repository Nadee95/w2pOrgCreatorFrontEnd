import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOrganizationComponent } from './component/create-organization/create-organization.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';

const routes: Routes = [
  
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "dashboard/:name", component: DashboardComponent},
    {path: "create-organization", component: CreateOrganizationComponent}
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
