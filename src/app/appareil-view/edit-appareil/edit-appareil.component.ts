import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../../services/appareil.service';
import {Appareil} from "../../models/appareil.model";
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-edit-appareil',
  templateUrl: './edit-appareil.component.html',
  styleUrls: ['./edit-appareil.component.scss']
})
export class EditAppareilComponent implements OnInit {

  appareilForm!:FormGroup;
  message!:string;

  constructor(private formBuilder : FormBuilder, private appareilService: AppareilService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.appareilForm = this.formBuilder.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      
    });
  }

  onSaveAppareil(){
    const name =  this.appareilForm.get('name')!.value;
    const status = this.appareilForm.get('status')!.value;
    const newAppareil = new Appareil(name, status);
    newAppareil.id = this.appareilService.appareils [(this.appareilService.appareils.length-1)].id+1;
    this.appareilService.addAppareil(newAppareil);
    this.message = this.appareilService.message;
    
  }

  OnBack(){
    this.router.navigate(['/appareils']);
  }

}
