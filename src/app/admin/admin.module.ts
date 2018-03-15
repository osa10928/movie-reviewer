import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { AdminMoviesComponent } from './movies/admin-movies.component';
import { AdminUsersComponent } from './user/admin-user.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		AdminRoutingModule
	],
	declarations: [
		AdminComponent,
		AdminMoviesComponent,
		AdminUsersComponent
	],
	providers: []
})

export class AdminModule{}