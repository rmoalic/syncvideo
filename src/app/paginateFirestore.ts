import { AngularFirestoreCollection, CollectionReference, Query, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';

export class PaginateFireStore<T> {
  private itemsCollection: AngularFirestoreCollection<T>;
  private item: Subject<T[]> = new Subject<T[]>();
  private elems_per_page: number;
  private item_last: QueryDocumentSnapshot<T> | undefined;
  private item_prev: QueryDocumentSnapshot<T> | undefined;
  private page: number = 0;
  private query_append: (query:  CollectionReference<T>) => Query<T> | CollectionReference<T>;
  has_next: boolean = false;

  constructor(collection: AngularFirestoreCollection<T>,
              elems_per_page: number = 8, 
              query_append: (query:  CollectionReference<T>) => Query<T> | CollectionReference<T> = (q) => q) {
    this.itemsCollection = collection;
    this.elems_per_page = elems_per_page;
    this.query_append = query_append;
    
    let req = this.query_append(this.itemsCollection.ref)
              .limit(this.elems_per_page + 1);
    
    req.get().then((value) => {
      if (this.itemsReqPost(value, false)) {}
    });
  }

  get has_prev(): boolean {
    return this.page > 0;
  }

  private itemsReqPost(value: QuerySnapshot<T> | undefined, is_back: boolean): boolean {
    if (value == undefined) { console.log("value == undefined"); return false};
    if (value.docs.length == 0) { console.log("value.docs.length == 0"); return false};

    let arr;
    if (value.docs.length > this.elems_per_page) {
      if (is_back) {
        arr = value.docs.slice(1);
      } else {
        arr = value.docs.slice(0, -1);
      }
      this.has_next = true;
    } else {
      arr = value.docs;
      this.has_next = false;
    }
    
    this.item.next(arr.map(doc => {
      return { id: doc.id, ...doc.data()};
    }));
    this.item_prev = arr[0];
    this.item_last = arr[arr.length - 1];

    return true;
  }

  itemsNextPage() {
    if (this.item_last == undefined) return;

    let req = this.query_append(this.itemsCollection.ref)
              .startAfter(this.item_last)
              .limit(this.elems_per_page + 1);
    
    req.get().then((value) => {
      if (this.itemsReqPost(value, false)) {
        this.page++;
      }
    });
  }

  itemsPrevPage() {
    if (this.item_prev == undefined) return;

    let req = this.query_append(this.itemsCollection.ref)
              .endBefore(this.item_prev)
              .limitToLast(this.elems_per_page + 1);

    req.get().then((value) => {
      if (this.itemsReqPost(value, true)) {
        this.page--;
        this.has_next = true;
      }
    });
  }

  reloadPage() {
    if (this.item_prev == undefined) return;
    let req;
    if (this.item_prev.exists) { //TODO: exists is always true, but database seems to be able to use deleted id ?
      req = this.query_append(this.itemsCollection.ref)
      .startAt(this.item_prev)
      .limit(this.elems_per_page + 1);
    } else if (this.item_last?.exists) {
      req = this.query_append(this.itemsCollection.ref)
      .endAt(this.item_last)
      .limitToLast(this.elems_per_page + 1);
    } else {
      req = this.query_append(this.itemsCollection.ref)
      .limit(this.elems_per_page + 1);

      this.page = 0;
    }

    req.get().then((value) => {
      if (this.itemsReqPost(value, false)) {
      }
    });
  }
  
  getItems(): Observable<T[]> {
    return this.item.asObservable();
  }
}
