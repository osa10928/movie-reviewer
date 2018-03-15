import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminUsersComponent } from './user/admin-user.component';
import { AdminMoviesComponent } from './movies/admin-movies.component';

const adminRoutes: Routes = [
	{ 
		path: 'admin',
		component: AdminComponent,
		children: [
			{ path: 'movies', component: AdminMoviesComponent },
			{ path: 'users', component: AdminUsersComponent },
			{ path: '', component: AdminMoviesComponent }
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(adminRoutes)
	],
	exports: [
		RouterModule
	]
})

export class AdminRoutingModule {} 