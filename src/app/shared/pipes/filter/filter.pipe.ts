import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */
  transform(items: any, searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    // console.log(searchText);
		// console.log(typeof(searchText));

    return items.filter((it: any) => {
      if (it && it.persons_student_nombre) {
        return it.persons_student_nombre.toLocaleLowerCase().includes(searchText);
      }
    });
  }
}
