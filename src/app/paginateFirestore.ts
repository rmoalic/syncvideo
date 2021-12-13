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
      if (this.itemsReqPost(value)) {
      }
    });
  }

  get has_prev(): boolean {
    return this.page > 0;
  }

  private itemsReqPost(value: QuerySnapshot<T> | undefined): boolean {
    if (value == undefined) return false;
    if (value.docs.length == 0) return false;
    if (this.item_prev && value.docs[0].isEqual(this.item_prev)) return false;

    let arr;
    if (value.docs.length > this.elems_per_page) {
      arr = value.docs.slice(0, -1);
      this.has_next = true;
    } else {
      arr = value.docs;
      this.has_next = false;
    }
    
    this.item.next(arr.map(doc => doc.data()));
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
      if (this.itemsReqPost(value)) {
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
      if (this.itemsReqPost(value)) {
        this.page--;
        this.has_next = true;
      }
    });
  }
  
  getItems(): Observable<T[]> {
    return this.item.asObservable();
  }
}
