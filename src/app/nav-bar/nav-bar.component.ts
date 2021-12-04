import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
 
  constructor(
    private mainService: MainService, 
    private productsService: ProductosService, 
    private router: Router,
    private snackBar: MatSnackBar
    ) {

    }

  ngOnInit(): void {
  }

  getTotalCount():string{ 
    
    if(this.productsService.getCarritoDeProductos().length==0) return "";
    return this.productsService.getCarritoDeProductos().length.toString();
  }

  onLogoutClick():void{
    this.mainService.logOut()
    .subscribe((respuesta:any)=>{
      if(respuesta.success){
        this.snackBar.dismiss();
        this.mainService.setLogginStatus(false);
        this.productsService.setCart([]);
        this.productsService.setProducts([]);
        this.productsService.setFilter("")
        this.router.navigateByUrl('login');
      }
    })
    
  }
}
