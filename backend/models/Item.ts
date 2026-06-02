import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string[];
  category: string;
  description: string;
}

const itemSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  image: [
    {
      type: String,
      required: true,
    },
  ],
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model<IItem>("Item", itemSchema);
export default Item;
