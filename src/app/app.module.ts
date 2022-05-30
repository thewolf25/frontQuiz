import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { QuestioncardComponent } from './components/questioncard/questioncard.component';
import { reglesComponent } from './views/regles/regles.component';
import { LoginComponent } from './views/login/login.component';
import { resultComponent } from './views/result/result.component';
import { RankingComponent } from './views/ranking/ranking.component';
import { presentationComponent } from './views/presentation/presentation.component';

import { QuizService } from './quiz.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './views/admin/admin.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './views/admin/account/shared/account/account.component';
import { NavbarRankingComponent } from './components/navbar-ranking/navbar-ranking.component';
import { NavbarQuestionComponent } from './components/navbar-question/navbar-question.component';
import { LoginAdminComponent } from './views/admin/account/login-admin/login-admin.component';

import { CanActivateRouteGuard } from './can-activate-route.guard';
import { MatPseudoCheckboxModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    QuestioncardComponent,
    reglesComponent,
    LoginComponent,
    resultComponent,
    RankingComponent,
    presentationComponent,
    AdminComponent,
    AccountComponent,
    NavbarRankingComponent,
    NavbarQuestionComponent,
    LoginAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    
  ],
  providers: [HttpClientModule,QuizService,CanActivateRouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
