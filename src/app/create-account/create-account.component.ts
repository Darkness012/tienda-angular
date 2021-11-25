import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  registro: FormGroup;
  checkPasswords: ValidatorFn;
  controls: any; 
  matcher: MyErrorStateMatcher

  constructor( private mainService: MainService, private router: Router) {
    this.matcher = new MyErrorStateMatcher();
    this.controls = {
      hidePass: true, 
      hideConfirmPass: true
    };
    this.checkPasswords = (group: AbstractControl):  ValidationErrors | null => { 
      let pass = group.get('password')?.value;
      let confirmPass = group.get('confirmPassword')?.value
      return pass === confirmPass ? null : { notSame: true }
    }
    this.registro = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.minLength(6)),
      accept: new FormControl('',Validators.requiredTrue)
    }, {validators:this.checkPasswords});

  }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.mainService.createNewUser(this.registro.value);
    this.mainService.setUserId(this.registro.value.user);
    this.router.navigateByUrl('home');
  }

}

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {

    if(control?.parent?.value.password.length<6) return false;

    return control?.value != control?.parent?.value.password;
  }
}