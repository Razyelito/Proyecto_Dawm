import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { TokenStorageService } from '../servicios/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';  
  
  //AuthService para login
  //tokenStorage guardar el token de la sesion
  constructor(private router: Router,private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;      
    }
  }
//funcion login que llama al servicio auth para comprobar el login y generar token para la sesion
  login(form){
    this.authService.login(form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;        
        this.router.navigate(['/dashboard']);//inicion correcto direccionamos al dashboard
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

}
