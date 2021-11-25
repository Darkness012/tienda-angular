import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { MainService } from '../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
 
  constructor(private mainService: MainService, private productsService: ProductosService, private router: Router) { }

  ngOnInit(): void {
  }

  getTotalCount():string{ 
    if(this.productsService.getTotalCount()==0) return "";
    return this.productsService.getTotalCount().toString();
  }

  onLogoutClick():void{
    this.mainService.logOut();
    this.router.navigateByUrl('login');
  }
}
