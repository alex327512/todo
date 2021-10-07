import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TodoComponent } from './todo.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoTableComponent } from './todo-table/todo-table.component';
import { DataTableService } from './data-table.service';
import { MaterialModule } from '../material.module';
import {RouterModule} from '@angular/router';


const routing = RouterModule.forChild([
  {path: '', component: TodoComponent}
  ]);
@NgModule({
  imports: [
    FormsModule,
    MaterialModule,
    routing
  ],
  declarations: [
    TodoComponent,
    TodoFormComponent,
    TodoTableComponent
  ],
  providers: [DataTableService],
  exports: [TodoComponent],
})
export class TodoModule { }
