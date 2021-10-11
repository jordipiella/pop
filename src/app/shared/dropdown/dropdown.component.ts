import { Component, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropDownComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() options: any[] = []
  @Input() label: string = 'label';
  @Input() labelValue: string = 'value';
  @Input() emptyOption: string = 'select';
  value: any = null;

  onChanged: any;
  onTouched: any;

  form: FormGroup = this.fb.group({
    optionSelected: []
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
    const valueSub: any = this.form?.get('optionSelected')?.valueChanges
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

}
