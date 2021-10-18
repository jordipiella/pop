import { ItemModel } from '../models/item.model';
import { ItemContract } from 'src/app/items/api';


export class ItemTranslator {

  static translateContractToModel(contract: ItemContract): ItemModel {
    const model: ItemModel = { ...contract, favorite: false };
    return model;
  }

}
