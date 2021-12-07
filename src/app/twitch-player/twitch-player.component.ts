import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Ivideo } from '../ivideo';

@Component({
  selector: 'app-twitch-player',
  templateUrl: './twitch-player.component.html',
  styleUrls: ['./twitch-player.component.css']
})
export class TwitchPlayerComponent implements OnInit, Ivideo {
  static nb_players: number = 0;
  player_nb: number;

  @Input()
  width: number = 400;

  @Input()
  height: number = 300;
  
  @ViewChild('playerdiv')
  player_div!: ElementRef;
  
  player: any;
  ready: boolean = false;

  @Input()
  video_id: string = "";

  @Input()
  video_offset: number = 0;

  @Output() 
  ready_once: EventEmitter<any> = new EventEmitter();

  constructor(private ref: ChangeDetectorRef, private ngZone: NgZone) {
    this.player_nb = TwitchPlayerComponent.nb_players;
    TwitchPlayerComponent.nb_players++;
  }

  initPlayer(): void {
    console.log("INIT")
    //if (this.video_id == "") return;
    let options = {
      width: "100%",
      height: "100%",
      video: this.video_id,
      autoplay: false,
      parent: ["localhost", "othersite.example.com"]
    };

    this.ngZone.runOutsideAngular(() => {
      this.player = new Twitch.Player(this.player_div.nativeElement, options);
    })
    this.player.addEventListener(Twitch.Player.READY, () => {
      console.log("Player READY");
      this.ready = true;
      this.ready_once.emit(null);
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
    this.player.seek(position + this.video_offset);
  }
  mute(is_muted: boolean): void {
    this.player.mute(is_muted);
  }

  getTotalDuration(): number {
    console.log(this.player.getDuration());
    return this.player.getDuration();
  }

  getPosition(): number {
    return this.player.getCurrentTime();
  }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.setVideo(this.video_id);
    console.log("Video ID: " + this.video_id);
  }


  ngOnChange(change: SimpleChanges): void {
    console.log(change);
    this.setVideo(this.video_id);
  }
}
