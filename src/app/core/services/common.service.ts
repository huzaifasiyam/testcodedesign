import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  isReloadList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  reloadList(flag: boolean) {
    this.isReloadList.next(flag);
  }
}
