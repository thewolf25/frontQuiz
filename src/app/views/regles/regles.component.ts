import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regles',
  templateUrl: './regles.component.html',
  styleUrls: ['./regles.component.css']
})
export class reglesComponent implements OnInit {
  

  courseSize = 32
  currentPage = 1
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  nextPage(){
    this.currentPage++ ;
  }

  public startQuiz() {
    this.router.navigate(['/presentation']);
  }
}
