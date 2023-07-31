import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit{
  productos:any[]=[]
  constructor(private productService:ProductService){}
  ngOnInit(): void {
   this.productService.listadoProducts().subscribe((data:any)=>{
    console.log(data)
    this.productos=data
   })
  }


}
