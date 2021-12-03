import { Component, ContentChild, ContentChildren, OnInit, QueryList } from '@angular/core';
import { Ivideo } from '../ivideo';
import { TwitchPlayerComponent } from '../twitch-player/twitch-player.component';

@Component({
  selector: 'app-sync-video-slider',
  templateUrl: './sync-video-slider.component.html',
  styleUrls: ['./sync-video-slider.component.css']
})
export class SyncVideoSliderComponent implements OnInit {

  @ContentChildren (TwitchPlayerComponent)
  videos!: QueryList<Ivideo>;

  seekTime: number = 0;
  max_time: number = 0;

  constructor() { }

  playAll() {
    this.videos.forEach((video) => {
      video.play();
    });
  }

  pauseAll() {
    this.videos.forEach((video) => {
      video.pause();
    });
  }

  onSeek(event: Event) {
    this.videos.forEach((video) => {
      video.seek(this.seekTime);
    });
  }

  private getLongestVideoDuration(): number {
    let durations: number[] = this.videos.map(video => {if (video.ready) {return video.getTotalDuration()} else return 0});
    return Math.max(...durations);
  }

  ngOnInit(): void {
  }
  
  ngAfterContentChecked(): void {

    this.max_time = this.getLongestVideoDuration();
  }

}
