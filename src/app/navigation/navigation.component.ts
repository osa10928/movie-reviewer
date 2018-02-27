import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { filter } from 'rxjs/operators';

import { User } from '../classes/user';
import { UsersService } from '../users.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

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

  logout() {
    this.usersService.logout()
      .subscribe(
        message => this.messageService.add(message.success),
        error => this.messageService.add(error.message)
      )
  }

}
