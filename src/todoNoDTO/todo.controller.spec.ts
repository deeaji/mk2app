import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from './todo.model'


describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;


  beforeEach(async () => {
    const todo: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    todoService = todo.get<TodoService>(TodoService);
    todoController = todo.get<TodoController>(TodoController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(todoController.getHello()).toBe('Hello World!');
    });
  });

  describe('getTodo', () => {
    it('should return an array of todos', async () => {
      const result = [{
        date: "Thu",
        message: "hhhhhhhh ffdgfd dfgdg",
        messageId: "56"
      }, {
        date: "Thun",
        message: "iiiiiii ffdgfd dfgdg",
        messageId: "57"
      }];
      jest.spyOn(todoService, 'getTodo').mockImplementation(() => result);
      expect(await todoController.getTodo()).toBe(result);
    });
  });

  describe('addTodo', () => {
    it('insert into db and return todo', async () => {
      const myTodo = {
        message: "hhhhhhhh ffdgfd dfgdg",
        messageId: "56"
      };
      const result = {
        message: "hhhhhhhh ffdgfd dfgdg",
        messageId: "56"
      };
      jest.spyOn(todoService, 'insertTodo').mockImplementation(() => result);
      expect(await todoController.addTodo(myTodo.message, myTodo.messageId)).toStrictEqual(result);
    });
  });
});
