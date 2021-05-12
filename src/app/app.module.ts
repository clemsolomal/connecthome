import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppareilComponent } from './appareil/appareil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppareilService } from './services/appareil.service';


import { AppareilViewComponent } from './appareil-view/appareil-view.component';
import { Routes , RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { SingleAppareilComponent } from './appareil-view/single-appareil/single-appareil.component';
import { QuatreCentQuatreComponent } from './quatre-cent-quatre/quatre-cent-quatre.component';
import { AuthGuard } from './services/auth-guard.service';
import { EditAppareilComponent } from './appareil-view/edit-appareil/edit-appareil.component';
import { SeConnecterComponent } from './se-connecter/se-connecter.component';
import { NewUserComponent } from './se-connecter/new-user/new-user.component';
import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './header/header.component';

const appRoutes: Routes = [
  { path: 'appareils',canActivate: [AuthGuard], component: AppareilViewComponent },
  { path: 'appareils/view/:id',canActivate: [AuthGuard], component: SingleAppareilComponent },
  { path: 'appareils/edit', canActivate: [AuthGuard], component: EditAppareilComponent },
  { path: 'connexion', component: SeConnecterComponent },
  { path: 'new-user', component: NewUserComponent },
  { path: '', component: SeConnecterComponent},
  { path: 'not-found', component: QuatreCentQuatreComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    declarations: [
      AppComponent,
      AppareilComponent,
      AppareilViewComponent,
      SingleAppareilComponent,
      QuatreCentQuatreComponent,
      EditAppareilComponent,
      SeConnecterComponent,
      NewUserComponent,
      HeaderComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      RouterModule.forRoot(appRoutes),
      ReactiveFormsModule,
      HttpClientModule,
      
    ],
    providers: [
      AppareilService,
      AuthService,
      AuthGuard
    ],
    bootstrap: [AppComponent]
  })
export class AppModule { }
