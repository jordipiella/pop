import { ItemModel } from '../models/item.model';
import { ItemContract } from '../../../../api/services/api-items/contracts/item.contract';


export class ItemTranslator {

  static translateContractToModel(contract: ItemContract): ItemModel {
    const model: ItemModel = { ...contract };
    return model;
  }

}
