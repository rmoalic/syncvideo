import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
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

  constructor() { }
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

  ngOnInit(): void {
    let options = {
      width: 400,
      height: 300,
      video: this.video_id,
      parent: ["localhost", "othersite.example.com"]
    };
    this.player = new Twitch.Player("video_div", options);
  }

}
