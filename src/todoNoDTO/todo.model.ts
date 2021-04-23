
export class Todo {
  constructor(
    public date: string,
    public message: string,
    public messageId: string
  ) { }
}

export class TodoInsert {
  constructor(
    public message: string,
    public messageId: string
  ) { }
}
