import { Component, OnInit, Input } from '@angular/core';

import { Movie } from '../classes/movie';
import {UsersService } from '../users.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() movie: Movie; 

  constructor(
  	private usersService: UsersService
  ) { }

  ngOnInit() {
  }

}
