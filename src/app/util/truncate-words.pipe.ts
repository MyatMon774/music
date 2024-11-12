import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateWords',
  standalone: true
})
export class TruncateWordsPipe implements PipeTransform {
  
  transform(value: string, limit: number = 100,isOneDot: boolean = false): string {
    if (!value) return '';
    const words = value.split(/\s+/);
    if(isOneDot){
      return words.length > limit ? words.slice(0, limit).join(' ') + ' .' : value;
    }
    else{
      return words.length > limit ? words.slice(0, limit).join(' ') + ' ...' : value;
    }
  }
}