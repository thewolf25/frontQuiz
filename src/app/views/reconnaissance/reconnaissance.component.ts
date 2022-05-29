import { AuthService } from '../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reconnaissance',
  templateUrl: './reconnaissance.component.html',
  styleUrls: ['./reconnaissance.component.css']
})
export class reconnaissanceComponent implements OnInit {
  @Input() public nom: string = '';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.nom = this.auth.getStorage('nom');
    
    setTimeout(()=>{
      this.auth.clearStorage();
    }, 2000);
  }

}
