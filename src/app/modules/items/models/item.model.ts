import { ProductModel } from '../../../core/models/product.model';

export class ItemModel extends ProductModel {
  description: string = '';
  price: string = '';
  email: string = '';
  image: string = '';
}
