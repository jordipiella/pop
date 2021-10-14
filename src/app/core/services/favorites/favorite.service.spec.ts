import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { favoriteMockModel } from '@core';
import { FavoriteService } from './favorite.service';
import { FavoriteModel } from './models/favorite.model';

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
      service.favorites = [ favoriteMockModel ];
      expect(service.favorites).toEqual([ favoriteMockModel ]);
    });
  });

  describe('#get favorites', () => {
    it('should return favorites', () => {
      service.favorites = [ favoriteMockModel ];
      expect(service.favorites).toEqual([ favoriteMockModel ]);
    });
  });

  describe('#addFavorite', () => {
    it('should add favorite', () => {
      service.favorites = [ favoriteMockModel ];
      service.addFavorite(favoriteMockModel)
      expect(service.favorites).toEqual([ favoriteMockModel, favoriteMockModel ]);
    });
  });

  describe('#removeFavorite', () => {
    it('should remove favorite', () => {
      let fav2: FavoriteModel =  { ...favoriteMockModel };
      fav2.title = 'Fake title';
      fav2.image = 'https://fakeimg.png';
      service.favorites = [ favoriteMockModel, fav2 ];
      service.removeFavorite(fav2)
      expect(service.favorites).toEqual([ favoriteMockModel ]);
    });
  });
});
