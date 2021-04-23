import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, HttpStatus } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { CreateTodoDTO } from "../src/dtos/todo.dto";
import * as mongoose from "mongoose";

describe("E2E Tests for NOTE Endpoints", () => {
  let app: INestApplication;

  beforeEach(async () => {
    jest.setTimeout(10000);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async done => {
    await mongoose.disconnect(done);
  });

  it("should create a todo", () => {
    const todo: CreateTodoDTO = {
      message: "new keep up the good work",
      messageId: "b102efbf-72a8-4069-aa53-7883c05e611a",
      date: new Date()
    };
    return request(app.getHttpServer())
      .post("/todo/add")
      .set("Accept", "application/json")
      .send(todo)
      .expect(HttpStatus.CREATED);
  });
  it("should update a todo", () => {
    const todo: CreateTodoDTO = {
      message: "new keep up the good work",
      messageId: "b102efbf-72a8-4069-aa53-7883c05e611a",
      date: new Date()
    };
    return request(app.getHttpServer())
      .patch("/todo/update/6082ff4ff7d17f08dec81d11")
      .set("Accept", "application/json")
      .send(todo)
      .expect(HttpStatus.OK);
  });
  it("should get all todos", () => {
    return request(app.getHttpServer())
      .get("/todo/all")
      .set("Accept", "application/json")
      .expect(HttpStatus.OK);
  });
  it("should get a todo", () => {
    return request(app.getHttpServer())
      .get("/todo/6082ff4ff7d17f08dec81d11")
      .set("Accept", "application/json")
      .expect(HttpStatus.OK);
  });
  it("should delete a todo", () => {
    return request(app.getHttpServer())
      .delete("/todo/delete/6082ff4ff7d17f08dec81d11")
      .set("Accept", "application/json")
      .expect(HttpStatus.OK);
  });
});
