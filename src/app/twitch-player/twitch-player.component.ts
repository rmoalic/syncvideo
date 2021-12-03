import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, OnInit } from '@angular/core';
import { Ivideo } from '../ivideo';

@Component({
  selector: 'app-twitch-player',
  templateUrl: './twitch-player.component.html',
  styleUrls: ['./twitch-player.component.css']
})
export class TwitchPlayerComponent implements OnInit, Ivideo {
  @Input()
  video_id: String = "";
  player: any;
  ready: boolean = false;

  constructor(private ref: ChangeDetectorRef, private ngZone: NgZone) { }
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

}
