import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
  ) {}

  //crea producto
  async create(imagenes: any[], createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create({
        ...createProductDto,
        images: imagenes.map((image) =>
          this.productImageRepository.create({ url: image }),
        ),
      });
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return this.productRepository.find({
      relations: {
        images: true,
      },
    });
  }

  findOne(id: number) {
    return this.productRepository.findOne({
      where: {
        id,
      },
      relations: {
        images: true,
      },
    });
  }

  //actualiza el producto
  async updateProducto(id: number, files, updateProductDto: any) {
    console.log('actualiza mi producto ', files);
    const { title, description, price } = updateProductDto;

    const producto = await this.productRepository.findOne({
      where: { id },
    });

    //const doctorIds = doctors;
    //const doctores = await this.doctorRepository.findBy({ id: In(doctorIds) });
    //console.log('mihospital/paciente', mihospital, paciente, doctores);
    producto.title = title;
    producto.description = description;
    producto.price = price;
    if (files.length > 0) {
      producto.images = files.map((image) =>
        this.productImageRepository.create({ url: image }),
      );
      this.productImageRepository.delete({ product: producto });
    }

    // producto.images = images;
   
    return this.productRepository.save(producto);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
