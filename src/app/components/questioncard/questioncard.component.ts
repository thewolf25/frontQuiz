import { reponseModule } from '../../models/reponse.module';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuizService } from 'src/app/quiz.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questioncard',
  templateUrl: './questioncard.component.html',
  styleUrls: ['./questioncard.component.css']
})
export class QuestioncardComponent implements OnInit {
  @Input() public optionid: number = 0;

  public obj_option = {
    id: null
  }
  public time: number = 30;
  public question: Array<any> = new Array();
  public option: Array<any> = new Array();
  public control = new FormControl();
  public reponse: reponseModule = new reponseModule();
  public displayElement = true;
  public currentQuiz = 0;
  public count = 1;
  public interval: any;
  public answer: any;
  constructor(
    private quizService: QuizService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.autenticacao();
    this.listquestions();
    this.timeQuestion();
  }

  public listquestions() {
    this.quizService.listquestion().subscribe(question => {
      this.question = question
    }, err => {
      console.error('Não foi possível exibir a question.', err);
    });
  }

  public onAnswer(): void {
    
    this.reponse = {
      option_id: {
        id: parseInt(this.answer)
      },
      question_id: {
        id: this.question[this.currentQuiz].id
      },
      user_id: {
        id: this.auth.getStorage('id')
      },
      temp_reponse: this.time
    }
    console.log('antes' + this.answer);

    console.log('antes1' + this.reponse.option_id);
   
    //se a escolha dor indefinido(caso o usuário nao seleciona nenhuma) a opção é salva como null
    if (this.answer == undefined || this.answer == 0) {
      console.log('entrou' + this.answer);
      this.reponse.option_id = null;
    }
    //registrando a reponse
    this.quizService.cadastrareponse(this.reponse).subscribe(res => {
      this.reponse = new reponseModule();

    });
    
    this.answer = 0

    this.currentQuiz++;
    //se a qtde de questoes for maior do que a qtde de questions irá redirecionar para a tela de reconnaissance
    if (this.currentQuiz >= this.question.length) {
      clearInterval(this.interval);
      this.router.navigate(['/reconnaissance']);
    }

    this.time = 30;
  }

  public timeQuestion(): void {
    this.interval = setInterval(() => {
      //Irá exibir o emoji quando o timer estiver em 10seg
      if (this.time <= 11) {
        document.querySelector('#timer')?.classList.add('text-danger')
        document.querySelector('#timer')?.classList.add('ef-pulse-grow')
        document.querySelector('#clock')?.classList.add('display-block')
      } else {
        document.querySelector('#timer')?.classList.remove('text-danger')
        document.querySelector('#timer')?.classList.remove('ef-pulse-grow')
        document.querySelector('#clock')?.classList.remove('display-block')
      }

      if (this.time > 1) {
        this.time--;
      } else {
        if (this.time == 1) {
          this.answer = 0;
          this.onAnswer();
        } else {
          this.currentQuiz++;
        }

        document.querySelector('#timer')?.classList.remove('text-danger')
        document.querySelector('#timer')?.classList.remove('ef-pulse-grow')
        document.querySelector('#clock')?.classList.remove('display-block')

        this.time = 30;

        if (this.currentQuiz == this.question.length) {
          this.router.navigate(['/reconnaissance']);
        }
      }
    }, 1000)
  }

  public autenticacao(): void {
    if(localStorage.getItem("id") === null || localStorage.getItem("nom") === null) {
      this.router.navigate(['/login']);
    }
  }
}