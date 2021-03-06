import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { E404PageComponent } from './e404-page/e404-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NewPageComponent } from './new-page/new-page.component';
import { SyncVideoPageComponent } from './sync-video-page/sync-video-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'video-sync', component: SyncVideoPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'new', component: NewPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '**', component: E404PageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
