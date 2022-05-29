import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regles',
  templateUrl: './regles.component.html',
  styleUrls: ['./regles.component.css']
})
export class reglesComponent implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public comecar() {
    this.router.navigate(['/presentation']);
  }
}
