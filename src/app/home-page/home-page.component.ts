import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private firestore: Firestore) {
    const collect = collection(firestore, 'events');
    console.log("collect",collect);
    let test = collectionData(collect);

    console.log("TETS", test)
  }

  ngOnInit(): void {
  }

}
