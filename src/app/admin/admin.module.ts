import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		AdminRoutingModule
	],
	declarations: [
		AdminComponent
	],
	providers: []
})

export class AdminModule{}