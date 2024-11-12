import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeconverter',
  standalone: true
})
export class TimeConverterPipe implements PipeTransform {

  transform(value: number,isHour:boolean = false): string {
    if (value == null || value < 0) {
      return '--:--:--'; // Handle null or negative values
    }

    // Convert ms to seconds
    let seconds = Math.floor(value / 1000);
    
    // Calculate hours, minutes, and seconds
    let hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    let minutes = Math.floor(seconds / 60);
    seconds %= 60;

    // Format time as 'h:mm:ss'

    let formattedTime = '';
    if(isHour){
        formattedTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`
    }
    else{
        formattedTime = `${this.padZero(minutes)}:${this.padZero(seconds)}`
    }

    return formattedTime;
  }

  // Helper function to add leading zero for single-digit numbers
  private padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
