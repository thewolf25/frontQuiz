import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  @Input() public time: number = 0;

  public visibility: boolean = false;

  constructor() { }

  public countdown(interval: any,time: number, currentQuiz: number, question: any ): void {
    interval = setInterval(() => {
      if (time > 1) {
        time--;
        console.log(`temp: ${time}`);
      } else {
        time = 30;
        currentQuiz++;
        if (currentQuiz == question.length) {
          window.location.replace("/reconnaissance");
        }
      }
    }, 1000)
  }



}
