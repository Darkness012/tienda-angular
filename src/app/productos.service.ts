import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarritoItem } from './carrito/carrito-item.interface';
import { Producto } from './producto-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private carritoProductos: CarritoItem[] = [];
  private currentFilter: string;  

  private productos: Producto[];
  private urlBase;

  constructor(
    private http: HttpClient
  ) { 
    this.urlBase = "http://localhost:8080/productos/";
    this.productos = [];
    this.currentFilter = '';
    this.carritoProductos = [];
  }

  initlializeService(){

  }

  //PRODUCTS GETTERS
  getProductById(user_id: number): Producto | any{

    for (let index = 0; index < this.productos.length; index++) {
      const element = this.productos[index];
      
      if(element.id == user_id) return element;
    }

    return false;
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
  getTotal(): number{
    let count: number = 0;
    this.carritoProductos.forEach(item => {
      count += item.subtotal?item.subtotal:0;
    });

    return count;
  }

  //SETTERS
  setProducts(productos: Producto[]){
    this.productos = productos;
  }
  setCart(carrito: CarritoItem[]){
    this.carritoProductos = carrito;
  }
  setUnitsCountToProduct(poroductId: number, newCount: number){
    this.getProductById(poroductId).unidades = newCount;
  }
  addItemToCart(item: CarritoItem):Observable<any>{
    return this.http.post(this.urlBase+"carrito/nuevo-pedido", {
      producto_id: item.producto_id,
      cantidad: item.count
    }, {
      headers: new HttpHeaders({
          'Access-Control-Allow-Origin':'*',
         }), withCredentials:true
    })

    //this.carritoProductos.push(item);
  }
  removeItemFromCart(pedido:CarritoItem):Observable<any>{
    return this.http.delete(this.urlBase+"carrito/remove-pedido", {body: pedido, headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
     }), withCredentials:true})
    //this.carritoProductos.splice(position,1);
  }
  cancelarCarrito():Observable<any>{
    return this.http.delete(this.urlBase+"carrito/cancelar", {
      headers: new HttpHeaders({
          'Access-Control-Allow-Origin':'*',
         }), withCredentials:true
    });
  }
  pagarCarrito():Observable<any>{
    return this.http.delete(this.urlBase+"carrito/pagar",{
      headers: new HttpHeaders({
          'Access-Control-Allow-Origin':'*',
         }), withCredentials:true
    });
  }
  

  setFilter(valor: string):void{
    this.currentFilter = valor;
  }
  resetFilter(): void{
    this.currentFilter = "";
  }

  //??
  

  //PETITIONS TO SERVER
  private getProductos(): Observable<any>{
    return this.http.get(this.urlBase, {
      headers: new HttpHeaders({
          'Access-Control-Allow-Origin':'*',
         }), withCredentials:true
    });
  }
  private getCart(): Observable<any>{
    return this.http.get(this.urlBase+"carrito", {
      headers: new HttpHeaders({
          'Access-Control-Allow-Origin':'*',
         }), withCredentials:true
    });
  }
  
  obtainProducts(callback?:Function):void{
    this.getProductos().subscribe((respuesta:any)=>{
      if(respuesta.success){

        this.setProducts(respuesta.products);
        this.setCart(respuesta.carrito);
        
        if(callback) callback(true)
        console.log(respuesta);
        
      }else{
        if(callback) callback();
        console.log("Error: ", respuesta);
      }
    });
  }

  obtainCart(callback?:Function):void{
    this.getCart().subscribe((respuesta:any)=>{

        this.setCart(respuesta.pedidos);
        
        if(callback) callback(respuesta.pedidos);
        
    });
  }

}
