import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { User } from '../classes/user';
import { UsersService } from '../users.service';
import { MessageService } from '../message.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  results: Object;
  searchTerms$ = new Subject<string>()
  navSearch:string = "";

  constructor(
  	private usersService: UsersService,
    private messageService: MessageService,
    private searchService: SearchService,
    private router: Router
  ) { 
  		this.router.events
        	.pipe(
            	filter(event => event instanceof NavigationStart)
        	)
        	.subscribe((event:NavigationStart) => {
            this.messageService.clear()
            this.clearSearchNav()
          })

      this.searchService.search(this.searchTerms$, 'movie')
        .subscribe(results => {
          this.results = results
        }) 
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

  clearSearchNav() {
    this.navSearch = ""
  }

}
