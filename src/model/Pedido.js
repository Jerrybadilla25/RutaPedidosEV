import { Schema, model, models } from "mongoose";



const newPedido = new Schema({
  orderId: { type: String, unique: true, required: true},
  idCliente:{type: String, required: true},
  name: { type: String, required: true },
  email: { type: String, required: false },
  contact: { type: String, required: false},
  cel: { type: String , required: false},
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
  notas: [
    {
      nota: {type: String},
      creador: {type: String},
      fechaCreacion: {type: Date}
    },
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pendiente","aprobado", "alistado", "facturado","enviado", "cancelado", "rechazado"],
    default: "pendiente",
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
  statusUpdateDate: { type: Date },
},
{ timestamps: true });

export default models.Pedido || model("Pedido", newPedido);
