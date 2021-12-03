import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-sync-video-page',
  templateUrl: './sync-video-page.component.html',
  styleUrls: ['./sync-video-page.component.css']
})
export class SyncVideoPageComponent implements OnInit {
  twitch_vod_id: string[];
  test: string = "1222497448";

  constructor(private route: ActivatedRoute) { 
    this.twitch_vod_id = [];
  }

  ngOnInit(): void {
    this.twitch_vod_id = this.route.snapshot.queryParamMap.getAll('t')
  }

}
