import { LoginAdminComponent } from './views/admin/account/login-admin/login-admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestioncardComponent } from './components/questioncard/questioncard.component';
import { reconnaissanceComponent } from './views/reconnaissance/reconnaissance.component';
import { presentationComponent } from './views/presentation/presentation.component';
import { LoginComponent } from './views/login/login.component';
import { RankingComponent } from './views/ranking/ranking.component';
import { reglesComponent } from './views/regles/regles.component';
import { AdminComponent } from './views/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  { path:'login', component: LoginComponent },
  { path:'presentation', component: presentationComponent },
  { path: 'regles', component: reglesComponent },
  
  { path:'quiz', component: QuestioncardComponent },
  { path:'reconnaissance', component: reconnaissanceComponent },
  
  { path: 'admin/result', component: AdminComponent},
  { path: 'admin/login', component: LoginAdminComponent},
  { path: 'admin/ranking', component: RankingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
