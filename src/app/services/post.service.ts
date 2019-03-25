import { Dislike } from './../models/dislike';
import { Love } from './../models/love';
import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { FirestoreService } from './firebase/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private firestore: FirestoreService) { }

  love(post: Post, userUid: string, loved: boolean) {
    if (loved) {
      post.loves[userUid] = <Love> {
        lovedAt: this.firestore.dateNow()
      };
    } else {
      delete post.loves[userUid];
    }
    post['userUid'] = userUid;
    this.firestore.update(`posts/${post.id}`, post);
  }

  dislike(post: Post, userUid: string, disliked: boolean) {
    if (disliked) {
      post.dislikes[userUid] = <Dislike> {
        dislikedAt: this.firestore.dateNow()
      };
    } else {
      delete post.dislikes[userUid];
    }
    post['userUid'] = userUid;
    this.firestore.update(`posts/${post.id}`, post);
  }
}
