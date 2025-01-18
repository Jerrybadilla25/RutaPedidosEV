import { Schema, model, models } from "mongoose";


const newProduct = new Schema({
  productId: { type: String, required: true, unique: true },
  name: { type: String, required: true, index: true }, // Índice para búsquedas por nombre
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, index: true }, // Índice para búsquedas por categoría
  //stock: { type: Number, required: false, min: 0 },
  images: [{ type: String }], // Array de URLs de imágenes
  ratings: { type: Number, default: 0, min: 0, max: 5 },
  numReviews: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default models.Product || model("Product", newProduct);
