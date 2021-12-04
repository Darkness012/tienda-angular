import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchValue:string;

  constructor(
    private router: Router,
    private productsService: ProductosService
    ){
    this.searchValue = this.productsService.getCurrentFilter();
  }

  ngOnInit(): void {
  }

  iniciarBusqueda():void{
    this.productsService.setFilter(this.searchValue.toLocaleLowerCase());
    console.log(this.productsService.getCurrentFilter())
    this.router.navigateByUrl("home");
  }
}
