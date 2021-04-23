import * as mongoose from "mongoose";
const { Schema } = mongoose;

export const NoteSchema = new Schema({
  message: String,
  messageId: String,
  date: String
});
