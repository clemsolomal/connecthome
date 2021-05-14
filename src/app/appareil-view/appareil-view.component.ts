import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { AuthService } from '../services/auth.service';
import {Subscription} from 'rxjs';
import { Router } from '@angular/router';
import {Appareil} from "../models/appareil.model";

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {

  isAuth : boolean = false; 
  appareils!:Appareil[];
  appareilSubscription!: Subscription;

  lastUpdate: Promise <Date> = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });

  constructor(private appareilService: AppareilService, private authService: AuthService, private router:Router) {}

  ngOnInit() {

    this.appareilService.GetAppareilFromServer();

    this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
      (appareils: Appareil[]) => {
        this.appareils = appareils;
      }
    );
    
    this.appareilService.emitAppareilSubject();

    this.isAuth = this.authService.isAuth;

    
  }
  
  onAllumer(){
    this.appareilService.switchOnAll();
  }
  
  onEteindre() {
    if(confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
      return this.appareilService.switchOffAll();
    } else {
      return null;
    }
  }
  

  onNewAppareil() {
    this.router.navigate(['appareils', 'edit']);
  }
 
  ngOnDestroy() {
    this.appareilSubscription.unsubscribe();
  }

}
