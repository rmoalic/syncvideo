import { Component, OnInit } from '@angular/core';
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

  constructor(private es: EventsService) {
    this.item = es.getItems();
  }

  ngOnInit(): void {
  }

}
