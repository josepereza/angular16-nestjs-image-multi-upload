import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';

import { FilesInterceptor } from '@nestjs/platform-express';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as path from 'path';

@Controller('products')
export class ProductsController {
  public imagenes2 = [];
  nombreImagen = '';
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      //fileFilter: fileExtensionFilter,
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          const nombre = req.body.nombre;
          console.log(nombre);
          this.nombreImagen = Date.now() + path.extname(file.originalname);
          cb(null, this.nombreImagen);
        },
      }),
    }),
  )
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    this.imagenes2 = [];
    console.log('files', files);
    files.map((imagen) => {
      this.imagenes2.push(imagen.filename);
    });
    console.log(this.imagenes2);
    return this.productsService.create(this.imagenes2, createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
