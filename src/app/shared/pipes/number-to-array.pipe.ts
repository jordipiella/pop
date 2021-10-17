import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'numberToArray'
})
export class NumberToArrayPipe implements PipeTransform {

  transform(value: number): number[] {
    let res: number[] = [];
    value = (isNaN(value)) ? 0 : value;
    for (let i = 0; i < value; i++) {
        res = [ ...res, i ]
      }
      return res;
  }

}
