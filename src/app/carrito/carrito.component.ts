import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { CarritoItem } from './carrito-item.interface';
import { Producto } from '../producto-interface';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {


  displayedColumns: string[] = ['producto', 'cantidad', 'subtotal'];
  
  constructor(private productosService: ProductosService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onClickRemoveItemFromCart(position: number){
    //RESTORING 
    let item = this.productosService.getCarritoDeProductos()[position];
    this.productosService.getProductById(item.producto_id).unidades += item.count;
    
    //REMOVING
    this.productosService.removeItemFromCart(position);
    this._snackBar.open("Se removio el poducto", "OK");

    //UPDATING
    this.productosService.updateProductsCount();
  }

  getTotalCount(): number{
    return this.productosService.getTotalCount();
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
