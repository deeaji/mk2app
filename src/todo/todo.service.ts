import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Todo } from "../interfaces/todo.interface";
import { CreateTodoDTO } from "../dtos/todo.dto";

@Injectable()
export class TodoService {
  constructor(@InjectModel("Todo") private readonly todoModel: Model<Todo>) { } //Todo is the collection name. will be puralize and reduced to lowercase
  async createATodo(createTodoDTO: CreateTodoDTO): Promise<Todo> {
    const newTodo = await new this.todoModel(createTodoDTO);
    return newTodo.save();
  }

  async getAllTodos(): Promise<Todo[]> {
    const todos = await this.todoModel.find().exec();
    return todos;
  }

  async getATodo(messageId): Promise<Todo> {
    const todo = await this.todoModel.findById(messageId).exec();
    return todo;
  }

  async updateATodo(_id, createTodoDTO: CreateTodoDTO): Promise<Todo> {
    const todo = await this.todoModel.findByIdAndUpdate(_id, createTodoDTO, { new: true });
    return todo;
  }

  async deleteATodo(_id): Promise<any> {
    const todo = await this.todoModel.findByIdAndRemove(_id);
    return todo;
  }
}
