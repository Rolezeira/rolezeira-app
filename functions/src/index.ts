import * as functions from 'firebase-functions';
// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from 'firebase-admin';
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.onCreatePost = functions.firestore.document('posts/{postId}').onCreate((snap, context) => {
    const postId = context.params.postId;
    return snap.ref.set({ id: postId }, {merge: true});
});

exports.onUpdatePost = functions.firestore.document('posts/{postId}').onUpdate((snap, context) => {
    const postId = context.params.postId;
    const post = snap.after.data();
    const beforePost = snap.after.data();
    const dislikes = post.dislikes ? post.dislikes : {};
    const loves = post.loves ? post.loves : {};
    const beforeDislikes = post.dislikes ? beforePost.dislikes : {};
    const beforeLoves = post.loves ? beforePost.loves : {};

    const userUid = post.userUid;
    
    if (loves[userUid] && !beforeLoves[userUid]) {
        delete dislikes[userUid];
    }    
    if (dislikes[userUid] && !beforeDislikes[userUid]) {
        delete loves[userUid];
    }
    
    return snap.after.ref.set({ 
        id: postId,
        dislikes,
        loves
    }, {merge: true});
});
