import { Injectable } from '@angular/core';
import { CarritoItem } from './carrito/carrito-item.interface';
import { Producto } from './producto-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private productos: Producto[] = [];
  private carritoProductos: CarritoItem[] = [];
  private productsCount: number;
  private currentFilter: string;

  constructor() { 
    this.productsCount = 0;
    this.currentFilter = '';
    this.productos = this.getProductos();
    this.carritoProductos = this.getCarritoProductos();
    this.updateProductsCount();
  }

  updateProductsCount(): void{
    let count: number = 0;
    this.carritoProductos.forEach(item => {
      count += item.count?item.count:0;
    });

    this.productsCount =  count;
  }

  //PRODUCTS GETTERS
  getProductById(id: number): Producto{
    return this.productos[id];
  }
  getAllProducts(): Producto[]{
    return this.productos;
  }
  getCurrentFilter(): string{
    return this.currentFilter;
  }

  //CARRITO GETTERS
  getCarritoDeProductos(): CarritoItem[]{
    return this.carritoProductos;
  }
  getTotalCount(): number{
    return this.productsCount;
  }
  getTotal(): number{
    let count: number = 0;
    this.carritoProductos.forEach(item => {
      count += item.subtotal?item.subtotal:0;
    });

    return count;
  }

  //SETTERS
  setUnitsCountToProduct(poroductId: number, newCount: number){
    this.getProductById(poroductId).unidades = newCount;
  }
  addItemToCart(item: CarritoItem){
    this.carritoProductos.push(item);
    this.updateProductsCount();
  }
  setFilter(valor: string):void{
    this.currentFilter = valor;
  }
  resetFilter(): void{
    this.currentFilter = "";
  }

  //??
  removeItemFromCart(position: number){
    this.carritoProductos.splice(position,1);
  }

  //PETITIONS TO SERVER
  private getProductos(): Producto[]{
    return [
      { id:0, nombre: "fresa", precio:25, unidades: 58, estado: true},
      { id:1, nombre: "almendras", precio:25, unidades: 12 , estado: true},
      { id:2, nombre: "ajo", precio:25, unidades: 25 , estado: true},
      { id:3, nombre: "lychee", precio:25, unidades: 99 , estado: true},
      { id:4, nombre: "arandanos", precio:25, unidades: 69 , estado: true},
      { id:5, nombre: "naranja", precio:25, unidades: 25 , estado: true},
      { id:6, nombre: "brocoli", precio:25, unidades: 65, estado: true },
      { id:7, nombre: "aguacate", precio:25, unidades: 15 , estado: true},
      { id:8, nombre: "calabaza", precio:25, unidades: 56 , estado: true},
      { id:9, nombre: "canela", precio:25, unidades: 45, estado: true },
      { id:10, nombre: "cebolla", precio:25, unidades: 45 , estado: true},
      { id:11, nombre: "kiwi", precio:25, unidades: 49 , estado: true},
      { id:12, nombre: "maiz", precio:25, unidades: 47, estado: true },
      { id:13, nombre: "manzana", precio:25, unidades: 32 , estado: true},
      { id:14, nombre: "papa", precio:25, unidades: 96 , estado: true},
      { id:15, nombre: "pasta", precio:25, unidades: 95 , estado: true},
      { id:16, nombre: "pimienta", precio:25, unidades: 25 , estado: true},
      { id:17, nombre: "repollo", precio:25, unidades: 36 , estado: true},
      { id:18, nombre: "tomate", precio:25, unidades: 25 , estado: true},
      { id:19, nombre: "zanahoria", precio:25, unidades: 46, estado: true },
    ];
  }
  private getCarritoProductos(): CarritoItem[]{

    let carrito: CarritoItem[] = [
      {producto_id: 1, count:2,},
      {producto_id: 2, count:2},
      {producto_id: 3, count:2},
      {producto_id: 4, count:2},
      {producto_id: 5, count:2}
    ]

    carrito.forEach(item=>{
      item.nombre = this.getProductById(item.producto_id).nombre;
      item.subtotal = this.getProductById(item.producto_id).precio*item.count;
      item.precio = this.getProductById(item.producto_id).precio;
    })

    return [];
  }
  
}
