import { Document } from "mongoose";

export interface Todo extends Document {
  readonly message: string;
  readonly messageId: string;
  readonly date: Date;
}
