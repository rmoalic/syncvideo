import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TwitchPlayerComponent } from './twitch-player/twitch-player.component';
import { SyncVideoSliderComponent } from './sync-video-slider/sync-video-slider.component';
import { FormsModule } from '@angular/forms';
import { SyncVideoPageComponent } from './sync-video-page/sync-video-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { E404PageComponent } from './e404-page/e404-page.component';
import { NewPageComponent } from './new-page/new-page.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { LoginPageComponent } from './login-page/login-page.component';
import { EventsDToUrlPipe } from './events-d-to-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TwitchPlayerComponent,
    SyncVideoSliderComponent,
    SyncVideoPageComponent,
    AboutPageComponent,
    HomePageComponent,
    E404PageComponent,
    NewPageComponent,
    LoginPageComponent,
    EventsDToUrlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
