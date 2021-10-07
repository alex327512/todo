import { Injectable } from '@angular/core';
import {BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


interface ITodos {
  todos: Array<any>;
}
@Injectable({
  providedIn: 'root'
})
export class DataTableService {
  url = 'http://localhost:3000/todos';
  // anotherUrl = 'http://localhost:3200/todos';
  data$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  item$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor(private http: HttpClient) {
    this.getInfo();
  }
  getTodos(): Observable<any> {
    return this.http.get(this.url);
  }
  // getAnotherTodos(): Observable<any> {
  //   return this.http.get(this.anotherUrl);
  // }
  // getAllTodos() {
  //   return forkJoin([
  //      this.getTodos(),
  //      this.getAnotherTodos()
  //   ]);
  // }
  getInfo() {
    return this.getTodos()
       .pipe(
         map(res => {
           return res.reduce((acc, val) => acc.concat(val), []);
         })
       ).subscribe(value => {
        this.data$.next(value);
    });
  }
  addTodo(todo) {
    this.http.post(this.url,  todo).subscribe(post => {
      this.data$.next([...this.data$.value, post]);
    });
  }
  deleteTodo(id: number) {
    this.http.delete(`${this.url}/${id}`).subscribe(todo => {
      this.data$.next(this.data$.value.filter(val => val.id !== id));
    });
  }
}


// export class TodoItem implements TodoElem{
//
//   constructor(public id = 1, public action, public complete, public location = '') {
//     // this.id = id;
//     this.action = action;
//     this.location = location;
//     this.complete = complete;
//   }
// }

export interface TodoElem {
  id: number;
  action: string;
  complete: boolean;
  location: string;
}
