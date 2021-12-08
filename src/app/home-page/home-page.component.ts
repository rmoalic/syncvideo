import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat';
import { Observable } from 'rxjs';
import { EventsService } from '../events.service';
import { Events_d } from '../event_d.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  item: Observable<Events_d[]>;
  my_item: Observable<Events_d[]> | undefined = undefined;

  constructor(private es: EventsService, private auth: AngularFireAuth) {
    this.item = es.getItems();

    auth.user.subscribe((u: any) => {
      if (u == null) return;
      this.es.getMyItems()
             .then((item: Observable<Events_d[]> | undefined) => {
               this.my_item = item;
              }).catch((e: string) => console.log(e));
    });
  }

  ngOnInit(): void {
  }

}
