import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto-interface';
import { ProductosService } from '../productos.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductoComponent } from '../producto/producto.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    mainService: MainService,
    router: Router,
    private dialog: MatDialog,
    private productosService: ProductosService, 
    private _snackBar: MatSnackBar
    ) {

      if(!mainService.isLogged()) router.navigateByUrl('login');
  }

  ngOnInit(): void {
  }

  resetFilter(): void{
    this.productosService.resetFilter();
  }

  getFiltro(): string{
    return this.productosService.getCurrentFilter();
  }
  getProductos(): Producto[]{
    return this.productosService.getAllProducts();
  }

  onClickProducto(id: number){
    this.dialog.open(ProductoComponent, {
      data: this.productosService.getProductById(id)
    });
    console.log(this.productosService.getProductById(id));
  }

  onClickAddToCart(product_id: number, elemento:any){
    
    let producto: Producto = this.productosService.getProductById(product_id);
    let cantidad: number = parseInt(elemento.value);

    if(cantidad>producto.unidades){
      alert("no hay suficientes unidades");
      elemento.value = producto.unidades;
      this._snackBar.open("seleccione una cantidad menor", "OK");
    }else{
      let carrito = this.productosService.getCarritoDeProductos().find(x => x.producto_id === producto.id);
      
      if(carrito){
        carrito.count +=  cantidad; 
        if(carrito.subtotal) carrito.subtotal += producto.precio*cantidad;
        else carrito.subtotal == producto.precio*cantidad;
        
        this.productosService.updateProductsCount();
      }
      else { 
        this.productosService.addItemToCart({
            producto_id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            count: cantidad,
            subtotal: producto.precio*cantidad
        })
      }

      producto.unidades -= cantidad;
      elemento.value = 1;
      this._snackBar.open("se agregaron "+cantidad+" "+producto.nombre+" al carrito", "OK");

    }
  } 
}
