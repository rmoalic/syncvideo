import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference, DocumentReference, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { Events_d } from './event_d.model';
import { Vod } from './vod';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private itemsCollection: AngularFirestoreCollection<Events_d>;
  item: Subject<Events_d[]> = new Subject<Events_d[]>();
  elems_per_page: number = 8;
  item_last: QueryDocumentSnapshot<Events_d> | undefined;
  item_prev: QueryDocumentSnapshot<Events_d> | undefined;

  constructor(private afs: AngularFirestore, public auth: AngularFireAuth) {
    this.itemsCollection = afs.collection<Events_d>("events");
    let req = afs.collection<Events_d>("events", (ref: CollectionReference) => {
      return ref.orderBy("creationDate", "desc")
                .limit(this.elems_per_page);
    });
    req.get().toPromise().then(this.itemsReqPost.bind(this));
  }

  private itemsReqPost(value: QuerySnapshot<Events_d> | undefined): void {
    if (value == undefined) return;
    if (value.docs.length == 0) return;
    if (this.item_prev && value.docs[0].isEqual(this.item_prev)) return;
    this.item.next(value.docs.map(doc => doc.data()));
    this.item_prev = value.docs[0];
    this.item_last = value.docs[value.docs.length - 1];
  }

  itemsNextPage() {
    if (this.item_last == undefined) return;
    let req = this.afs.collection<Events_d>("events", (ref: CollectionReference) => {
      return ref.orderBy("creationDate", "desc")
                .startAfter(this.item_last)
                .limit(this.elems_per_page);
    });
    req.get().toPromise().then(this.itemsReqPost.bind(this));
  }

  itemsPrevPage() {
    if (this.item_prev == undefined) return;
    let req = this.afs.collection<Events_d>("events", (ref: CollectionReference) => {
      return ref.orderBy("creationDate", "desc")
                .endBefore(this.item_prev)
                .limitToLast(this.elems_per_page);
    });
    req.get().toPromise().then(this.itemsReqPost.bind(this));
  }
  
  getItems(): Observable<Events_d[]> {
    return this.item.asObservable();
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
