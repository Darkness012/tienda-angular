import { Component } from '@angular/core';
import { Producto } from './producto-interface';
import { ProductosService } from './productos.service';
import { MainService } from './main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Tienda';
  productos: Producto[];

  constructor(private mainService: MainService, private servicioProductos: ProductosService){
    this.productos = this.servicioProductos.getAllProducts();
  }

  isLogged(): boolean{
    return this.mainService.isLogged();
  }
}
