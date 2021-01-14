import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Organization } from 'src/app/dto/Organization';
import { OrganizationDTO } from 'src/app/dto/OrganizationDTO';
import { User } from 'src/app/dto/User';
import { AuthService } from 'src/app/service/auth.service';
import { OrganizationService } from 'src/app/service/organization.service';

@Component({
  selector: 'app-update-organization',
  templateUrl: './update-organization.component.html',
  styleUrls: ['./update-organization.component.css'],
})
export class UpdateOrganizationComponent implements OnInit {
  form: FormGroup;
  organizationDTO!: OrganizationDTO;
  received = false;
  constructor(
    private organizationService: OrganizationService,
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    console.log(this.route.snapshot.params.id);
    this.loadOrganization(this.route.snapshot.params.id);

    this.form = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.email,
      ]),
      orgName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(180),
      ]),
    });
  }

  ngOnInit(): void {
    this.loadOrganization(this.route.snapshot.params.id);
  }

  async loadOrganization(id: string) {
    (await this.organizationService.getOrgnization(id)).subscribe(
      (res: any) => {
        if (res) {
          this.organizationDTO = res;
          console.log(this.organizationDTO);
          this.f.email.setValue(this.organizationDTO.email);
          this.f.orgName.setValue(this.organizationDTO.orgName);
          this.f.description.setValue(this.organizationDTO.description);
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  async updateOrganization() {
    this.organizationDTO = new OrganizationDTO(
      this.organizationDTO.orgId,
      this.f.orgName.value,
      this.organizationDTO.dateCreated,
      this.f.email.value,
      this.organizationDTO.user,
      this.f.description.value
    );
    (
      await this.organizationService.updateOrganization(this.organizationDTO)
    ).subscribe(
      (res) => {
        if (res) {
          
          const name=this.auth.getUser().firstName;
          console.log(name);
          this.router.navigate(["/dashboard",name]);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  letItUpdate() {
    this.received = true;
  }

  get f() {
    return this.form.controls;
  }

  navigateBack(){
    const name=this.auth.getUser().firstName;
          
          this.router.navigate(["/dashboard",name]);
  }
}
