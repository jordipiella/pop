import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { productMockModel } from '@core';
import { FavoriteService } from './favorite.service';
import { ProductModel } from '../../models/product.model';

describe('FavoriteService', () => {
  let service: FavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: []
    });
    service = TestBed.inject(FavoriteService);
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
});
