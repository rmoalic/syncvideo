import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TwitchPlayerComponent } from './twitch-player/twitch-player.component';
import { SyncVideoSliderComponent } from './sync-video-slider/sync-video-slider.component';
import { FormsModule } from '@angular/forms';
import { SyncVideoPageComponent } from './sync-video-page/sync-video-page.component';
import { AboutPageComponent } from './about-page/about-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TwitchPlayerComponent,
    SyncVideoSliderComponent,
    SyncVideoPageComponent,
    AboutPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
