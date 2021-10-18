import { ProductModel } from '../../core/models/product.model';

export class ItemModel extends ProductModel {
  description: string = '';
  price!: number;
  email: string = '';
  image: string = '';
}
