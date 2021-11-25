import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Producto } from '../producto-interface';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public producto: any,
  ) { 
  }
  
  ngOnInit(): void { }
}
