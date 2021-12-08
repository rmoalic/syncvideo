import { Pipe, PipeTransform } from '@angular/core';
import { Events_d } from './event_d.model';

@Pipe({
  name: 'eventsDToUrl'
})
export class EventsDToUrlPipe implements PipeTransform {

  transform(value: Events_d, ...args: unknown[]): string {
    let ret = window.location + "/video-sync?";
    for (let v of value.pos) {
      ret += "&t="+v.video_id+":"+v.offset
    }
    return ret;
  }

}
