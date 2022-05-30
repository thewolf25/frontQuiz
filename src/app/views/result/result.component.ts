import { AuthService } from '../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})


export class resultComponent implements OnInit {
  @Input() public nom: string = '';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    if( !(Object.keys(this.auth.getStorage('nom')).length === 0)){
        this.nom = this.auth.getStorage('nom');
    }
    setTimeout(()=>{
      this.auth.clearStorage();
    }, 2000);
  }

}
