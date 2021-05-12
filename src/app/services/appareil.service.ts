import {Subject} from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Appareil} from "../models/appareil.model";
import firebase from 'firebase';
import 'firebase/database';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({providedIn: 'root'})

export class AppareilService {
  appareils!:Appareil[];
  appareilsSubject = new Subject<any[]>();
  message!:string;

    constructor( private router :Router){
      this.GetAppareilFromServer();
    }

  emitAppareilSubject() {
    this.appareilsSubject.next(this.appareils);
  }
    
/*Echanger avec le serveur*/
  
  SaveAppareilToServer(){
    return new Promise (
      (resolve,reject) => {
        firebase.database().ref('/appareil').set(this.appareils).then(
          ()=> {
            this.emitAppareilSubject();
            this.message = "Enregistré!"
          }
          ,(error)=>{
            this.message = error;
          }
        )
      }
    )
  }

  GetAppareilFromServer(){
    firebase.database().ref('/appareil')
    .on('value', (data: DataSnapshot) => {
        this.appareils = data.val() ? data.val() : [];
        this.emitAppareilSubject();
    });
  } 
  
  getAppareilById(id: number) {
    
    return new Promise <Appareil>(
      (resolve, reject) => {
        firebase.database().ref('/appareil/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  addAppareil(newAppareil:Appareil) {
    this.appareils.push(newAppareil);
    this.SaveAppareilToServer();
    this.emitAppareilSubject;
    }

  removeAppareil(appareil: Appareil) {
    const appareilIndexToRemove = this.appareils.findIndex(
      (appareilEl) => {
        if(appareilEl === appareil) {
          return true;
        }
        else{
          return false;
        }
      }
    );
    this.appareils.splice(appareilIndexToRemove, 1);
    this.SaveAppareilToServer();
    this.emitAppareilSubject();
  }

    /*Changer le status*/
    switchOnAll() {
      for(let appareil of this.appareils) {
        appareil.status = 'allumé';
      }
      this.SaveAppareilToServer();
      this.emitAppareilSubject();
    }
      
    switchOffAll() {
      for(let appareil of this.appareils) {
        appareil.status = 'éteint';
      }
      this.SaveAppareilToServer();
      this.emitAppareilSubject();
   }
  
    switchOnOne(i: number) {
      this.appareils[i].status = 'allumé';
      this.SaveAppareilToServer();
      this.emitAppareilSubject();
    }
      
    switchOffOne(i: number) {
      this.appareils[i].status = 'éteint';
      this.SaveAppareilToServer();
      this.emitAppareilSubject();
    }
  
}