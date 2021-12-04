import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { ProductosService } from '../productos.service';
import { Usuario } from '../user-interface';

@Component({
  selector: 'app-accont-info',
  templateUrl: './accont-info.component.html',
  styleUrls: ['./accont-info.component.scss']
})
export class AccontInfoComponent implements OnInit {

  showContent: boolean = false;
  saliendo: boolean = false;
  msg: string = "";

  currentUser: Usuario = {
    nombre: "Sample",
    apellido: "Sample",
    email:"sample@email.com",
    telefono: "Sample"
  };

  constructor(
    private productosService: ProductosService,
    private mainService: MainService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    if(!this.mainService.isLogged()){

      this.mainService.getLogginStatus()
      .subscribe((respuesta:any)=>{
        
        if(respuesta.isLogged){
          this.mainService.setLogginStatus(true);
          this.productosService.obtainProducts()
          this.mainService.getCurrentUser().subscribe((respuesta:any)=>{
            if(respuesta.success){
              this.currentUser = respuesta.user;
            }
            this.showContent = true;
          });

        }else{
          //REDIRECT TO LOGIN
          this.router.navigateByUrl("login");
        }

      })
    }else{
      
      
      this.productosService.obtainProducts();
      this.mainService.getCurrentUser().subscribe((respuesta:any)=>{
        if(respuesta.success){
          this.currentUser = respuesta.user;
        }
        this.showContent = true;
      });
    }
  }

  onLogoutClick():void{
    this.msg = "Saliendo..."
    this.saliendo = true;
    this.mainService.logOut()
    .subscribe((respuesta:any)=>{
      if(respuesta.success){
        this.saliendo = false;
        this.snackBar.dismiss();
        this.mainService.setLogginStatus(false);
        this.productosService.setCart([]);
        this.productosService.setProducts([]);
        this.productosService.setFilter("")
        this.router.navigateByUrl('login');
      }else{
        this.msg = "Error al cerrar sesion"
      }
    })
  }

  ngOnInit(): void {
  }

}
