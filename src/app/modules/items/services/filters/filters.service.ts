import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor(
  ) { }

  get sortByOptions(): any[] {
    return [
      { label: 'Title', value: 'title' },
        { label: 'Description', value: 'description' },
        { label: 'Price', value: 'price' },
        { label: 'Email', value: 'email' }
    ];
  }

}
