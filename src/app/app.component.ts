import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos: Todo[];
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodos().then(todos => (this.todos = todos));
  }

  addTodo(evt) {
    this.todoService.addTodo(evt).then(() => this.getTodos());
  }

  completedTodo(evt) {
    this.todoService.completedTodo(evt).then(() => this.getTodos());
  }
}
