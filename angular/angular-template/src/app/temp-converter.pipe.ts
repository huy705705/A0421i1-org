import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempConverter'
})
export class TempConverterPipe implements PipeTransform {

  transform(value: String) {
    switch (value) {
      case "Monday":
        return "Thứ Hai";
      case "Wednesday ":
        return "Thứ Tư";
      default:
        break;
    }
  }

}
