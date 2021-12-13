import { AngularFirestoreCollection, CollectionReference, Query, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';

export class PaginateFireStore<T> {
  private itemsCollection: AngularFirestoreCollection<T>;
  item: Subject<T[]> = new Subject<T[]>();
  elems_per_page: number;
  item_last: QueryDocumentSnapshot<T> | undefined;
  item_prev: QueryDocumentSnapshot<T> | undefined;
  page: number = 0;
  has_next: boolean = false;
  query_append: (query:  CollectionReference<T>) => Query<T> | CollectionReference<T>;

  constructor(collection: AngularFirestoreCollection<T>,
              elems_per_page: number = 8, 
              query_append: (query:  CollectionReference<T>) => Query<T> | CollectionReference<T> = (q) => q) {
    this.itemsCollection = collection;
    this.elems_per_page = elems_per_page;
    this.query_append = query_append;
    
    let req = this.query_append(this.itemsCollection.ref)
              .limit(this.elems_per_page);
    
    req.get().then((value) => {
      if (this.itemsReqPost(value)) {
        this.has_next = value.docs.length >= this.elems_per_page;
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

    this.item.next(value.docs.map(doc => doc.data()));
    this.item_prev = value.docs[0];
    this.item_last = value.docs[value.docs.length - 1];

    return true;
  }

  itemsNextPage() {
    if (this.item_last == undefined) return;

    let req = this.query_append(this.itemsCollection.ref)
              .startAfter(this.item_last)
              .limit(this.elems_per_page);
    
    req.get().then((value) => {
      if (this.itemsReqPost(value)) {
        this.page++;
        this.has_next = value.docs.length >= this.elems_per_page;
      } else {
        this.has_next = false;
      }
    });
  }

  itemsPrevPage() {
    if (this.item_prev == undefined) return;

    let req = this.query_append(this.itemsCollection.ref)
              .endBefore(this.item_prev)
              .limitToLast(this.elems_per_page);

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
