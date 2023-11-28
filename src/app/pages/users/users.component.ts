import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { HttpService } from 'src/app/core/services/http.service';
import Swal from 'sweetalert2';
import { RegistrationFormComponent } from '../registration-form/registration-form.component';
import { UserData } from 'src/app/core/modals/user.modal';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  constructor(
    private http: HttpService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.commonService.isReloadList.subscribe(res => this.getUsersData())
  }


  /* Get Users Data List */
  dataTable: any[] = [];
  getUsersData(): void {
    this.http.getUsersData().subscribe((res: UserData[]) => {
      this.dataTable = res;
    })
  }

  onDelete(id: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.deleteUser(id);
      }
    });
  }

  @ViewChild('registrationForm') registrationFormComponent!: RegistrationFormComponent;
  @ViewChild('closeModal') closeModal!: ElementRef;

  onSubmitForm() {
    this.registrationFormComponent.onSubmit();
  }
  onEditUser(formData: UserData): void {
    this.http.editUser(formData, this.formData.id);
    this.closeModal.nativeElement.click();
  }

  formData!: UserData;
  openEditModal(index: number) {
    this.formData = this.dataTable[index];
  }
}
