import { Schema, model } from "mongoose";

const eventsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  img: {
    type: String,
  },
});

let Events;
try {
  Events = model("events");
} catch {
  Events = model("events", eventsSchema);
}

export { Events };