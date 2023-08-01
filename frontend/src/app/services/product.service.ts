import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  createProduct(product: any,){
    console.log('mi producto description',product)
return this.http.post('http://localhost:3000/products', product)
  }
  actualizaProducto(id:any,producto:any){
    console.log('producto en service ',producto.get('title'))
    return this.http.patch(`http://localhost:3000/products/${id}`,producto)

  }

  getOne(id: number) {
    return this.http.get(`http://localhost:3000/products/${id}`);
  }

  listadoProducts(){
    return this.http.get('http://localhost:3000/products')
  }
}
