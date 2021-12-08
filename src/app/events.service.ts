import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference, DocumentReference } from '@angular/fire/compat/firestore';
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
    let req = afs.collection<Events_d>("events", (ref: CollectionReference) => {
      return ref.orderBy("creationDate", "desc")
                .limit(20);
    });
    this.item = req.valueChanges();
  }

  getItems(): Observable<Events_d[]> {
    return this.item;
  }

  getMyItems(): Promise<Observable<Events_d[]> | undefined> {
    return this.auth.currentUser.then((usr: any) => {
      let uid = usr.uid;
      let req2 = this.afs.collection<Events_d>("events", (ref: CollectionReference) => {
        return ref.orderBy("creationDate", "desc")
                  .where("uid", '==', uid);
      });
      return req2.valueChanges();
    });
  }

  newItem(name: string, vods: Vod[]): Promise<void | DocumentReference<Events_d>> {
    return this.auth.currentUser.then((usr: any) => {
      let uid = usr.uid;
      let d = new Date()
      let UTCseconds = (d.getTime() + d.getTimezoneOffset()*60*1000)/1000;
      if (name == ""  || vods.length == 0)
        return Promise.reject("invalid params");
      return this.itemsCollection.add({
        name: name,
        uid: uid,
        creationDate: UTCseconds,
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
