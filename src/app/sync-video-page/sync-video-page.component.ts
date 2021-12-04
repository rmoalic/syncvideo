import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Vod } from '../vod';

@Component({
  selector: 'app-sync-video-page',
  templateUrl: './sync-video-page.component.html',
  styleUrls: ['./sync-video-page.component.css']
})
export class SyncVideoPageComponent implements OnInit {
  videos: Vod[];

  constructor(private route: ActivatedRoute) { 
    this.videos = [];
  }

  ngOnInit(): void {
    let t =  this.route.snapshot.queryParamMap.getAll('t');
    for (let param of t) {
      let decomposed: string[] = param.split(":");
      if (decomposed.length == 1) {
        let vid: string = decomposed[0];
        this.videos.push(new Vod("twitch", vid, 0));
      } else if (decomposed.length == 2) {
        let vid: string = decomposed[0];
        let offset: number = Number.parseInt(decomposed[1]);
        this.videos.push(new Vod("twitch", vid, offset));  
      } else {
        console.error("param t must only contain 1 ':'");
      }
    } 
   }

}
