import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from "./todo.schema";

// import { TodoModule } from './modules/todo.module';
import "dotenv/config";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      }),
    MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }]) //Todo is the collection name. will be puralize and reduced to lowercase
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule { }
