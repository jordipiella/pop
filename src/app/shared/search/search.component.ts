import { Component, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() placeholder: string = 'Search ...';
  value: any = null;

  onChanged: any;
  onTouched: any;

  form: FormGroup = this.fb.group({
    search: ['']
  });

  disabled: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    @Self() @Optional() private ngControl: NgControl
  ) {
      if (this.ngControl) {
        this.ngControl.valueAccessor = this;
      }
      else {
        this.onChanged = () => null;
        this.onTouched = () => null;
      }
  }

  ngOnInit(): void {
    const valueSub: any = this.form?.get('search')?.valueChanges
      .pipe(
        tap((value: any) => this.onChanged(value))
      ).subscribe()
    this.subscriptions.push(valueSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  onInput(value: any[]) {
    this.onTouched();
    this.onChanged(value);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  cleanSearch(): void {
    this.form.get('search')?.setValue('');
  }

  isVisibleClean(): boolean {
    return (this.form.get('search')?.value )? true : false;
  }

}
