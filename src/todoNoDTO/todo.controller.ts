import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  // @Get()
  // getHello(): string {
  //   return this.todoService.getHello();
  // }

  @Post()
  addTodo(
    @Body('message') message: string,
    @Body('messageId') messageId: string
  ) {
    // console.log('vvv',message,messageId)
    const generatedMesage = this.todoService.insertTodo(
      message,
      messageId
    )
    return {
      message,
      messageId
    };
  }

  @Get()
  getTodo() {
    return this.todoService.getTodo();
  }

  @Get(':id')
  getSingleTodo(@Param('id') messageId: string) {
    return this.todoService.getSingleTodo(messageId);
  }

  @Patch(':id')
  updateTodo(
    @Param('id') messageId: string,
    @Body('message') message: string) {
    return this.todoService.updateTodo(messageId, message);
  }

  @Delete(':id')
  deleteSingleTodo(@Param('id') messageId: string) {
    return this.todoService.deleteSingleTodo(messageId);
  }

}
