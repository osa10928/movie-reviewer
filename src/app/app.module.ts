import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap/dropdown/dropdown.module';
import { environment } from '../environments/environment';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AdminModule } from './admin/admin.module';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieReviewComponent } from './movie-review/movie-review.component';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CommentsComponent } from './comments/comments.component';

import { SearchService } from './search.service';
import { MovieService } from './movie.service';
import { UsersService } from './users.service';
import { MessageService } from './message.service';
import { CommentsService } from './comments.service';

import { TitleCasePipe } from './titleCase.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieReviewComponent,
    LoginComponent,
    MessagesComponent,
    TitleCasePipe,
    NavigationComponent,
    PageNotFoundComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AdminModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    NgbModule.forRoot(),
    HttpClientModule,
    NgbDropdownModule.forRoot()
  ],
  providers: [
    MovieService,
    UsersService,
    MessageService,
    SearchService,
    CommentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
