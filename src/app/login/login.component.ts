import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: string;

  constructor(private main: MainService, private router: Router) {

    if(this.main.isLogged()) this.router.navigateByUrl('home');

    this.error = "";
    this.loginForm = new FormGroup({
      user: new FormControl('', [Validators.required, Validators.minLength(5)]),
      pass: new FormControl('', [Validators.required, Validators.minLength(5)])
    }); 
   }

  ngOnInit(): void {
  }
 
  onSubmit(){
    if(this.validateUser(this.loginForm.value)){
      this.main.setUserId(this.loginForm.value.user);
      this.router.navigateByUrl('home');
    }
  }

  private validateUser(userData: AbstractControl){
    return true;
  }

}

/*export class LoginComponent implements OnInit {

  loginForm;

  constructor(private formBuilder: FormBuilder) {

    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      pass: ['']
    });
   }

  ngOnInit(): void {
  }

  onSubmit(){
    console.warn(this.loginForm.value);
  }
}
*/