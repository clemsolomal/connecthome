import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder,Validators,FormArray} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userForm!:FormGroup;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder, private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      /*firstName: ['', Validators.required],
      lastName: ['', Validators.required],*/
      email: ['', [Validators.required, Validators.email]],
      password: ['', /*[*/Validators.required/*, Validators.pattern(/[0-9a-zA-Z]{6,}/)]*/],
      /*drinkPreference: ['', Validators.required],
      hobbies:this.formBuilder.array([])*/
    });
  }
  
  onSubmit() {
    const email = this.userForm.get('email')!.value;
    const password = this.userForm.get('password')!.value;
    
    this.authService.createNewUser(email, password).then(
      () => {
        this.router.navigate(['/connexion']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  /*getHobbies(): FormArray {
    return this.userForm.get('hobbies') as FormArray;
  }

  onAddHobby() {
    const newHobbyControl = this.formBuilder.control(null, Validators.required);
    this.getHobbies().push(newHobbyControl);
  }*/
}
