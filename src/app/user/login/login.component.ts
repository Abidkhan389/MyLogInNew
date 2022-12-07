import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/Model/Login/Login';
import { LoginService } from 'src/app/Shared/UserServices/login.service';
import { RegistrationService } from 'src/app/Shared/UserServices/registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm:FormGroup;
  LogIndata:Login;
  showAlert:boolean;
  result:any;
  @Input()  parentdata:any;
  constructor(private toastr:ToastrService,public registrationservice:RegistrationService,public Loginservice:LoginService, private router: Router,private fb:FormBuilder)
  {
    this.showAlert=false;
    this.LoginForm= new FormGroup({});
    this.LogIndata={} as Login;
    this.parentdata=this.registrationservice.senderdata;
  }


  ngOnInit(): void {
    this.LoginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(4)]],
    });
    if(localStorage.getItem('token')!= null)
      {
        this.router.navigate(['/home']);
      }

    // this.CreateUserRegistration.reset();
  }
  onCreateSubmit(){
    this.LogIndata=this.LoginForm.value;
    debugger;
    this.Loginservice.Loginuser(this.LogIndata).subscribe((data:any)=>{
      debugger;
      console.log(data);
      this.result=data;

      localStorage.setItem('user',JSON.stringify(data.user));
      this.Loginservice.currentUser=data.user;
      if(this.result.isError)
      {
        this.toastr.error('Invaled Email and Password','Authentication failed');
        this.toastr.error();
      }
      else
      {
        this.toastr.success('Loged In');
        localStorage.setItem('token',this.result.token);
        console.log(this.result);
        this.router.navigate(['/home']);
       // this.LoginForm.reset();

      }
    });
  }
  closeClick()
  {
    this.router.navigate(['/user/Registration']);
  }
}
