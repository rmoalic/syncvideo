import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Events_d } from './event_d.model';
import { PaginateFireStore } from './paginateFirestore';
import { Vod } from './vod';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private itemsCollection: AngularFirestoreCollection<Events_d>;  

  constructor(private afs: AngularFirestore, public auth: AngularFireAuth) {
    this.itemsCollection = afs.collection<Events_d>("events");
  }

  getEvents_all(): PaginateFireStore<Events_d> {
    return new PaginateFireStore<Events_d>(this.itemsCollection, 8, (ref) =>{
      return ref.orderBy("creationDate", "desc");
    });;
  }

  getEvents_my(): Promise<PaginateFireStore<Events_d> | undefined> {
    return this.auth.currentUser.then((usr: any) => {
      let uid = usr.uid;
      return new PaginateFireStore<Events_d>(this.itemsCollection, 8, (ref) =>{
        return ref.orderBy("creationDate", "desc")
                  .where("uid", '==', uid);
      });
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
