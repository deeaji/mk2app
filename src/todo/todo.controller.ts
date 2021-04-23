import { Controller, Res, HttpStatus, Post, Get, Param, Body, Patch, Delete } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDTO } from "../dtos/todo.dto";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';


@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) { }

  @Post('/add')
  async createATodo(@Res() res, @Body() createTodoDTO: CreateTodoDTO) {
    createTodoDTO['messageId'] = uuidv4()
    createTodoDTO['date'] = new Date();
    const todo = await this.todoService.createATodo(createTodoDTO);
    return res.status(HttpStatus.CREATED).json({
      status: 201,
      message: "Successful!",
      data: todo
    })
  }

  @Get('/all')
  async getAllTodos(@Res() res) {
    const todos = await this.todoService.getAllTodos();
    return res.status(HttpStatus.OK).json({
      status: 200,
      data: todos
    })
  }

  @Get("/:messageId")
  async getATodo(@Res() res, @Param("messageId") _id: string) {
    const todo = await this.todoService.getATodo(_id);
    if (!todo)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: 404, error: "Not found!" });
    return res.status(HttpStatus.OK).json({ status: 200, data: todo });
  }

  @Patch('/update/:messageId')
  async updateCustomer(@Res() res, @Body() createTodoDTO: CreateTodoDTO, @Param("messageId") _id: string) {
    const todo = await this.todoService.updateATodo(_id, createTodoDTO);
    if (!todo)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: 404, error: "Not found!" });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: 'Successful!',
      todo
    });
  }

  @Delete('/delete/:messageId')
  async deleteCustomer(@Res() res, @Param('messageId') _id) {
    const todo = await this.todoService.deleteATodo(_id);
    if (!todo)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: 404, error: "Not found!" });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: 'Successful!',
    })
  }

}
