import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { productMockModel } from '@core';
import { FavoriteService } from './favorite.service';
import { ProductModel } from '../../models/product.model';
import { itemMockModel } from '../../../items/mocks/item-mock.model';
import { ModalService } from '../modal/modal.service';

describe('FavoriteService', () => {
  let service: FavoriteService;
  let modalService: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: []
    });
    service = TestBed.inject(FavoriteService);
    modalService = TestBed.inject(ModalService);
  });

  describe('#set favorites', () => {
    it('should set favorites', () => {
      service.favorites = [ productMockModel ];
      expect(service.favorites).toEqual([ productMockModel ]);
    });
  });

  describe('#get favorites', () => {
    it('should return favorites', () => {
      service.favorites = [ productMockModel ];
      expect(service.favorites).toEqual([ productMockModel ]);
    });
  });

  describe('#addFavorite', () => {
    it('should add favorite', () => {
      service.favorites = [ productMockModel ];
      service.addFavorite(productMockModel)
      expect(service.favorites).toEqual([ productMockModel, productMockModel ]);
    });
  });

  describe('#removeFavorite', () => {
    it('should remove favorite', () => {
      let fav2: ProductModel =  { ...productMockModel };
      fav2.title = 'Fake title';
      fav2.image = 'https://fakeimg.png';
      service.favorites = [ productMockModel, fav2 ];
      service.removeFavorite(fav2)
      expect(service.favorites).toEqual([ productMockModel ]);
    });
  });

  describe('#isInFavorites', () => {
    it('should return true if have favorite in array', () => {
      service.favorites = [ productMockModel];
      service.isInFavorites(itemMockModel);
      expect(service.isInFavorites(itemMockModel)).toBeTrue();
    });
    it('should return false if isn`t in  favorites array', () => {
      let fav2: ProductModel =  { ...productMockModel };
      fav2.title = 'Fake title';
      fav2.image = 'https://fakeimg.png';
      service.favorites = [ fav2 ];
      service.isInFavorites(itemMockModel);
      expect(service.isInFavorites(itemMockModel)).toBeFalse();
    });
  });
});
