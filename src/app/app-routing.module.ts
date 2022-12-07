import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanalComponent } from './admin-panal/admin-panal.component';
import { AuthGuard } from './auth/auth.guard';
import { ProductItemComponent } from './components/shopping-cart/productlist/product-item/product-item.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  // {path: '' ,redirectTo: '/home', pathMatch: 'full'},

  {path: '' ,redirectTo: 'user', pathMatch: 'full'},

  {
    //{ path: '**', redirectTo: '' }
    path: 'user' ,
    component:UserComponent,
    children: [
      //#region Components
      {path:'Login',component:LoginComponent},
      {path:'Registration',component:RegistrationComponent},
      {path:'profuct',component:ProductItemComponent}

      //#endregion
    ]
  },
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'adminpanel',component:AdminPanalComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
