import { Schema, model, models } from "mongoose";



const newPedido = new Schema({
  orderId: { type: String, unique: true, required: true},
  vendedor: { type: String},
  productos: [
    {
      sku: {type: Number},
      nombre: {type: String},
      category: {type: String},
      price: {type: Number},
      cantidad: {type: Number},
    },
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  shippingAddress: {
    provincia: String,
    canton: String,
    distrito: String,
    direccion: String,
  },
  paymentMethod: {
    type: String,
    enum: ["credit_card", "cash", "paypal"],
    required: false,
  },
  isPaid: { type: Boolean, default: false },
  paidDate: { type: Date },
},
{ timestamps: true });

export default models.Pedido || model("Pedido", newPedido);
