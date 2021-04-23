import { Document } from "mongoose";

export interface Note extends Document {
  readonly message: string;
  readonly messageId: string;
  readonly date: string;
}
