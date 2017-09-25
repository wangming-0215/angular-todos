import {
  Component,
  OnInit,
  HostBinding,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'margin-10';
  @Output() addNewTodo = new EventEmitter<string>();
  ngOnInit() {}

  addTodo(newtodo: HTMLInputElement) {
    let todo = newtodo.value.trim();
    if (!todo) return;
    this.addNewTodo.emit(newtodo.value);
    newtodo.value = '';
  }
}
