import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  productos: any[] = [];
  constructor(private productService: ProductService, private router: Router) {}
  ngOnInit(): void {
    this.productService.listadoProducts().subscribe((data: any) => {
      console.log(data);
      this.productos = data;
    });
  }
  update(id: number) {
    this.router.navigate(['update',id]);
  }
  eliminar(id:number){
    this.productService.deleteProducto(id).subscribe(data=>{
      this.productService.listadoProducts().subscribe((data: any) => {
        console.log(data);
        this.productos = data;
      });
    })
  }
}
