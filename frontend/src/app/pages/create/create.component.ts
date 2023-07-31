import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  productForm!: FormGroup;
  selectedFile!: any;
  files:string  []  =  [];
 imagenesBackend:string[]=[];
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router:Router
  ) {
    this.productForm = this.fb.nonNullable.group({
      title: [''],
      description: [''],
      price: [0],
    });
  }

  onFileChanged(event: any) {
    for  (var i =  0; i <  event.target.files.length; i++)  {  
      this.files.push(event.target.files[i]);
  }
  }

  onSubmit() {
    const formData = new FormData();
    for  (var i =  0; i <  this.files.length; i++)  {  
      formData.append("files",  this.files[i]);
  } 
    //formData.append('files', this.selectedFile);
    formData.append('title', this.productForm.get('title')!.value);
    formData.append('description', this.productForm.get('description')!.value);
    formData.append('price', this.productForm.get('price')!.value);
  console.log('files', this.files)

    this.productService.createProduct(formData).subscribe((data:any)=>{
   console.log('mi data', data)
   this.files=[]
   this.router.navigate(['listado'])
    })
  }
}
