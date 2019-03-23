import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: 'feed.page.html',
  styleUrls: ['feed.page.scss']
})
export class FeedPage implements OnInit{

  posts: Observable<any[]>;

  constructor(private fireStore: AngularFirestore) { }

  ngOnInit() {
    this.posts = this.fireStore.collection<any>('posts').valueChanges();
  }
 }
