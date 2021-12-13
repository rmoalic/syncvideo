import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference, DocumentReference, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { Events_d } from './event_d.model';
import { PaginateFireStore } from './paginateFirestore';
import { Vod } from './vod';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  [x: string]: any;
  private itemsCollection: AngularFirestoreCollection<Events_d>;
  item: Subject<Events_d[]> = new Subject<Events_d[]>();
  elems_per_page: number = 8;
  item_last: QueryDocumentSnapshot<Events_d> | undefined;
  item_prev: QueryDocumentSnapshot<Events_d> | undefined;
  
  events_all: PaginateFireStore<Events_d>;

  constructor(private afs: AngularFirestore, public auth: AngularFireAuth) {
    this.itemsCollection = afs.collection<Events_d>("events");
    this.events_all = new PaginateFireStore<Events_d>(this.itemsCollection, 8);
  }

  getEvents_all(): PaginateFireStore<Events_d> {
    return this.events_all;
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
        return Promise.reject("Missing event name or videos");
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
