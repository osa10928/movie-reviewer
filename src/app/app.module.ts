import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap/dropdown/dropdown.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { MovieService } from './movie.service';
import { UsersService } from './users.service';

import { environment } from '../environments/environment';
import { MoviesComponent } from './movies/movies.component';
import { MovieReviewComponent } from './movie-review/movie-review.component';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { TitleCasePipe } from './titleCase.pipe';
import { NavigationComponent } from './navigation/navigation.component';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieReviewComponent,
    LoginComponent,
    MessagesComponent,
    TitleCasePipe,
    NavigationComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    NgbModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NgbDropdownModule.forRoot()
  ],
  providers: [
    MovieService,
    UsersService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
