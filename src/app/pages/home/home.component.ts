import { Component, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { RegistrationFormComponent } from '../registration-form/registration-form.component';
import { UserData } from 'src/app/core/modals/user.modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private http: HttpService
  ) { }


  @ViewChild('registrationForm') registrationFormComponent!: RegistrationFormComponent
  
  onSubmitForm(){
    this.registrationFormComponent.onSubmit();
  }
  onRegisterUser(formData: UserData): void{
    this.http.registerUser(formData);
  }
}
