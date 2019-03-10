import {PostModel} from './post.model';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class PostsService  {
  private posts: PostModel[] = []; // Private, Hence can't edit it from outside.
  private postsUpdated = new Subject<PostModel[]>();


  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<{message: String, posts: any}>('http://localhost:3000/api/posts')
    // Transforming of Data
    .pipe(map((postData) => {
      return postData.posts.map(posts => {
        return {
          title: posts.title,
          content: posts.content,
          id: posts._id
        };
      });
    }))
    // Transforming of Data
    .subscribe((TransformedPosts) => {
      this.posts = TransformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

    getPostsUpdateListener() {
    return this.postsUpdated.asObservable(); } // Observable

  // http.post() --> Sends data from the client(Browser-Localhost:4200) to the server(Localhost: 3000).
  // From the server(Localhost: 3000), the data is added to the database(MongoDB).

  deletePost(postId: String) {
    this.http.delete<{message: string}>('http://localhost:3000/api/posts/' + postId).subscribe((ResponseData) => {
      console.log(ResponseData.message);
      console.log('Deleted!');
      const UpdatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = UpdatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  addPost(title: String, content: String) {
    const post: PostModel = {id: null, title: title, content: content}; // type of post that will be added
    this.http.post<{message: String, postId: String}>('http://localhost:3000/api/posts', post) // contacting the server
      .subscribe((responseData) => {
      const id =  responseData.postId;
      post.id = id;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }


}
