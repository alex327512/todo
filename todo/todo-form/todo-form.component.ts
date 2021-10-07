import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataTableService} from '../data-table.service';
import {NgForm} from '@angular/forms';
import {DialogService} from '../../shared/shared-form/dialog.service';
import {from, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";


@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit, OnDestroy {

  action: string;
  location: string;
  complete: boolean;
  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private dataTable: DataTableService,
              public sharedDialog: DialogService) { }

  ngOnInit() {
    this.complete = false;
    this.dataTable.item$
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(item => {
      this.action = item.action;
      this.location = item.location;
      this.complete = item.complete;
    });
  }

  onSubmit(form: NgForm) {
    const isSame = this.dataTable.data$.value.find((item) => {
     return item.action === form.value.action;
    });
    // console.log(isSame);
    if (isSame) {
      const error = `There is "${form.value.action}" in the table`;
      this.sharedDialog.openDialog(error);
    } else {
      this.dataTable.addTodo(form.value);
    }
    this.onClear(form);
  }
  onClear(form: NgForm) {
    // form.reset({complete: false});
    form.resetForm({complete: false});
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
