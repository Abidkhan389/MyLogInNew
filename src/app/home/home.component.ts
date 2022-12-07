import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LogedInUSerInfo } from '../Model/Login/LogedInUSerInfo';
import { LoginService } from '../Shared/UserServices/login.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userdata:LogedInUSerInfo;
  showAlertAdmin:boolean;
  showAlertuser:boolean;
  showAlertcustomer:boolean;
  userresult:any=[];
  totalRecords:any;
  showResult:boolean;
  page:number=1;
  showpagenumber:boolean;
  loginusername:any;
  rolename:any;
  currentuserinfo:FormGroup;
  constructor(private router:Router, private userservice:LoginService,private toastr:ToastrService,private fb:FormBuilder )
  {
    console.log(router);
     if(!this.userservice.currentUser.permissions.includes((obj:any)=>obj.url==this.router.routerState.snapshot.url)){
       this.router.navigate(['/user/Login']);
     }
    this.userdata={} as LogedInUSerInfo;
    this.showAlertAdmin=false;
    this.showAlertuser=false;
    this.showAlertcustomer=false;
    this.showResult=false;
    this.showpagenumber=false;
    this.currentuserinfo=new FormGroup({});
  }

  ngOnInit(): void {
    this.UserInfoList();
    this.checkrole();
    this.loginusername=this.userservice.currentUser.userName;
    this.rolename=this.userservice.currentUser.roleName;
  }
  checkrole(){
    debugger;
    if(this.userservice.currentUser.roleName=="Admin")
    {
      this.showAlertAdmin=true;
    }
    else if(this.userservice.currentUser.roleName=="user")
    {
    this.showAlertuser=true;
    }
    else{
    this.showAlertcustomer=true;

    }
  }
  OnLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/user/Login']);
  }
  UserInfoList(){
    this.userservice.getuserprofile().subscribe((data:any)=>{
      console.log(data);
      if(data.status=='Success')
      {
        this.userresult=data.data;
        this.showResult=true;
      }
      // this.userresult=data;
      // if(this.userresult.isError)
      // {
      //   this.toastr.error(this.userresult.message);
      // }
      // else
      // {
      //   this.showResult=true;
      //   this.showAlert=true;
      //   this.totalRecords=data.length;
      //  this.showpagenumber=true;
      // }

    });
  }

}
