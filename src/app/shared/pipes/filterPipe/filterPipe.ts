import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'FilterPipe',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, input: string, searchableList: any[]) {
    if (input) {
      input = input.toLowerCase();
      return value.filter(function (el: any) {
        let isTrue = false;
        for (const k of searchableList) {
          if (el[k].toLowerCase().indexOf(input) > -1) {
            isTrue = true;
          }
          if (isTrue) {
            return el;
          }
        }
      });
    }
    return value;
    }
}
