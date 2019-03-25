import { Post } from './../../models/post';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  loved = false;
  disliked = false;
  user: any;
  constructor(
    private auth: AuthService,
    private service: PostService,
    ) { }

  ngOnInit() {
    this.post.id = null;
    this.user = this.auth.user;
    const loves = this.post.loves;
    this.loved = loves && loves[this.user.uid] != null;
    const dislikes = this.post.dislikes;
    this.disliked = dislikes && dislikes[this.user.uid] != null;
    this.post.parsedCreatedAt = this.parseTimestampToPtBr(this.post.createdAt);
  }

  parseTimestampToPtBr(date: firebase.firestore.Timestamp) {
    const strDate = date.toDate().toString();
    const strToday = new Date().toString();
    const strYesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toString();
    let ptBrDate = '';
    const options = {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    };
    if (strDate.substr(0, 15) === strToday.substr(0, 15)) {
      ptBrDate = 'hoje ';
    } else if (strDate.substr(0, 15) === strYesterday.substr(0, 15)) {
      ptBrDate = 'ontem ';
    } else {
      options['weekday'] = 'long';
    }
    return `${ptBrDate}${date.toDate().toLocaleDateString('pt-BR', options)}`;
  }

  love(loved: boolean) {
    this.loved = !loved;
    this.disliked = this.disliked ? !this.loved : this.disliked;
    this.service.love(this.post, this.auth.user.uid, this.loved);
  }

  dislike(disliked: boolean) {
    this.disliked = !disliked;
    this.loved = this.loved ? !this.disliked : this.loved;
    this.service.dislike(this.post, this.auth.user.uid, this.disliked);
  }
}
