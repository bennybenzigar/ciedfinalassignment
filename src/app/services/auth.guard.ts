import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// export const authGuard: CanActivateFn = (route, state) => {
//   constructor(){}
//   return true;
// };
@Injectable()
export class authGuardService implements CanActivate {
  
  constructor(private dataService: DataService, private router:Router) {

    
    // console.log('user')
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
//  if(this.dataService.isAuthenticated()){
//   return true
//  }
//   else{
//   this.router.navigateByUrl('login')
//     return false
//   }
//   }
if(localStorage.getItem('user')){
  return true
 }
  else{
  this.router.navigateByUrl('login')
    return false
  }
  }


}