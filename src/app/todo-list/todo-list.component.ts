import {
  Component,
  OnInit,
  Input,
  Output,
  HostBinding,
  EventEmitter
} from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() todos: Todo[];
  @Output() completed = new EventEmitter<number>();
  @HostBinding('attr.class') cssClass = 'margin-10';

  constructor(private todoService: TodoService) {}
  ngOnInit() {}

  completedTodo(id: number) {
    this.completed.emit(id);
  }
}
