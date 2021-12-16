import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform(value: string): string {
    const noImagePath = "assets/imgs/no-image.png"
    return (value && value.length > 0) ? value : noImagePath;
  }

}
