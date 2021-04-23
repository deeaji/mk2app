import { Injectable, NotFoundException } from '@nestjs/common';

import { Todo } from './todo.model'

@Injectable()
export class TodoService {
  todos: Todo[] = []

  getHello(): string {
    return 'Hello World!';
  }

  insertTodo(message: string, messageId: string) {
    const newTodo = new Todo(new Date().toString(), message, messageId);
    this.todos.push(newTodo);
  }

  getSingleTodo(messageId: string) {
    const [todo, index] = this.filterRecord(messageId)
    if (!todo) throw new NotFoundException('Could not find product');
    return { ...todo }
  }

  updateTodo(messageId: string, message: string) {
    const [todo, index] = this.filterRecord(messageId)
    if (!todo) throw new NotFoundException('Could not find product');
    let newMessage = {}
    if (message) {
      newMessage = { message }
    }
    this.todos[index] = { ...todo, ...newMessage };
    return { ...todo, ...newMessage };
  }

  getTodo() {
    return [...this.todos];
  }

  deleteSingleTodo(messageId: string) {
    const [todo, index] = this.filterRecord(messageId)
    if (!todo) throw new NotFoundException('Could not find product');
    this.todos.splice(index, 1)
    return { ...this.todos }
  }

  private filterRecord(messageId: string): [Todo, number] {
    const index = this.todos.findIndex(info => info.messageId == messageId);
    const todo = this.todos[index];
    // console.log(messageId, todo)
    return [todo, index]
  }
}
