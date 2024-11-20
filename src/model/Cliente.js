import { Schema, model, models } from "mongoose";

const newCliente = new Schema({
  clientId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: false },
  contact: { type: String, required: true},
  cel: { type: String , required: true},
  cedJuridica: { type: String , required: false},
  address: {
    provincia: String,
    canton: String,
    distrito: String,
    direccion: String
  },
  createdAt: { type: Date, default: Date.now },
  userCreator: { type: String, required: true },
  status: { type: String, default: 'Activo' },
  typePay: { type: String, default: 'Credito' },
});

export default models.Cliente || model("Cliente", newCliente);
