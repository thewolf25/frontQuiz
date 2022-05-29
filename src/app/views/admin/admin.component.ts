import { QuizService } from 'src/app/quiz.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public result: Array<any> = new Array();
  public participantes: any = {};

  public temp: any = {};

  constructor(private api: QuizService) { }

  ngOnInit(): void {
    this.getresult();
  }

  public getresult(): void {
    this.api.listRanking().subscribe(data => {
      this.result = data;
      this.temp = this.setCalculotemp(data.soma_temp_reponses),

      console.log(`Ranking: ${JSON.stringify(this.result)}`)
    }, err => {
      console.log('Não foi possível exibir o result.', err);
    });
  }

  public setCalculotemp(value: any) {
    return (value.soma_temp_reponses - 450 / 60);
  }


}
