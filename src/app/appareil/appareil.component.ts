import { Component,Input, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import {Appareil} from "../models/appareil.model";
import {Router} from "@angular/router";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {

  @Input() appareilName: string = 'rien';
  @Input() appareilStatus: string = 'éteint';
  @Input() index:number = 0;
  @Input() id:number=0;

  appareils!:Appareil[];
  appareilSubscription!: Subscription;
  

  
  constructor(private appareilService: AppareilService, private router:Router) { }

  ngOnInit(){
    this.appareilService.GetAppareilFromServer();

    this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
      (appareils: Appareil[]) => {
        this.appareils = appareils;
        
      }
    );
    
       
    this.appareilService.emitAppareilSubject();

    

  
  }
  
  

  onDeleteAppareil(appareil: Appareil) {
    this.appareilService.removeAppareil(appareil);
  }

  onViewAppareil(id: number) {
    this.router.navigate(['/appareils/view', id]);
  }

  getColor(){
    if (this.appareilStatus == "éteint"){
        return "red";
    }else{
      return "green";
    }
  }

  onSwitch() {
    if(this.appareilStatus === 'allumé') {
      this.appareilService.switchOffOne(this.index);
    } else if(this.appareilStatus === 'éteint') {
      this.appareilService.switchOnOne(this.index);
    }
  }

}

