import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { filter } from 'rxjs/operators';

import { User } from './classes/user';
import { UsersService } from './users.service';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  user: User;

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private router: Router
   ) {
    this.router.events
        .pipe(
            filter(event => event instanceof NavigationStart)
        )
        .subscribe((event:NavigationStart) => this.messageService.clear())
   }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
  	this.user = this.usersService.getUser();
  	/*
    this.usersService.getUser()
      .subscribe(user => {
        this.user = user
      });
      */
  }

  topOfPage(): void {
   const scrollStep = -window.scrollY / (500 / 15),
        scrollInterval = setInterval(function(){
        if ( window.scrollY != 0 ) {
            window.scrollBy( 0, scrollStep );
        }
        else clearInterval(scrollInterval); 
    },15);
  }

}
