import { Component, OnInit } from '@angular/core';
import { NgbModule, ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { User } from '../../classes/user';
import { UsersService } from '../../users.service';
import { MessageService } from '../../message.service';
import { SearchService } from '../../search.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUsersComponent implements OnInit {

  editUser:User = this.usersService.editUser;
  allUsers:User[] = null
  users: Object;
  userSearch$ = new Subject<string>();
  userSearchInput:string = "";
  listingUsers = false;

  constructor(
  	private messageService: MessageService,
    private searchService: SearchService,
    private usersService: UsersService,
  	private router: Router,
    private modalService: NgbModal
  ) {

    this.searchService.search(this.userSearch$, 'user')
      .subscribe(users => {
        this.users = users
      })
  }

  ngOnInit() {
  }

  setEditUser(user) {
    this.editUser = user
    this.usersService.editUser = this.editUser
    this.userSearchInput = ""
  }

  clearUser() {
  	this.editUser = null
  	this.usersService.editUser = null
  }

  listAllUsers(){
  	this.listingUsers = true;
  	this.usersService.adminGetAllUsers()
  		.subscribe(
  			res => {
  				this.allUsers = res
  			},
  			error => {
  				console.log(error)
  				this.messageService.add(error.error)
  			}
  		)
  }

  onDeleteSubmit(user) {
  	this.usersService.adminDeleteUser(this.editUser)
  		.subscribe(
  			res => {
          		this.messageService.add(`${res['username']} was successfully deleted!`)
          		this.editUser = null;
        	},
        	error => {
          		console.log(error)
          		this.messageService.add(error.error)
        	}
  		)
    }

  deleteMany() {
  	let users = []
  	const checkboxes = document.querySelectorAll('input[type=checkbox]')
  	Array.prototype.slice.call(checkboxes).map(user => {
  		user.checked ? users.push(user.name) : null
  	})
  	this.usersService.adminDeleteManyUsers(users)
  		.subscribe(
  			res => {
  				this.messageService.add(res)
  				this.listingUsers = false
  			},
  			error => {
  				console.log(error)
  				this.messageService.add(error.error)
  			}
  		)
  }


  oneUserChecked() {
  	const checkboxes = document.querySelectorAll('input[type=checkbox]')
  	return Array.prototype.slice.call(checkboxes).some(x => x.checked)
  }

  open(confirmDelete, option) {
    this.modalService.open(confirmDelete).result.then(
      (result) => {
        if (result === 'delete click') {
        	switch (option) {
        		case 'one':
        			this.onDeleteSubmit(this.editUser)
        			break;
        		case 'many':
        			this.deleteMany()
        	}
        }
      },
      (reason) => {
      }
    )
  }

}