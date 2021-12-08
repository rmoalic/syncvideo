import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

interface Events_d {
  name: string;
  pos: {
    offset: number;
    video_id: string;
  }[];
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Events_d>;
  item: Observable<Events_d[]>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Events_d>("events");
    console.log("collect", this.itemsCollection);
    this.item = this.itemsCollection.valueChanges();

    console.log("item", this.item)
  }

  ngOnInit(): void {
  }

}
