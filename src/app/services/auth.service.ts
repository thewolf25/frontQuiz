import { user } from './../views/admin/account/login-admin/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Storage;
  private userAuth: boolean = false;

  constructor(private router: Router) { 
    this.auth = window.localStorage;
  }
  //testa se o navegador suporta o localstorage
  setStorage(key: string, value: any): boolean {
    if (this.auth) {
      this.auth.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  getStorage(key: string): any {
    if (this.auth) {
      return JSON.parse(this.auth.getItem(key) || '{}');
    }

    return null;
  }

  removeStorage(key: string): boolean {
    if (this.auth) {
      this.auth.removeItem(key);
      return true;
    }
    return false;
  }

  clearStorage(): boolean {
    if (this.auth) {
      this.auth.clear();
      return true;
    }
    return false;
  }

  logar(user: user) {
    if(user.email === 'admin@ids.inf.br' && user.senha === 'admin0207') {
        this.userAuth = true;
        this.router.navigate(['/admin/ranking']);
      } else {
        this.userAuth = false;
        this.router.navigate(['/admin/login']);
    }
  }
}
