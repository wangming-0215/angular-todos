import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Todo } from './todo.model';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class TodoService {
  private apiUrl = 'http://localhost:3000';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {}

  getTodos(): Promise<Todo[]> {
    return this.http
      .get(this.apiUrl)
      .toPromise()
      .then(res => res.json().data as Todo[])
      .catch(this.handleError);
  }

  addTodo(content: string): Promise<Todo[]> {
    return this.http
      .post(`${this.apiUrl}/add`, JSON.stringify({ content }), {
        headers: this.headers
      })
      .toPromise()
      .then(res => res.json().data as Todo[])
      .catch(this.handleError);
  }

  deleteTodo(id: number): Promise<Todo> {
    return Promise.resolve({} as Todo);
  }

  completedTodo(id: number): Promise<Todo> {
    return this.http
      .post(
        `${this.apiUrl}/complete/${id}`,
        JSON.stringify({ complete: true }),
        { headers: this.headers }
      )
      .toPromise()
      .then(res => res.json().data as Todo)
      .catch(this.handleError);
  }

  private handleError(err) {
    console.log(err);
    return Promise.reject(err);
  }
}
