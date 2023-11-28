import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { UsersComponent } from './users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { SharedModule } from '../core/shared/shared.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    HomeComponent,
    UsersComponent,
    RegistrationFormComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
