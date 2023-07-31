import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @Index({ unique: true })
  title: string;
  @Column('decimal', { precision: 6, scale: 2, default: 0 })
  price: number;
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];
}
