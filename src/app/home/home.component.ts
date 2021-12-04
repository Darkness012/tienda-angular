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

  showContent: boolean = false;

  constructor(
    private mainService: MainService,
    private router: Router,
    private dialog: MatDialog,
    private productosService: ProductosService, 
    private _snackBar: MatSnackBar
    ) {

      if(!this.mainService.isLogged()){

        //REDIRECT TO LOGIN
        this.router.navigateByUrl("login");
      }

      //GETTING PRODUCTS
      this.productosService.obtainProducts((success:any)=>{
        if(success){
          console.log("Obtenidos correctamente");
          this.showContent = true;
        }else{
          this._snackBar.open("error al obtener los productos y carrito", "OK");
        }
      });

      //GETTING CART INFO

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

  onClickProducto(product: any){
    this.dialog.open(ProductoComponent, {
      data: product
    });
    console.log(product);
  }

  onClickAddToCart(producto: Producto, elemento:any){
    
    let cantidad: number = parseInt(elemento.value);
    let producto_id = producto.id;


    if(cantidad>producto.unidades){
      alert("no hay suficientes unidades");
      elemento.value = producto.unidades;
      this._snackBar.open("seleccione una cantidad menor", "OK");
    }else{
      

      
      let carrito = this.productosService.getCarritoDeProductos().find(x => x.producto_id === producto.id);
      this.productosService.addItemToCart({count:cantidad, producto_id: producto_id})
      .subscribe((respuesta:any)=>{

        console.log(respuesta);
        
        if(respuesta.success){
          
          if(carrito){
            carrito.count +=  cantidad; 
            if(carrito.subtotal) carrito.subtotal += producto.precio*cantidad;
            else carrito.subtotal == producto.precio*cantidad;
            
          }
          
          else { 
            this.productosService.getCarritoDeProductos().push({
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
        }else{
          console.log("ERROR: ", respuesta);
          
        }
      })

      

    }
  } 
}
