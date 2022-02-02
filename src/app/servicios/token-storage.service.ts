import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private TOKEN_KEY = 'auth-token';
  private USER_KEY = 'auth-user';

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    //window.sessionStorage.removeItem(this.TOKEN_KEY);
    //window.sessionStorage.setItem(this.TOKEN_KEY, token);
    window.localStorage.removeItem(this.TOKEN_KEY);
    window.localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string {
    //return sessionStorage.getItem(this.TOKEN_KEY);
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public saveUser(usuario): void {
    //window.sessionStorage.removeItem(this.USER_KEY);
    //window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(usuario));
    window.localStorage.removeItem(this.USER_KEY);
    window.localStorage.setItem(this.USER_KEY, JSON.stringify(usuario));
  }

  public getUser(): any {
    //return JSON.parse(sessionStorage.getItem(this.USER_KEY));
    return JSON.parse(localStorage.getItem(this.USER_KEY));
  }
}
