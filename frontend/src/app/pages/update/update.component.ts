import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit{
  product$!: Observable<any>;
  producto:any;
  productForm!: FormGroup;
  selectedFile!: any;
  files:string  []  =  [];
  productId!:any;
 imagenesBackend:string[]=[];
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router:Router,
    private route: ActivatedRoute,
  ) {
    this.productForm = this.fb.nonNullable.group({
      title: [''],
      description: [''],
      price: [0],
        });
  }
  ngOnInit(): void {
    this.productId = parseInt(this.route.snapshot.paramMap.get('id')!);
  
    this.product$ = this.productService.getOne(this.productId);
    this.product$.subscribe((data) => {
      console.log('primer data',data);
      this.producto = data;
      this.productForm.setValue({
        title: this.producto.title,
        description: this.producto.description,
        price: this.producto.price,
       
      });
      this.files=this.producto.images
    });
  
  }

  onFileChanged(event: any) {
    for  (var i =  0; i <  event.target.files.length; i++)  {  
      this.files.push(event.target.files[i]);
  }
  
  }

  onSubmit() {
    console.log('formulario',this.productForm.value)
    const formData = new FormData();
    for  (var i =  0; i <  this.files.length; i++)  {  
      formData.append("files",  this.files[i]);
  } 
    //formData.append('files', this.selectedFile);
    formData.append('title', this.productForm.get('title')!.value);
    formData.append('description', this.productForm.get('description')!.value);
    formData.append('price', this.productForm.get('price')!.value);
  console.log('files', this.files)

    this.productService.actualizaProducto(this.productId,formData).subscribe((data:any)=>{
   console.log('mi data', data)
   this.files=[]
   this.router.navigate(['listado'])
    })
  }
}
