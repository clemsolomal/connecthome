import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appareil } from '../../models/appareil.model';
import { AppareilService } from '../../services/appareil.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.scss']
})
export class SingleAppareilComponent implements OnInit {

  appareil!:Appareil;

  constructor(private appareilService: AppareilService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.appareilService.getAppareilById(+id).then(
      (appareil: Appareil) => {
        this.appareil = appareil;
      }
    );
  }
  onBack() {
    this.router.navigate(['/appareils']);
  }

}
