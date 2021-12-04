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
  matcher: MyErrorStateMatcher;
  showContent: boolean;

  constructor( 
    private mainService: MainService, 
    private router: Router
    ) {
      this.showContent = false;

      this.mainService.getLogginStatus().subscribe((respuesta:any)=>{
        console.log(respuesta);
        
        if(respuesta.isLogged){
          console.log("loggeado");
          
          this.router.navigateByUrl("home");
        }else{
          console.log("no logeado");
          this.mainService.setLogginStatus(false);
          this.showContent = true;
        }
      })

      this.matcher = new MyErrorStateMatcher();
      this.controls = {
        validEmail: true,
        validPhone: true,
        hidePass: true, 
        hideConfirmPass: true
      };
      this.checkPasswords = (group: AbstractControl):  ValidationErrors | null => { 
        let pass = group.get('pass')?.value;
        let confirmPass = group.get('confirmPassword')?.value
        return pass === confirmPass ? null : { notSame: true }
      }
      this.registro = new FormGroup({
        nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]),
        apellido: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        telefono: new FormControl('', Validators.required),
        pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', Validators.minLength(6)),
        accept: new FormControl('',Validators.requiredTrue)
      }, {validators:this.checkPasswords});

  }

  ngOnInit(): void {
  }

  focusEmail(): void {
    this.controls.validEmail = true;
    console.log("Focus email");
    
  }

  focusPhone(): void {
    this.controls.validPhone = true;
    console.log("Focus phone");
  }

  onSubmit(): void{


    //PARSING PHONE TO STRING
    this.registro.value.telefono = this.registro.value.telefono.toString();

    this.mainService.createNewUser(this.registro.value)
    .subscribe((response:any)=>{

      console.log(response);
      

      if(response.success){

        //SUCCESS, REDIRECT
        this.mainService.setLogginStatus(true);
        this.router.navigateByUrl("home");
        
        
      }
      else {
        //EMAIL REPEATEd
        if(response.emailExists){
          console.log("Email already used");

          this.controls.validEmail = false;
          this.registro.controls['email']?.setErrors({'incorrect': true});

        }

        //PHONE REPEATED
        if(response.phoneExists){
          console.log("Phone already used");

          this.controls.validPhone = false;
          this.registro.controls['telefono']?.setErrors({'incorrect': true});
        }
       
      }
    })

    /*this.mainService.createNewUser(this.registro.value);
    this.mainService.setUserId(this.registro.value.user);
    this.router.navigateByUrl('home');*/
  }

}

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {

    if(control?.parent?.value.pass.length<6) return false;

    return control?.value != control?.parent?.value.pass;
  }
}