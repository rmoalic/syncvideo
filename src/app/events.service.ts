import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Events_d } from './event_d.model';
import { Vod } from './vod';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private itemsCollection: AngularFirestoreCollection<Events_d>;
  item: Observable<Events_d[]>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Events_d>("events");
    this.item = this.itemsCollection.valueChanges();
  }

  getItems(): Observable<Events_d[]> {
    return this.item;
  }

  newItem(name: string, vods: Vod[]): Promise<DocumentReference<Events_d>> {
    return this.itemsCollection.add({
      name: name,
      pos: vods.map((v) => {
        return {
          offset: v.offset,
          video_id: v.video_id,
        }
      }),
    });
  }
}
