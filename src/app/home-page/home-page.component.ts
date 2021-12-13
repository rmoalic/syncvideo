import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { EventsService } from '../events.service';
import { Events_d } from '../event_d.model';
import { PaginateFireStore } from '../paginateFirestore';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  items: PaginateFireStore<Events_d>;
  item: Observable<Events_d[]>;
  my_items: PaginateFireStore<Events_d> | undefined = undefined;
  my_item: Observable<Events_d[]> | undefined = undefined;

  constructor(private es: EventsService, private auth: AngularFireAuth) {
    this.items = es.getEvents_all();
    this.item = this.items.getItems();

    auth.user.subscribe((u: any) => {
      if (u == null) return;
      this.es.getEvents_my()
        .then((items: PaginateFireStore<Events_d> | undefined) => {
          this.my_items = items;
          this.my_item = this.my_items?.getItems();
        }).catch((e: string) => console.log(e));
    });
  }

  ngOnInit(): void {
  }

}
