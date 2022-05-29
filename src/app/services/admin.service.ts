import { optionModule } from '../models/option.module';
import { questionModule } from '../models/question.module';
import { userModel } from './../views/login/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  public baseUrl: string;

  constructor(private http: HttpClient, private api: ApiService) {
    // this.baseUrl = `http://localhost:8080/api`;
    this.baseUrl = api.api;
   }
   /**
   * @GetMapping("/questions")
	 * @ApiOperation(value="list as questions")
   */
  listquestion() : Observable<any> {
    return this.http.get(`${this.api.api}/questions`);
  }
   /**
   * @PostMapping("/question")
	 * @ApiOperation(value="Cadastra uma question")
   */
  cadastraquestion(question: questionModule) : Observable<any> {
    return this.http.post(`${this.api.api}/question/`, question);
  }
   /**
   * @PostMapping("/option")
	 * @ApiOperation(value="Cadastra choix")
   */
  cadastraoption(option: optionModule): Observable<any> {
    return this.http.post(`${this.api.api}/option/`, option);
  }
  /**
   * @PostMapping("/user")
	 * @ApiOperation(value="Cadastra um user")
   */
  cadastrauser(user: userModel): Observable<any> {
    return this.http.post(`${this.api.api}/user/`, user);
  }

}
