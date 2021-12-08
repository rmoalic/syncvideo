import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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

  constructor(private afs: AngularFirestore, public auth: AngularFireAuth) {
    this.itemsCollection = afs.collection<Events_d>("events");
    this.item = this.itemsCollection.valueChanges();
  }

  getItems(): Observable<Events_d[]> {
    return this.item;
  }

  newItem(name: string, vods: Vod[]): Promise<void | DocumentReference<Events_d>> {
    return this.auth.currentUser.then((usr: any) => {
      let uid = usr.uid;
      console.log(uid);
      if (name == ""  || vods.length == 0)
        return Promise.reject("invalid params");
      return this.itemsCollection.add({
        name: name,
        uid: uid,
        pos: vods.map((v) => {
          return {
            offset: v.offset,
            video_id: v.video_id,
          }
        }),
      });  
    });

  }
}
