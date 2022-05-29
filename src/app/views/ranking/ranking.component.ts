import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  public rankingTotal: Array<any> = new Array();
  public vencedores: Array<any> = new Array();
  public classificacao: Array<any> = new Array();

  public primeiro: any = {};
  public segundo: any = {};
  public terceiro: any = {};
  public quarto: any = {};
  public quinto: any = {};

  constructor(
    private api: QuizService,
    private auth: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.autenticacao();
    this.getlistRanking();
  }

  public getlistRanking(): void {
    this.api.listRanking().subscribe(data => {
      this.rankingTotal = data;
      this.getlistVencedores();
      this.getlistDemaisParticipantes();

      console.log(`Ranking: ${JSON.stringify(this.rankingTotal)}`)

      this.vencedores.forEach((v: any) => {
        if (v.posicao == 1) {
          this.primeiro = {
            nom: v.nom,
            taches: v.taches
          }
        } else if (v.posicao == 2) {
          this.segundo = {
            nom: v.nom,
            taches: v.taches
          }
        } else if (v.posicao == 3) {
          this.terceiro = {
            nom: v.nom,
            taches: v.taches
          }
        } else if (v.posicao == 4) {
          this.quarto = {
            nom: v.nom,
            taches: v.taches
          }
        } else if (v.posicao == 5) {
          this.quinto = {
            nom: v.nom,
            taches: v.taches
          }
        }
      });
    }, err => {
      console.log('Não foi possível exibir o ranking.', err);
    });
  }

  public getlistVencedores() {
    this.vencedores = this.rankingTotal.filter(this.getCincoPrimeiros);
  }

  public getlistDemaisParticipantes() {
    this.classificacao = this.rankingTotal.filter(this.getDemaisParticipantes);
  }

  public getCincoPrimeiros(value: any) {
    return (value.posicao <= 5);
  }

  public getDemaisParticipantes(value: any) {
    return (value.posicao > 5);
  }

  public autenticacao(): void {
    if(localStorage.getItem("user") === null) {
      this.auth.clearStorage();
      this.router.navigate(['/admin/login']);
    }
  }
}