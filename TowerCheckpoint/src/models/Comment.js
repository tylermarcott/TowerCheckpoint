import { Schema } from "mongoose";

export const CommentSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
  body: { type: String, required: true, maxLength: 1000 }
}, { toJSON: { virtuals: true } })

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})