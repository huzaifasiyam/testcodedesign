import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from 'src/app/core/modals/user.modal';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit, OnChanges {

  constructor(
    private http: HttpService
  ) { }

  signupForm!:FormGroup;
  @Input() formData!:UserData;
  ngOnInit(): void {
    this.signupForm= new FormGroup({
      name: new FormControl('',[Validators.required]),
      number: new FormControl('',[Validators.required, Validators.minLength(10)]),
      state: new FormControl('',[Validators.required]),
      city: new FormControl('',[Validators.required]),
    })

    this.getStatesData();
  }

  ngOnChanges(): void {
    if(this.formData){
      this.fillFormData()
    }
  }

  fillFormData(): void{
    this.signupForm.get('name')?.setValue(this.formData.name);
    this.signupForm.get('number')?.setValue(this.formData.number);
    this.signupForm.get('state')?.setValue(this.formData.state);
    this.onSelectState();
    this.signupForm.get('city')?.setValue(this.formData.city);
  }

  @Output() onSubmitForm= new EventEmitter<UserData>();
  isSubmitted:boolean=false;
  onSubmit(): void{
    this.isSubmitted=true;
    if(this.signupForm.valid){
      console.log('submitted...');
      this.onSubmitForm.emit(this.signupForm.value);
      this.signupForm.reset();
      this.isSubmitted=false;
    }
  }

  /* Get States with Cities */
  states: any;
  getStatesData(): void {
    this.http.getStatesData().subscribe((res: any) => {
      this.states = res;
    })
  }

  getStateNames(): string[] {
    return Object.keys(this.states || {});
  }


  /* After selecting a state get Cities */
  cities:string[]=[];
  onSelectState(): any{
    this.signupForm.get('city').setValue('')
    this.cities=this.states[this.signupForm.get('state')?.value];
  }
}
