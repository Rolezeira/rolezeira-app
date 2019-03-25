import { Love } from './love';
import { Dislike } from './dislike';

export class Post {
    id: string;
    profileName: string;
    text: string;
    createdAt: firebase.firestore.Timestamp;
    parsedCreatedAt: string;
    loves: Love[];
    dislikes: Dislike[];
}
