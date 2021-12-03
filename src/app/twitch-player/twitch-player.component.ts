import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Ivideo } from '../ivideo';

@Component({
  selector: 'app-twitch-player',
  templateUrl: './twitch-player.component.html',
  styleUrls: ['./twitch-player.component.css']
})
export class TwitchPlayerComponent implements OnInit, Ivideo {
  player: any;
  ready: boolean = false;

  @Input()
  video_id: string = "";

  constructor(private ref: ChangeDetectorRef, private ngZone: NgZone) { }

  initPlayer(): void {
    console.log("INIT")
    //if (this.video_id == "") return;
    let options = {
      width: 400,
      height: 300,
      video: this.video_id,
      parent: ["localhost", "othersite.example.com"]
    };

    this.ngZone.runOutsideAngular(() => {
      this.player = new Twitch.Player("video_div", options);
    })
    this.player.addEventListener(Twitch.Player.READY, () => {
      this.ready = true;
      this.ref.detectChanges();
    });
  }

  setVideo(video_id: string): void {
    console.log("HERE");
    if (this.ready) {
      this.player.setVideo(video_id, 0);
    } else {
      this.initPlayer();
    }
  }

  play(): void {
    this.player.play();
  }
  pause(): void {
    this.player.pause();
  }
  seek(position: number): void {
    this.player.seek(position);
  }
  mute(is_muted: boolean): void {
    this.player.mute(is_muted);
  }

  getTotalDuration(): number {
    console.log(this.player.getDuration());
    return this.player.getDuration();
  }

  ngOnInit(): void {
    this.setVideo(this.video_id);
    console.log("Video ID: " + this.video_id);
  }


  ngOnChange(change: SimpleChanges): void {
    console.log(change);
    this.setVideo(this.video_id);
  }
}
