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
    this.router.navigate(['/regles']);


    if(this.formulario.valid) {

      this.api.cadastrauser(this.user).subscribe(user =>{
        this.user = new userModel();
        
        this.auth.setStorage('id', user.id);
        this.auth.setStorage('nom', user.nom);
        this.auth.setStorage('email', user.email);

        var userdata = {
          nom: user.nom,
          email: user.email
        }

        this.http.sendEmail("http://localhost:3000/sendmail", userdata).subscribe(
          data => {
            let res:any = data; 
            console.log(
              `👏 > 👏 > 👏 > 👏 ${user.nom} a été enregistré avec succès et l'e-mail a été envoyé et l'identifiant du message est ${res.messageId}`
            );
          },
          err => {
            return Promise.reject(`Il n'a pas été possible d'envoyer l'e-mail ! ${err}`).catch(err => {
              throw new Error(err);
            });
          }
        );
      

        }, err => {
          document.querySelector('#email-invalido')!.innerHTML = `
          <span class="text-danger">Email existe déja.</span>
          `;
        });
    } 
  }
}
