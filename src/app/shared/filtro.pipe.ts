import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: any, searching: string, propName: string): any {
    if (value.length === 0 || searching === '') {
      return value;
    }

    const resultArray = [];

    for (const item of value) {
      if (item[propName] === searching) {
        resultArray.push(item)
      }
    }

    return resultArray;
  }


}
