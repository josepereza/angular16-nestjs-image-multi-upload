import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
    private readonly dataSource: DataSource,
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

  //actualiza el producto 2:forma.
  async updateProducto(id: number, updateProductDto: any) {
    const { images, ...update } = updateProductDto;

    console.log('imagenes', images);
    console.log('update ', update);
    console.log('updateProducto', updateProductDto);

    const product = await this.productRepository.preload({ id, ...update });

    if (!product)
      throw new NotFoundException(`Product with id: ${id} not found`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (images) {
        await queryRunner.manager.delete(ProductImage, { product: { id } });

        product.images = images.map((image) =>
          this.productImageRepository.create({ url: image }),
        );
      }

      // await this.productRepository.save( product );
      await queryRunner.manager.save(product);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain(+id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }
  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    // console.log(error)
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  async findOnePlain(term: number) {
    const { images = [], ...rest } = await this.findOne(term);
    return {
      ...rest,
      images: images.map((image) => image.url),
    };
  }

  //elimina producto
  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}
