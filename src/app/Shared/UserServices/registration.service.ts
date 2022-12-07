import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { registration } from 'src/app/Model/Registration/registration';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private headers:HttpHeaders;
  public senderdata:any;
  readonly ApiUrl="https://localhost:44324/api/";

  constructor(private http:HttpClient)
  {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }
  RegisterUSer(user_register:registration){
    return this.http.post(`${this.ApiUrl}Account/Register`,user_register,{headers:this.headers})
  }
  GetuserrolesList(){
    return this.http.get(`${this.ApiUrl}Administration/GetAllRoles/`);
  }

}
