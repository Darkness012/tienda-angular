import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './user-interface';

@Injectable({
  providedIn: 'root'
})


export class MainService {

  private loginStatus: boolean = false;
  private urlBase: string;
  
  constructor(private http: HttpClient) { 
    this.urlBase = "http://localhost:8080/users/";
    this.loginStatus = false;
    this.getLogginStatus().subscribe((response:any)=>{
      this.loginStatus = response.isLogged?true:false;
      console.log(this.loginStatus);
    })

  }
  
  isLogged():boolean{
    return this.loginStatus;
  } 
  setLogginStatus(val:boolean){
    this.loginStatus = val;
  }

  getCurrentUser():Observable<any>{
    return this.http.get(this.urlBase+"info", {
      headers: new HttpHeaders({
          'Access-Control-Allow-Origin':'*',
         }), withCredentials:true
    });
  }
  validateUser(user: Usuario):Observable<object>{
    return this.http.post(this.urlBase+"login", user, {
        
        withCredentials: true
    });
  }

  createNewUser(user: Usuario):Observable<object>{


    //CREATE NEW USER IN DATABASE
    return this.http.post(this.urlBase+"register", user,{
      headers: new HttpHeaders({
          'Access-Control-Allow-Origin':'*',
         }), withCredentials:true
    });
  }

  logOut():Observable<object>{
    return this.http.post(this.urlBase+"logout", {},{
      headers: new HttpHeaders({
          'Access-Control-Allow-Origin':'*',
         }), withCredentials: true
    });

    
  }

  getLogginStatus():Observable<object>{
    return this.http.post(this.urlBase+"islogged", {}, {
      headers: new HttpHeaders({
          'Access-Control-Allow-Origin':'*',
         }), withCredentials: true
    });
  }
}
