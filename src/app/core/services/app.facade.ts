import { Injectable, ViewContainerRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { addFavorite, removeFavorite } from '../state/favorites/favorites.actions';
import { IFavoritesState } from '../state/favorites/favorites.reducer';
import { selectFavorites } from '../state/favorites/favorites.selector';
import { AlertService } from './alert/alert.service';
import { ModalService } from './modal/modal.service';
import { FavoriteService } from './favorites/favorite.service';
import { FiltersService } from './filters/filters.service';
import { IFilter } from '../interfaces/filter.interface';
import { FilterEnum } from '../enums/filter.enum';
import { IFilterOption } from '../interfaces/filter-option.interface';

@Injectable({
  providedIn: 'root'
})
export class AppFacade {

  favorites$: Observable<ProductModel[]> = this.store.pipe(select(selectFavorites));

  constructor(
    private store: Store<IFavoritesState>,
    private alertService: AlertService,
    private modalService: ModalService,
    private favoriteService: FavoriteService,
    private filtersService: FiltersService
  ) { }

  // Favorites
  addFavorite(favorite: ProductModel): void {
    this.store.dispatch(addFavorite({ data: [favorite] }));
  }

  removeFavorite(favorite: ProductModel): void {
    this.store.dispatch(removeFavorite({ data: [favorite] } ));
  }

  openFavoritesModal(): void {
    this.favoriteService.openFavoritesInModal();
  }

  get favorites() {
    return this.favoriteService.favorites;
  }

  isInFavorites(item: Partial<ProductModel>): boolean {
    return this.favoriteService.isInFavorites(item);
  }

  // Alerts
  successAlert(title: string, text: string): void {
    this.alertService.success(title, text);
  }

  errorAlert(title: string, text: string): void {
    this.alertService.error(title, text);
  }

  // Modal
  openModal(component: any, module?: any): void {
    this.modalService.openModal(component, module);
  }

  closeModal(): void{
    this.modalService.closeModal();
  }

  modalOpened(content: ViewContainerRef): void {
    this.modalService.modalOpened(content);
  }

  get isOpen$(): Observable<boolean> {
    return this.modalService.isOpen$;
  }

  // Filters
  selectedFilters(): Observable<IFilter> {
    return this.filtersService.selectedFilters$;
  }

  loadFilter(filter: FilterEnum): void {
    this.filtersService.loadFilter(filter)
  }

  getControl(controlName: FilterEnum): FormControl {
    return this.filtersService.getControl(controlName);
  }

  getSortByOptions(): IFilterOption[] {
    return this.filtersService.sortByOptions;
  }


}
