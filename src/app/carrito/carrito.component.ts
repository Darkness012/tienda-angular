import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { CarritoItem } from './carrito-item.interface';
import { Producto } from '../producto-interface';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MainService } from '../main.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  showContent: boolean = false;
  showCancelando: boolean = false;
  showPagando: boolean = false;
  doingAction: boolean = false;
  msg: string = "";

  constructor(
    private productosService: ProductosService, 
    private mainService: MainService,
    private router: Router,
    private _snackBar: MatSnackBar) 
    {


      if(!this.mainService.isLogged()){

        this.mainService.getLogginStatus()
        .subscribe((respuesta:any)=>{
          
          if(respuesta.isLogged){
            this.mainService.setLogginStatus(true);
            this.productosService.obtainProducts(()=>{
              this.showContent = true;
            })
          }else{
            //REDIRECT TO LOGIN
            this.router.navigateByUrl("login");
          }
  
        })
      }else{
        
        this.productosService.obtainProducts(()=>{
          this.showContent = true;
        })
      }
    
  }

  ngOnInit(): void {
  }

  onClickPagar():void{
    this.msg = "Pagando..."
    this.doingAction = true;

    this.productosService.pagarCarrito().subscribe((respuesta:any)=>{
      if(respuesta.success){
        this._snackBar.open("Se pago correctamente", "OK");
        this.productosService.obtainCart();

      }else{
        this._snackBar.open("Ocurrio un error al pagar", "OK");
        console.log(respuesta);
      }
      this.doingAction = false;
    })
    
  }

  onClickCancelar():void{

    this.msg = "Cancelando..."
    this.doingAction = true;

    this.productosService.cancelarCarrito().subscribe((respuesta:any)=>{
      if(respuesta.success){
        this._snackBar.open("Se cancelaron las compras", "OK");
        this.productosService.obtainCart();
      }else{
        this._snackBar.open("Ocurrio un error al pagar", "OK");
        console.log(respuesta);
      }

      this.doingAction = false;
    })
    
  }

  onClickRemoveItemFromCart(position: number){

    this.msg = "Eliminando..."
    this.doingAction = true;

    //RESTORING 
    let item = this.productosService.getCarritoDeProductos()[position];
    this.productosService.getProductById(item.producto_id).unidades += item.count;
    
    //REMOVING
    
    console.log(item);
    
    this.productosService.removeItemFromCart(item).subscribe((respuesta:any)=>{
      console.log(respuesta);
      if(respuesta.success){
        console.log(respuesta);
        this.productosService.getCarritoDeProductos().splice(position, 1);
        this._snackBar.open("Se removio el poducto", "OK");
      }else{
        
        this._snackBar.open("ERROR AL ELIMINAR EL PRODUCTO", "OK")
      }
      this.doingAction = false;
    })

    

  }

  getTotalCount(): number{
    return this.productosService.getCarritoDeProductos().length;
  }

  getTotal(): number{
    return this.productosService.getTotal();
  }

  getProductoById(id: number):Producto {
    return this.productosService.getProductById(id);
  }
  getCarrito(): CarritoItem[]{
    return this.productosService.getCarritoDeProductos();
  }
}
