import { userModel } from './user.model';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuizService } from 'src/app/quiz.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http-service.service';
import { Router } from '@angular/router';
import { MatRadioButton } from '@angular/material/radio';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  @ViewChild(MatRadioButton) groupC: any = {};

  public user: userModel = new userModel();
  public formulario: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private api: QuizService,
    private auth: AuthService,
    private http: HttpService,
    private router: Router,
    public apiCOnfig: ApiService
    ){ 
      this.formulario = this.formBuilder.group({
        nom: ['', Validators.required],
        email: ['', Validators.compose([
            Validators.required,
            Validators.email
        ])]
    });
  }

  public login(): void {

    
    if(this.formulario.valid) {

      this.api.inscriptionuser(this.user).subscribe(user =>{
        this.user = new userModel();
        
        this.auth.setStorage('id', user.id);
        this.auth.setStorage('nom', user.nom);
        this.auth.setStorage('email', user.email);

        var userdata = {
          nom: user.nom,
          email: user.email
        }
        
        this.router.navigate(['/regles']);

        }, err => {


          console.log(err)
          document.querySelector('#email-invalido')!.innerHTML = `
          <span class="text-danger">Email existe déja.</span>
          `;
        });
    } 
  }
}
