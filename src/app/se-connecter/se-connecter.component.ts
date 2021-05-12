import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'se-connecter',
  templateUrl: './se-connecter.component.html',
  styleUrls: ['./se-connecter.component.scss']
})
export class SeConnecterComponent implements OnInit {
  signinForm!: FormGroup;
  errorMessage!: string;
  isAuth!: boolean; 

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.isAuth = this.authService.isAuth;
  }

  initForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', /*[*/Validators.required /*, Validators.pattern(/[0-9a-zA-Z]{6,}/)]*/]
    });
  }

  onSubmit() {
    const email = this.signinForm.get('email')!.value;
    const password = this.signinForm.get('password')!.value;
    
    this.authService.signInUser(email, password).then(
      () => {
        this.router.navigate(['appareils']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }


}
