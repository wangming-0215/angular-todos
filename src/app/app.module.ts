import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { TodoService } from './todo.service';

import { AppComponent } from './app.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';

@NgModule({
  declarations: [AppComponent, AddTodoComponent, TodoListComponent],
  imports: [BrowserModule, HttpModule],
  providers: [{ provide: TodoService, useClass: TodoService }],
  bootstrap: [AppComponent]
})
export class AppModule {}
