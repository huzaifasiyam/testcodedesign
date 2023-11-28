import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommonService } from './common.service';
import { Guid } from 'guid-typescript';
import { UserData } from '../modals/user.modal';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl = '../../assets/data'; // Replace with the actual API URL

  constructor(private http: HttpClient, private commonService: CommonService) { }

  getStatesData(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/states.json');
  }

  getUsersData(): Observable<any> {
    const storedData = localStorage.getItem('usersData');
    const data = storedData ? JSON.parse(storedData) : [];
    return of(data);
  }

  registerUser(formData: UserData): void {
    this.getUsersData().subscribe((users: any[]) => {
      let id = Guid.create();
      formData['id'] = id.toJSON().value
      users.push(formData);
      localStorage.setItem('usersData', JSON.stringify(users))
      this.commonService.reloadList(true);
    })
  }

  deleteUser(id: string): void {
    this.getUsersData().subscribe((users: any[]) => {
      users = users.filter(user => user.id !== id);
      localStorage.setItem('usersData', JSON.stringify(users));
      this.commonService.reloadList(true);
    })
  }

  editUser(formData: UserData, editId:string): void {
    this.getUsersData().subscribe((users:any[])=> {
      users[users.findIndex(user => user.id == editId)] = formData;
      localStorage.setItem('usersData', JSON.stringify(users));
      this.commonService.reloadList(true);
    })
  }
}
