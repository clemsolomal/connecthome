import { Component,OnInit/*,OnDestroy*/ } from '@angular/core';
/*import { AppareilService } from './services/appareil.service';
import { Observable } from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';*/
import 'rxjs/add/observable/interval';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /*secondes: number=0;
  counterSubscription!: Subscription;*/
  

  constructor(private authService: AuthService){
    var firebaseConfig = {
      apiKey: "AIzaSyBPJGxjOJes1-un4qtsuKTUE4T6Ug99JS0",
      authDomain: "maison-connectee-72af6.firebaseapp.com",
      databaseURL: "https://maison-connectee-72af6-default-rtdb.firebaseio.com",
      projectId: "maison-connectee-72af6",
      storageBucket: "maison-connectee-72af6.appspot.com",
      messagingSenderId: "863831249373",
      appId: "1:863831249373:web:5ae9b9dc50f74c548aa634",
      measurementId: "G-MKG2PJYC9E"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    }
  
  /*ngOnInit() {

    
    /*const counter = Observable.interval(1000);
    this.counterSubscription = counter.subscribe(
      (value) => {
        this.secondes = value;
      },
      (error) => {
        console.log('Uh-oh, an error occurred! : ' + error);
      },
      () => {
        console.log('Observable complete!');
      }
    );

  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }*/


}
