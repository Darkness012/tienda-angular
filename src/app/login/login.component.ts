import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
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

  showContent: boolean;
  wrong_data: boolean;
  wrong_pass: boolean;
  hidePass: boolean;

  constructor(private main_service: MainService, private router: Router) {
    this.showContent = false;
    
    this.main_service.getLogginStatus().subscribe((respuesta:any)=>{
      console.log(respuesta);
      
      if(respuesta.isLogged){
        console.log("loggeado");
        
        this.router.navigateByUrl("home");
      }else{
        console.log("no logeado");
        this.main_service.setLogginStatus(false);
        this.showContent = true;
      }
    })

    this.hidePass = true;
    this.error = "";
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.email]),
      pass: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
    
    this.wrong_data = false;
    this.wrong_pass = false;

    
   }

  ngOnInit(): void {
    console.log("init");
    
  }
 
  onSubmit(){
    this.main_service.validateUser(this.loginForm.value)
      .subscribe((response: any)=>{
        
        console.log(response);
        

        //CHECKING IF SUCCESS
        if(response.success){
          console.log("success");

          this.wrong_data = false;
          this.wrong_pass = false;
          this.main_service.setLogginStatus(true);

          this.router.navigateByUrl('home');
        }

        //ERROR
        else{ 

          if(response.error=="WRONG PASSWORD"){

            //WRONG PASS
            this.loginForm.controls['pass'].setErrors({'incorrect': true});
            this.wrong_pass = true;
            console.log("wrong pass")
          }else{

            //INVALID DATA
            this.loginForm.controls['email']?.setErrors({'incorrect': true});
            this.wrong_data = true;
            this.wrong_pass = false;
            console.log("wrong data")
          }
        }
      })
  }
}