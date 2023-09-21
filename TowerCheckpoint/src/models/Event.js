import { Schema } from "mongoose";


export const EventSchema = new Schema({
  name: { type: String, required: true, maxLength: 50 },
  description: { type: String, required: true, maxLength: 5000 },
  category: { type: String, enum: ['concert', 'convention', 'sports', 'digital'], lowercase: true },
  coverImg: { type: String, required: true, maxLength: 500, default: 'https://images.unsplash.com/photo-1577401089489-93b743840737?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2l0dGVuJTIwY3J5aW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' },
  location: { type: String, required: true, maxLength: 50 },
  capacity: { type: Number, required: true, minLength: 10, maxLength: 20000 },
  startDate: { type: Date },
  type: { type: String, required: true, maxLength: 50, enum: ['convention', 'sports', 'digital', 'concert'], lowercase: true },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  isCanceled: { type: Boolean, required: true, default: false }
}, { toJSON: { virtuals: true } })

EventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

EventSchema.virtual('ticketCount', {
  localField: '_id',
  foreignField: 'eventId',
  ref: 'Ticket',
  // NOTE: make sure, if you are creating a virtual for some sort of count,  DONT use justOne. You are going to have a count, which is many, so your need to use count, as below.
  count: true
})



// populate these:

// ticketCount: { type: Number, required: true, maxLength: 20000 },
// isCancelled: { type: Boolean }


// data model:

// "name": "{{eventName}}",
// "description" : "{{eventDescription}}",
// "coverImg": "{{eventCoverImg}}",
// "location": "{{eventLocation}}",
// "capacity": { { eventCapacity } },
// "startDate": "{{eventStartDate}}",
// "type": "{{eventType}}"