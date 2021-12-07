import { Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { Ivideo } from '../ivideo';
import { TwitchPlayerComponent } from '../twitch-player/twitch-player.component';

@Component({
  selector: 'app-sync-video-slider',
  templateUrl: './sync-video-slider.component.html',
  styleUrls: ['./sync-video-slider.component.css']
})
export class SyncVideoSliderComponent implements OnInit {

  @ContentChildren(TwitchPlayerComponent)
  videos!: QueryList<Ivideo>;

  seekTime: number = 0;
  max_time: number = 0;

  playing: boolean = false;
  ready: boolean = false;
  nb_ready: number = 0;

  constructor() { }

  playAll() {
    this.videos.forEach((video) => {
      video.play();
    });
    this.playing = true;
  }

  pauseAll() {
    this.videos.forEach((video) => {
      video.pause();
    });
    this.playing = false;
  }

  onSeek(event: Event) {
    this.videos.forEach((video) => {
      video.seek(this.seekTime);
    });
  }

  private getLongestVideoDuration(): number {
    if (this.videos.length == 0) return 0;
    let durations: number[] = this.videos.map(video => {
      if (video.ready) {
        return video.getTotalDuration()
      } else {
        return 0
      }});
    return Math.max(...durations);
  }

  ngOnInit(): void {
    setInterval(() => {
      if (this.playing) this.seekTime += 1;
    }, 1000);
  }
  
  ngAfterContentInit(): void {
    this.videos.map(video => {
      video.ready_once.subscribe(() => {
        this.nb_ready++;
        if (this.nb_ready == this.videos.length) {
          console.log("All players READY");
          setTimeout(() => {
            this.ready = true;
            this.max_time = this.getLongestVideoDuration();  
          }, 1000); // TODO: find a way to check if video is loaded
        }
      });
    })
  }

}
