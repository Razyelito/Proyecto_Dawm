import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../servicios/token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class DashboardAccesoGuard implements CanActivate {
 
  isLoggedIn = false;      

  constructor(private router: Router,private tokenStorageService: TokenStorageService) {
    
  }  


  canActivate(){
    this.isLoggedIn = !!this.tokenStorageService.getToken();       
    if (this.isLoggedIn) {      
      const user = this.tokenStorageService.getUser();
      return true;
    }else{
      this.router.navigate(['/login']); 
      return false;
    }
  }
  
}


