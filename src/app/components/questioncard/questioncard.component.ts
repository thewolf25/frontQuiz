import { reponseModule } from '../../models/reponse.module';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
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
  public options!:Array<any>;
  constructor(
    private quizService: QuizService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.authenticate();
    this.listquestions();
    this.timeQuestion();
  }

  public listquestions() {
    this.quizService.listquestion().subscribe(question => {
      this.question = question
    }, err => {
      console.error('error', err);
    });
  }



  public onAnswer(f:NgForm): void {
    console.log("************* form value ***********")
    console.log(this.question[this.currentQuiz].options)
    console.log("************************************")
    this.options = this.question[this.currentQuiz].options
    const responses = f.value
    let responseTosend = Object.keys(responses).filter((index)=> responses[index] === true)
    responseTosend = this.options.filter((opt)=> responseTosend.includes(`${opt.id}`) )
    console.log(responseTosend)
  console.log(responseTosend);
 
   
    if (this.answer == undefined || this.answer == 0) {
      this.reponse.option_id = null;
    }
    //register reponse
    responseTosend.forEach((item)=>{
         

    this.reponse = {
      option_id: item,
      question_id: {
        id: this.question[this.currentQuiz].id
      },
      user_id: {
        id: this.auth.getStorage('id')
      },
      temp_reponse: this.time
    }
    this.quizService.saveReponse(this.reponse).subscribe(res => {
      this.reponse = new reponseModule();
 
    } , 
    err =>{
      console.log(err)
    }
    );
    })

    
    this.answer = 0
    this.currentQuiz++;
    if (this.currentQuiz >= this.question.length) {
      clearInterval(this.interval);
      this.router.navigate(['/result']);
    }

    this.time = 30;
  }

  public timeQuestion(): void {
    this.interval = setInterval(() => {
      if (this.time <= 11) {
        document.querySelector('#timer')?.classList.add('text-danger')
        document.querySelector('#timer')?.classList.add('ef-pulse-grow')
      } else {
        document.querySelector('#timer')?.classList.remove('text-danger')
        document.querySelector('#timer')?.classList.remove('ef-pulse-grow')
      }

      if (this.time > 1) {
        this.time--;
      } else {
        if (this.time == 1) {
          this.answer = 0;
          // this.onAnswer();
        } else {
          this.currentQuiz++;
        }
        this.time = 30;

        if (this.currentQuiz == this.question.length) {
          this.router.navigate(['/result']);
        }
      }
    }, 1000)
  }

  public authenticate(): void {
    if(localStorage.getItem("id") === null || localStorage.getItem("nom") === null) {
      this.router.navigate(['/login']);
    }
  }



}