import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GlobalEventsManagerService {

  private userId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private token: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private userName: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public updateUserIdEmitter: Observable<string> = this.userId.asObservable();
  public updateTokenEmitter: Observable<string> = this.token.asObservable();
  public updateUserNameEmitter: Observable<string> = this.userName.asObservable();

  constructor() { }

  updateUserId(userId: string) {
    this.userId.next(userId);
  }

  updateToken(token: string) {
    this.token.next(token);
  }

  updateUserName(userName: string) {
    this.userName.next(userName);
  }
}
