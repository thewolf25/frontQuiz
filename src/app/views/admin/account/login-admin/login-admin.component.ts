import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { user } from './user';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent{
  public formulario: FormGroup = new FormGroup({});
  public user: user = new user();

  constructor(
    private auth: AuthService,
    private router: Router
    ){ }

  public login(): void {
    if(this.user.email === 'admin@ids.inf.br' && this.user.senha === 'admin0207') {
      this.router.navigate(['/admin/ranking']);
      this.auth.setStorage('user', this.user.email);
    } else {
      document.querySelector('#erro-message')!.innerHTML = `
      <span class="text-danger">Usuário ou senha inválidos.</span>
      `;
    }
  }
}
