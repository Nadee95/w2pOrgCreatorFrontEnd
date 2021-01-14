import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOrganizationComponent } from './component/create-organization/create-organization.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { OrganizationComponent } from './component/organization/organization.component';
import { RegisterComponent } from './component/register/register.component';
import { UpdateOrganizationComponent } from './component/update-organization/update-organization.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard/:name', component: DashboardComponent },
  { path: 'create-organization', component: CreateOrganizationComponent },
  { path: 'update-organization/:id', component: UpdateOrganizationComponent },
  { path: 'organization/:oid', component: OrganizationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
