import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, TitleStrategy } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IRolesInterface } from 'src/app/Model/Registration/IRolesInterface';
import { registration } from 'src/app/Model/Registration/registration';
import { RegistrationService } from 'src/app/Shared/UserServices/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
CreateUserRegistration:FormGroup;
Userregistrtion:registration;
showAlert:boolean;
result:any;
roleslist:IRolesInterface[]=[];
  constructor(private toastr:ToastrService,public registrationservice:RegistrationService, private router: Router,private fb:FormBuilder)
   {
    this.showAlert=false;
    this.CreateUserRegistration= new FormGroup({});
    this.Userregistrtion={} as registration;
    // this.roleslist={} as IRolesInterface;
   }

  ngOnInit(): void {
    this.CreateUserRegistration=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      userCity:['',[Validators.required,Validators.minLength(4)]],
      firstName:['',[Validators.required,Validators.minLength(4)]],
      lastName:['',[Validators.required,Validators.minLength(4)]],
      gender:['',[Validators.required]],
      roleid:['',[Validators.required]],
      // Passwords:this.fb.group({
      password:['',[Validators.required,Validators.minLength(4)]],
      confirmPassword:['',[Validators.required,Validators.minLength(4)]],
      // })
    },{Validators:this.comparePasswords});
    // this.CreateUserRegistration.reset();
    this.getUserRoles();
  }
  getUserRoles () {

    this.registrationservice.GetuserrolesList()
      .subscribe((res: any) => {
        debugger;
        this.roleslist = res;
        this.registrationservice.senderdata=res;
        if(this.result.isError)
        {
          this.toastr.error(this.result.message);
        }
  });
}
  comparePasswords(fb:FormGroup)
  {
    let confirmPswrdCtrl=fb.get('ConfirmPassowrd');
    if(confirmPswrdCtrl?.errors==null || 'passwordMismatch' in confirmPswrdCtrl.errors){
      if(fb.get('Password')?.value != confirmPswrdCtrl?.value)
        confirmPswrdCtrl?.setErrors({passwordMismatch:true});
        else
        confirmPswrdCtrl?.setErrors(null);


    }
  }

  onCreateSubmit(){
    this.Userregistrtion=this.CreateUserRegistration.value;
    debugger;
    this.registrationservice.RegisterUSer(this.Userregistrtion).subscribe((data:any)=>{
      debugger;
      this.result=data;
      if(this.result.isError)
      {
        this.toastr.error(this.result.message);
      }
      else
      {
        this.toastr.success(this.result.message);
        this.CreateUserRegistration.reset();

      }
    });
  }
  get passwordMatchError() {
    return (
      this.CreateUserRegistration.getError('mismatch') &&
      this.CreateUserRegistration.get('Passwords.ConfirmPassowrd')?.touched
    );
  }

  closeClick()
  {
    this.router.navigate(['/user/Registration']);
  }
  // user_login()
  // {
  //   this.router.navigate(['/user/Login']);
  // }
}
