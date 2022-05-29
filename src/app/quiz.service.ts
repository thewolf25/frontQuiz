import { userModel } from './views/login/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { reponseModule } from './models/reponse.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  public baseUrl;

  constructor(
    private http: HttpClient) {
    this.baseUrl = environment;
   }

  listquestion() : Observable<any> {
    return this.http.get(`${this.baseUrl.api}/questions`);
  }
  
  listchoix() : Observable<any> {
    return this.http.get(`${this.baseUrl.api}/choix`);
  }

  listusers() : Observable<any> {
    return this.http.get(`${this.baseUrl.api}/users`);
  }

  listRanking() : Observable<any> {
    return this.http.get(`${this.baseUrl.api}/ranking`);
  }

  cadastrauser(user: userModel): Observable<any> {
    return this.http.post(`${this.baseUrl.api}/user/`, user);
  }

  cadastrareponse(reponse: reponseModule): Observable<any> {
    return this.http.post(`${this.baseUrl.api}/reponse`, reponse);
  }
}
