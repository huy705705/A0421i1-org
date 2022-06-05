import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contentPipe'
})
export class ContentPipePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    value.replace(";", " </br>");
    return value;
  }

}
