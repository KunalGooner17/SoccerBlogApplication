import { Component, OnInit, OnDestroy} from '@angular/core';
import {PostModel} from '../post.model';
import {PostsService} from '../posts.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: PostModel[] = [];
  private postsSub: Subscription; // Observer

  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostsUpdateListener()
    .subscribe((posts: PostModel[]) => {
    this.posts = posts;
    });
}

OnDelete(Postid: String) {
  this.postsService.deletePost(Postid);
}

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
