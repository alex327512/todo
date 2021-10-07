import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataTableService, TodoElem} from '../data-table.service';
import {MatTableDataSource} from '@angular/material/table';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';




@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss'],
})
export class TodoTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [ 'position', 'action', 'location', 'complete', 'editing'];

  dataSource: MatTableDataSource<any>;
  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private dataTable: DataTableService) { }

  ngOnInit(): void {
      this.refresh();
  }

  refresh() {
    this.dataTable.data$
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(res => {
      return this.dataSource = new MatTableDataSource <TodoElem> (res);
      });
  }
  onEdit(item) {
    this.dataTable.item$.next(item);
  }
  onDelete(item) {
    // console.log(todo)
    this.dataTable.deleteTodo(item.id);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
