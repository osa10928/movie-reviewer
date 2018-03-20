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
  users: Object;
  userSearch$ = new Subject<string>()
  userSearchInput:string = "";

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

  onDeleteSubmit(user) {
  	console.log(this.editUser)
  }

  open(confirmDelete) {
    this.modalService.open(confirmDelete).result.then(
      (result) => {
        if (result === 'delete click') {
          this.onDeleteSubmit(this.editUser)
        }
      },
      (reason) => {
      }
    )
  }

}