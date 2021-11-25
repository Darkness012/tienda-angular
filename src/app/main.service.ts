import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private logginStatus: boolean;
  private userId: string;

  constructor() { 
    this.logginStatus = this.getLogginStatus();
    this.userId = this.logginStatus?this.getLoggedUserId(): '';
  }
  
  getUserId(): string{
    return this.userId;
  }
  isLogged():boolean{
    return this.logginStatus;
  }

  setUserId(id: string):void{
    this.logginStatus = true;
    this.userId = id;
  }
  createNewUser(user: object){
    //CREATE NEW USER IN DATABASE
  }

  logOut():void{
    this.logginStatus = false;
    this.userId = '';
  }

  private getLogginStatus(): boolean{
    return true;
  }
  private getLoggedUserId(): string{
    return '';
  }
}
