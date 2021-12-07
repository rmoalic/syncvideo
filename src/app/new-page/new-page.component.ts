import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Vod } from '../vod';
import { TwitchPlayerComponent } from '../twitch-player/twitch-player.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit {
  @ViewChildren (TwitchPlayerComponent)
  videos_players!: QueryList<TwitchPlayerComponent>;

  event_name: string= "";
  new_video_id: string = "";
  videos: Vod[] = [];
  temporary_link: string = "";
  constructor() { }

  add_new_video() {
    if (this.new_video_id == '') return;
    if (this.videos.find((v) => v.video_id == this.new_video_id) != undefined) return;

    this.videos.push(new Vod("twitch", this.new_video_id, 0));
    this.new_video_id = "";

    this.updateTemporaryLink();
  }

  place_marker(v: Vod) {
    let selected_player = this.videos_players.find((player) => {
      console.log(player);
      return player.video_id == v.video_id;
    });
    if (selected_player == undefined) return;
    v.offset = selected_player.getPosition();

    this.updateTemporaryLink();
  }

  updateTemporaryLink() {
    let ret = window.location + "/video-sync?";
    for (let v of this.videos) {
      ret += "&t="+v.video_id+":"+v.offset
    }
    this.temporary_link = ret;
  }

  publish() {
    
  }

  ngOnInit(): void {
  }

}
