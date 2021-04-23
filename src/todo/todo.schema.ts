import * as mongoose from "mongoose";
const { Schema } = mongoose;

export const TodoSchema = new Schema({
  message: String,
  messageId: String,
  date: Date
});
