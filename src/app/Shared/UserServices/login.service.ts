import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogedInUSerInfo } from 'src/app/Model/Login/LogedInUSerInfo';
import { Login } from 'src/app/Model/Login/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //private headers:HttpHeaders;
  readonly ApiUrl="https://localhost:44324/api/";
  public currentUser:any;
  constructor(private http:HttpClient)
  {
    // this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    // var tokenHeader= localStorage.getItem('token')
    // this.headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${tokenHeader}`
    // });
    if(localStorage.getItem('user')!=null){
      var data:any=localStorage.getItem('user');
      this.currentUser=JSON.parse(data);
      console.log('cools=',this.currentUser);
    }

  }
  Loginuser(user_login:Login){
    return this.http.post(`${this.ApiUrl}Account/Login`,user_login)
  }
  getuserprofile(){

    return this.http.get(`${this.ApiUrl}userProfile/GetUserInfo/`);
    // var result= this.http.get<any>(`${this.ApiUrl}Category/GetByID?Id=${val}`, {headers: this.headers});
    // return this.http.get<any>(`${this.ApiUrl}Category/All`,{headers: this.headers});

  }


}

