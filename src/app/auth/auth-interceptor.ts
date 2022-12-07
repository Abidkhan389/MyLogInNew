import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Route, Router } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { tap } from "rxjs/operators";
@Injectable()
export class Authinterceptor implements HttpInterceptor{

  constructor(private router:Router) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    if(localStorage.getItem('token')!=null)
    {
      // var tokenHeader= localStorage.getItem('token')
      const clonedreq = req.clone({
        headers: req.headers.set("Authorization",
            "Bearer " +localStorage.getItem('token'))
      });

      return next.handle(clonedreq).pipe(
        tap(
          succ=>{},
          err=>{
              if(err.status==401){
                localStorage.removeItem('token');
                this.router.navigate(['/user/Login']);
              }
              //   this.router.navigate(['/user/Login']);
          }
        )
      )
    }
    else
    {
      return next.handle(req.clone());
    }
  }

}
