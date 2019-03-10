import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostCreateComponent } from './Posts/post-create/post-create.component';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule} from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './Posts/post-list/post-list.component';
import {PostsService} from './Posts/posts.service';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app.routing-module';


@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule
  ],
   providers: [PostsService],
   bootstrap: [AppComponent]
})
export class AppModule { }
